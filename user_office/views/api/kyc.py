from rest_framework.viewsets import GenericViewSet
from rest_framework.parsers import MultiPartParser
from rest_framework.serializers import ModelSerializer
from rest_framework.response import Response

from .auth import KYCAndLoginPermission
from user_office.models import KYC
from ico_portal.utils import tuple_exclude
from user_office.services import CreateKYCTicket, UpdateKYCTicket


KYC_FIELDS = ('state', 'user_photo', 'firstname', 'midname', 'surname', 'gender',
              'birthdate', 'country', 'city', 'registration_address', 'postcode',
              'document_type', 'document_no', 'document_country', 'document_date',
              'document_photo', 'decline_reason', 'ticket_id')


class RetrieveKYCSerializer(ModelSerializer):
    class Meta:
        model = KYC
        fields = KYC_FIELDS


class CreateKYCSerializer(ModelSerializer):
    class Meta:
        model = KYC
        fields = tuple_exclude(KYC_FIELDS, ('state', 'decline_reason', 'ticket_id'))


class KYCViewSet(GenericViewSet):
    parser_classes = (MultiPartParser,)
    permission_classes = (KYCAndLoginPermission,)

    def get_serializer_class(self):
        if self.action in ('create', 'update'):
            return CreateKYCSerializer
        else:
            return RetrieveKYCSerializer

    def get_object(self):
        if hasattr(self.request.user, 'kyc'):
            return self.request.user.kyc

    def list(self, request, *args, **kwargs):
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
            CreateKYCTicket()(kyc)

            retrieve_serializer = RetrieveKYCSerializer(
                kyc,
                context=self.get_serializer_context())

            return Response(retrieve_serializer.data, status=201)
        else:
            return Response(serializer.errors,
                            status=400)

    def update(self, request):
        serializer = self.get_serializer(request.data)
        kyc = serializer.save()

        UpdateKYCTicket()(serializer.instance)

        return Response(RetrieveKYCSerializer(kyc).data)
