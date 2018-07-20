from rest_framework.viewsets import GenericViewSet
from rest_framework.parsers import MultiPartParser
from rest_framework.serializers import ModelSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

from .auth import KYCAndLoginPermission
from user_office.models import KYC
from user_office.services import CreateKYCTicket, UpdateKYCTicket


class RetrieveKYCSerializer(ModelSerializer):
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
        'list': RetrieveKYCSerializer,
        'upd': CreateKYCSerializer
    }

    def get_serializer_class(self):
        return self.serializer_action_map.get(self.action)

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

            kyc.refresh_from_db()

            retrieve_serializer = RetrieveKYCSerializer(
                kyc,
                context=self.get_serializer_context())

            return Response(retrieve_serializer.data, status=201)
        else:
            return Response(serializer.errors,
                            status=400)

    @action(methods=['POST'], detail=False)
    def upd(self, request):
        if request.user.kyc.approved:
            return Response('Cant update approved KYC',
                            status=400)

        serializer = self.get_serializer(request.user.kyc, data=request.data)

        if serializer.is_valid():
            kyc = serializer.save()
            UpdateKYCTicket()(kyc)

            retrieve_serializer = RetrieveKYCSerializer(
                kyc,
                context=self.get_serializer_context())

            return Response(retrieve_serializer.data, status=200)
        else:
            return Response(serializer.errors,
                            status=400)
