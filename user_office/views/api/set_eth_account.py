import coreapi
from oslash import Right
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.schemas import AutoSchema

from .auth import KYCAndLoginPermission
from user_office.services import set_eth_account


class SetETHAccount(APIView):
    """
    Set Ethereum account for user
    """

    schema = AutoSchema(
        manual_fields=[
            coreapi.Field(name='eth_account', location='form', required=True),
        ]
    )

    permission_classes = (KYCAndLoginPermission,)

    def post(self, request, *args, **kwargs):
        service = set_eth_account.SetETHAccount()

        result = service(request.user, request.data['eth_account'])

        if isinstance(result, Right):
            return Response(data={'success': True})
        else:
            status = 422 if isinstance(result, set_eth_account.InvalidAddress) else 500

            return Response(data={'success': False,
                                  'error': result.value},
                            status=status)
