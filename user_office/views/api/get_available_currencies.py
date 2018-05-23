from .auth import KYCAndLoginPermission
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from blockchain.currencies import Currencies
from user_office.models import ExchangeRate


class GetAvailableCurrencies(GenericAPIView):
    """
    Return list of available cryptocurrencies
    """

    permission_classes = (KYCAndLoginPermission,)

    def get_exchange_rate(self, currency):
        return ExchangeRate.objects.get_rate_by_currency(currency)

    def get(self, request, *args, **kwargs):
        return Response(
            [
                {"code": c.code,
                 "name": c.name,
                 "rate": self.get_exchange_rate(c.code).rate}
                for c in Currencies.get_currencies()
            ]
        )
