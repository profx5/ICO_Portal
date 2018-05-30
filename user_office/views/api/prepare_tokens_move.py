import coreapi
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.schemas import AutoSchema
from oslash import Right, Left

from blockchain.ico.services import CalcTokensAmount, \
    PrepareTokensMove as PrepareTokensMoveService
from .auth import KYCAndLoginPermission


class CalcAndPrepareTM:
    def calc_tokens_amount(self, args):
        result = CalcTokensAmount()(value=args['value'],
                                  currency=args['currency'])

        return result | (lambda result: Right(dict(args, amount=result[0])))

    def prepare_tokens_move(self, args):
        return PrepareTokensMoveService()(investor=args['investor'],
                                          txn_hash=args['txn_hash'],
                                          currency=args['currency'],
                                          amount=args['amount'])

    def __call__(self, investor, txn_hash, currency, value):
        return Right({'investor': investor,
                      'txn_hash': txn_hash,
                      'currency': currency,
                      'value': value}) | \
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
