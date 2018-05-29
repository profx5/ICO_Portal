import coreapi
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.schemas import AutoSchema
from oslash import Right

from .auth import KYCAndLoginPermission
from user_office.services import SendChangeEmailConfirm


class ChangeEmail(APIView):
    """
    Change user email
    """

    schema = AutoSchema(
        manual_fields=[
            coreapi.Field(name='email', location='form', required=True),
        ]
    )

    permission_classes = (KYCAndLoginPermission,)

    def post(self, request, *args, **kwargs):
        result = SendChangeEmailConfirm()(investor=request.user,
                                          email=request.data['email'])

        if isinstance(result, Right):
            return Response(data={'success': True})
        else:
            return Response(data={'success': False,
                                  'error': result.value}, status=400)
