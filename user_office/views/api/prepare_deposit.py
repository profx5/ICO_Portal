import coreapi
from .auth import KYCAndLoginPermission
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.schemas import AutoSchema
from oslash import Right

from user_office.models import Deposit, Mint
from user_office.services import PrepareDeposit as PrepareDepositService


class MintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mint

        fields = ('currency', 'txn_hash', 'account_to', 'account_from', 'value',
                  'state')

class DepositSerializer(serializers.ModelSerializer):
    mint = MintSerializer()

    class Meta:
        model = Deposit

        fields = ('investor', 'amount', 'amount_wo_bonus', 'mint', 'state')

    def create(self, validated_data):
        mint_data = validated_data.pop('mint')

        mint = Mint.objects.create(**mint_data)
        deposit = Deposit.objects.create(mint=mint, **validated_data)

        return deposit


class PrepareDeposit(APIView):
    """
    Create prepared deposit
    """

    schema = AutoSchema(
        manual_fields=[
            coreapi.Field(name='value', location='form', required=True),
            coreapi.Field(name='txn_hash', location='form', required=True)
        ]
    )

    serializer = DepositSerializer
    permission_classes = (KYCAndLoginPermission,)

    def post(self, request, *args, **kwargs):
        if not request.user.eth_account_filled:
            return Response(423, {'error': 'fill eth account'})

        result = PrepareDepositService()(investor=request.user,
                                         value=request.data['value'],
                                         txn_hash=request.data['txn_hash'])

        if isinstance(result, Right):
            return Response(data={'success': True}, status=201)
        else:
            return Response(data={'success': False, 'error': result.value},
                            status=422)
