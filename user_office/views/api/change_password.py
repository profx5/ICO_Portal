import coreapi
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.schemas import AutoSchema
from oslash import Right
from django.contrib.auth import logout
from django.shortcuts import redirect

from .auth import KYCAndLoginPermission
from user_office.services import ChangePassword as ChangePasswordService


class ChangePassword(APIView):
    """
    Change user password
    """

    schema = AutoSchema(
        manual_fields=[
            coreapi.Field(name='old_password', location='form', required=True),
            coreapi.Field(name='new_password1', location='form', required=True),
            coreapi.Field(name='new_password2', location='form', required=True),
        ]
    )

    permission_classes = (KYCAndLoginPermission,)

    def post(self, request, *args, **kwargs):
        result = ChangePasswordService()(investor=request.user,
                                         old_password=request.data['old_password'],
                                         new_password1=request.data['new_password1'],
                                         new_password2=request.data['new_password2'])

        if isinstance(result, Right):
            logout(request)

            return redirect('/login/')
        else:
            return Response(data={'error': result.value}, status=400)
