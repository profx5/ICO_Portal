from .auth import KYCAndLoginPermission
from rest_framework.generics import RetrieveAPIView
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.conf import settings

from user_office.models import ICO_Info


class ICO_InfoSerializer(ModelSerializer):
    token_address = SerializerMethodField()
    crowdsale_address = SerializerMethodField()
    token_decimals = SerializerMethodField()

    def get_token_address(self, _):
        return settings.TOKEN_CONTRACT['address']

    def get_crowdsale_address(self, _):
        return settings.CROWDSALE_CONTRACT['address']

    def get_token_decimals(self, _):
        return settings.TOKEN_DECIMALS

    class Meta:
        model = ICO_Info
        fields = ('total_supply', 'token_address',
                  'crowdsale_address', 'token_decimals')


class GetICOInfo(RetrieveAPIView):
    """
    Return ico info
    """
    serializer_class = ICO_InfoSerializer
    permission_classes = (KYCAndLoginPermission,)

    def get_object(self):
        return ICO_Info.objects.last()
