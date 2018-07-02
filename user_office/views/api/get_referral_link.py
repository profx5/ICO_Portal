from .auth import KYCAndLoginPermission
from rest_framework.views import APIView
from rest_framework.response import Response
from django.urls import reverse
from django.conf import settings


class GetReferralLinkView(APIView):
    """
    Return referal link
    """
    permission_classes = (KYCAndLoginPermission,)

    def get(self, request, *args, **kwargs):
        link = '{}{}?refid={}'.format(settings.HOST, reverse('signup'), request.user.referral_id)

        return Response(data={'link': link})
