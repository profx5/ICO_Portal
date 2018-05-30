from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from rest_framework.parsers import MultiPartParser
from rest_framework.serializers import ModelSerializer, FileField
from rest_framework.response import Response

from .auth import KYCAndLoginPermission
from user_office.models import KYC
from ico_portal.utils import tuple_exclude


KYC_FIELDS = ('state', 'user_photo', 'firstname', 'midname', 'surname', 'gender',
              'birthdate', 'country', 'city', 'registration_address', 'postcode',
              'document_type', 'document_no', 'document_country', 'document_date',
              'document_photo', 'decline_reason')

class GetKYCSerializer(ModelSerializer):
    class Meta:
        model = KYC
        fields = KYC_FIELDS


class CreateKYCSerializer(ModelSerializer):
    class Meta:
        model = KYC
        fields = tuple_exclude(KYC_FIELDS, ('state', 'decline_reason'))


class KYCViewSet(mixins.CreateModelMixin,
                 mixins.UpdateModelMixin,
                 mixins.RetrieveModelMixin,
                 GenericViewSet):
    parser_classes = (MultiPartParser,)
    permission_classes = (KYCAndLoginPermission,)

    def get_serializer_class(self):
        if self.action in ('create', 'update'):
            return CreateKYCSerializer
        else:
            return GetKYCSerializer

    def perform_create(self, serializer):
        serializer.save(investor=self.request.user)

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
