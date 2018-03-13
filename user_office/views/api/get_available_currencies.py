from .auth import KYCAndLoginPermission
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from blockchain.currencies import Currencies


class GetAvailableCurrencies(GenericAPIView):
    """
    Return list of available cryptocurrencies
    """

    permission_classes = (KYCAndLoginPermission,)

    def get(self, request, *args, **kwargs):
        return Response(
            [
                {"code": c.code, "name": c.name}
                for c in Currencies.get_currencies()
            ]
        )
