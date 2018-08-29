from oslash import Right
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from user_office.services.prepare_referral_bonus import PrepareReferralBonuses as PrepareReferralBonusesService
from .auth import KYCAndLoginPermission


class PrepareReferralBonuses(APIView):
    permission_classes = (KYCAndLoginPermission,)

    def post(self, request, *args, **kwargs):
        if not request.user.eth_account_filled:
            return Response(data={'error': 'fill eth account'}, status=status.HTTP_403_FORBIDDEN)

        result = PrepareReferralBonusesService()(investor=request.user)

        if isinstance(result, Right):
            return Response(data={'success': True}, status=status.HTTP_200_OK)
        else:
            return Response(data={'success': False, 'error': result.value}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
