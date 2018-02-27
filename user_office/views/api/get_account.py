from rest_framework.generics import RetrieveAPIView
from rest_framework.serializers import ModelSerializer
from rest_framework.response import Response
from user_office.models import Account


class AccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = ('currency', 'address')


class GetAccount(RetrieveAPIView):
    """
    Return user account address by cryptocurrency code ('currency_code' param)
    """
    serializer_class = AccountSerializer

    def _get_currency_code(self):
        return self.request.query_params['currency_code'].upper()

    def get_object(self):
        return self.request.user.get_account(self._get_currency_code())
