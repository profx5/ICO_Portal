from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from user_office.currencies import get_enabled_currencies


class GetAvailableCurrencies(GenericAPIView):
    """
    Return list of available cryptocurrencies
    """
    def get(self, request, *args, **kwargs):
        return Response(
            [
                {"code": c.code, "name": c.name}
                for c in get_enabled_currencies()
            ]
        )
