from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from rest_framework.parsers import MultiPartParser
from rest_framework.serializers import ModelSerializer
from rest_framework.response import Response

from user_office.models import KYC


class GetKYCSerializer(ModelSerializer):
    class Meta:
        model = KYC
        fields = ('state', 'firstname', 'midname', 'surname',
                  'birthdate', 'document_no', 'photo')


class CreateKYCSerializer(ModelSerializer):
    class Meta:
        model = KYC
        fields = ('firstname', 'midname', 'surname', 'birthdate',
                  'document_no', 'photo')


class KYCViewSet(mixins.CreateModelMixin,
                 mixins.UpdateModelMixin,
                 mixins.RetrieveModelMixin,
                 GenericViewSet):
    parser_classes = (MultiPartParser,)

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
