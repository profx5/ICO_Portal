from .auth import KYCAndLoginPermission
from rest_framework.views import APIView
from rest_framework.response import Response

from blockchain.currencies import Currencies
from user_office.models import ExchangeRate


class GetAvailableCurrencies(APIView):
    """
    Return list of available cryptocurrencies
    """

    permission_classes = (KYCAndLoginPermission,)

    def get_exchange_rate(self, currency):
        obj = ExchangeRate.objects.get_rate_by_currency(currency)

        if obj:
            return obj.rate
        else:
            return 0

    def get(self, request, *args, **kwargs):
        return Response(
            [
                {"code": c.code,
                 "name": c.name,
                 "rate": self.get_exchange_rate(c.code)}
                for c in Currencies.get_currencies()
            ]
        )
