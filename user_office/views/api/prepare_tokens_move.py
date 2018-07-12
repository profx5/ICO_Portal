import coreapi
from oslash import Right
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.schemas import AutoSchema

from blockchain.ico.services import CalcTokensAmount, \
    PrepareTokensMove as PrepareTokensMoveService
from .auth import KYCAndLoginPermission
from ico_portal.utils.service_object import ServiceObject, service_call


class CalcAndPrepareTM(ServiceObject):
    def calc_tokens_amount(self, context):
        result = CalcTokensAmount()(value=context.value,
                                    currency=context.currency)

        return result | (lambda result: self.success(amount=result.amount))

    def prepare_tokens_move(self, context):
        return PrepareTokensMoveService()(investor=context.investor,
                                          txn_hash=context.txn_hash,
                                          currency=context.currency,
                                          amount=context.amount)

    @service_call
    def __call__(self, investor, txn_hash, currency, value):
        return self.success(investor=investor, txn_hash=txn_hash,
                            currency=currency, value=value) | \
                            self.calc_tokens_amount | \
                            self.prepare_tokens_move


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

        result = CalcAndPrepareTM()(investor=request.user,
                                    value=request.data['value'],
                                    txn_hash=request.data['txn_hash'],
                                    currency=self.currency)

        if isinstance(result, Right):
            return Response(data={'success': True}, status=201)
        else:
            return Response(data={'success': False, 'error': result.value},
                            status=422)
