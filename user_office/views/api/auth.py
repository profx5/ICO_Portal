from rest_framework.permissions import BasePermission
from django.conf import settings

from user_office.views.common import is_user_authenticated


KYC_Required_Views = ['GetAccount', 'PrepareTokensMove', 'CollectReferralBonuses', ]


class KYCAndLoginPermission(BasePermission):
    def _check_KYC(self, user, view):
        return not settings.KYC_ENABLED or \
            view.__class__.__name__ not in KYC_Required_Views or user.passed_kyc

    def _check_request(self, request):
        return request.user and is_user_authenticated(request.user)

    def has_permission(self, request, view):
        if self._check_request(request) and self._check_KYC(request.user, view):
            return True
        else:
            return False
