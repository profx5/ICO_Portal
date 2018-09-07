import mimetypes
from django.utils.encoding import smart_text
from django.conf import settings
from rest_framework.viewsets import GenericViewSet
from rest_framework.parsers import MultiPartParser
from rest_framework.serializers import ModelSerializer
from rest_framework.response import Response
from oslash import Left

from .auth import KYCAndLoginPermission
from user_office.models.kyc import KYC, KYCAttachment, KYC_ATTACHMENT_TYPE_CHOICES
from user_office.services import CreateKYCTicket, UpdateKYCTicket
from blockchain.ico.services import ApproveKYC


class KYCAttachmentSerializer(ModelSerializer):
    class Meta:
        model = KYCAttachment
        fields = ('type', 'file', 'filename', 'mime_type', 'size')


class RetrieveKYCSerializer(ModelSerializer):
    attachments = KYCAttachmentSerializer(many=True)

    class Meta:
        model = KYC
        exclude = ('id', 'investor', 'approve_txn_id')


class CreateKYCSerializer(ModelSerializer):
    class Meta:
        model = KYC
        exclude = ('id', 'investor', 'state', 'decline_reason', 'ticket', 'approve_txn_id')


class KYCViewSet(GenericViewSet):
    parser_classes = (MultiPartParser,)
    permission_classes = (KYCAndLoginPermission,)

    serializer_action_map = {
        'create': CreateKYCSerializer,
        'retrieve': RetrieveKYCSerializer,
        'update': CreateKYCSerializer
    }

    def _get_mime_type(self, file, filename):
        return file.content_type or \
            mimetypes.guess_type(filename, strict=False)[0] or \
            'application/octet-stream'

    def _process_attachments_by_type(self, kyc, files, type):
        for file in files:
            size = file.size
            filename = smart_text(file.name)

            if size and not kyc.attachments.filter(filename=filename, size=size).exists():
                attachment = KYCAttachment(kyc=kyc,
                                           type=type,
                                           file=file,
                                           filename=smart_text(file.name),
                                           mime_type=self._get_mime_type(file, filename),
                                           size=file.size)
                attachment.save()

    def process_attachments(self, kyc, request):
        for type in KYC_ATTACHMENT_TYPE_CHOICES:
            type = type[0]
            files_by_type = request.FILES.getlist(type)

            if files_by_type:
                self._process_attachments_by_type(kyc, files_by_type, type)

    def get_serializer_class(self):
        return self.serializer_action_map.get(self.action)

    def get_object(self):
        if hasattr(self.request.user, 'kyc'):
            return self.request.user.kyc

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance:
            serializer = self.get_serializer(instance)

            return Response(serializer.data)
        else:
            return Response({})

    def create(self, request):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            kyc = serializer.save(investor=self.request.user)

            self.process_attachments(kyc, request)

            if settings.AUTO_APPROVE_KYC:
                result = ApproveKYC()(kyc)

                if isinstance(result, Left):
                    return Response(result.value, status=500)
            else:
                CreateKYCTicket()(kyc)

            kyc.refresh_from_db()

            retrieve_serializer = RetrieveKYCSerializer(
                kyc,
                context=self.get_serializer_context())

            return Response(retrieve_serializer.data, status=201)
        else:
            return Response(serializer.errors,
                            status=400)

    def update(self, request):
        if request.user.kyc.approved:
            return Response('Cant update approved KYC',
                            status=400)

        serializer = self.get_serializer(request.user.kyc, data=request.data)

        if serializer.is_valid():
            kyc = serializer.save()
            self.process_attachments(kyc, request)

            UpdateKYCTicket()(kyc)

            retrieve_serializer = RetrieveKYCSerializer(
                kyc,
                context=self.get_serializer_context())

            return Response(retrieve_serializer.data, status=200)
        else:
            return Response(serializer.errors,
                            status=400)
