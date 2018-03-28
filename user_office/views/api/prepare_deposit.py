import coreapi
from .auth import KYCAndLoginPermission
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.schemas import AutoSchema
from user_office.models import Deposit, Mint
from blockchain.ethereum_contract import settings


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

        value = request.data['value']
        txn_hash = request.data['txn_hash']

        amount, amount_wo_bonus = settings.Settings.calc_tokens_amount(value)

        data = {'investor': self.request.user.id,
                'amount': amount,
                'amount_wo_bonus': amount_wo_bonus,
                'state': 'PREPARED',
                'mint': {
                    'currency': 'ETH',
                    'txn_hash': txn_hash,
                    'account_to': settings.Settings.ico_info['crowdSaleAddress'],
                    'account_from': request.user.eth_account,
                    'value': value,
                    'state': 'WAIT'
                }}

        serialized = self.serializer(data=data)

        if serialized.is_valid():
            serialized.save()

            return Response(data={'success': True}, status=201)
        else:
            return Response(data={'success': False, 'error': serialized.errors},
                            status=422)
