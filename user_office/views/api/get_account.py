import coreapi
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.schemas import AutoSchema
from oslash import Right

from blockchain.currencies.coinpayments.services import GetAccount as GetAccountService
from blockchain.currencies import Currencies
from .auth import KYCAndLoginPermission


class GetAccount(APIView):
    """
    Return user account address by currency code (doesn't work with ETH)
    """

    schema = AutoSchema(
        manual_fields=[
            coreapi.Field(name='currency', location='query', required=True),
        ]
    )

    permission_classes = (KYCAndLoginPermission,)

    def get(self, request, *args, **kwargs):
        currency_code = request.query_params['currency'].upper()

        currency = Currencies.get_currency(currency_code)

        result = GetAccountService()(request.user, currency)

        if isinstance(result, Right):
            return Response(data={'success': True, 'address': result.value.address})
        else:
            return Response(data={'success': False, 'error': result.value},
                            status=422)
