import coreapi
from oslash import Right
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.schemas import AutoSchema

from blockchain.ico.services import PrepareTokensMove as PrepareTokensMoveService
from .auth import KYCAndLoginPermission


class PrepareTokensMove(APIView):
    """
    Created prepared tokens move and transfer objects
    """

    currency = 'ETH'

    schema = AutoSchema(
        manual_fields=[
            coreapi.Field(name='value', location='form', required=True),
            coreapi.Field(name='txn_hash', location='form', required=True),
        ]
    )

    permission_classes = (KYCAndLoginPermission,)

    def post(self, request, *args, **kwargs):
        if not request.user.eth_account_filled:
            return Response(423, {'error': 'fill eth account'})

        result = PrepareTokensMoveService()(investor=request.user,
                                            currency=self.currency,
                                            txn_hash=request.data['txn_hash'])

        if isinstance(result, Right):
            return Response(data={'success': True}, status=201)
        else:
            return Response(data={'success': False, 'error': result.value},
                            status=422)
