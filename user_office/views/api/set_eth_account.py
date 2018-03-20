import coreapi
from .auth import KYCAndLoginPermission
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.schemas import AutoSchema
from web3 import Web3


class SetEthSerializer(serializers.Serializer):
    eth_account = serializers.CharField(max_length=42)

    def validate_eth_account(self, value):
        return Web3.toChecksumAddress(value)


class SetEthAccount(APIView):
    """
    Set Ethereum account for user
    """

    schema = AutoSchema(
        manual_fields=[
            coreapi.Field(name='eth_account', location='form', required=True),
        ]
    )

    serializer = SetEthSerializer
    permission_classes = (KYCAndLoginPermission,)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer(data=request.data)

        if serializer.is_valid():
            if request.user.eth_account == '':
                request.user.eth_account = serializer.validated_data['eth_account']
                request.user.save()
            else:
                return Response(data={'success': False,
                                      'error': 'eth account already filled'},
                                status=422)

            return Response(data={'success': True})
        else:
            return Response(data={'success': False,
                                  'error': 'invalid parameters'},
                            status=422)
