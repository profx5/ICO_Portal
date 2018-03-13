from user_office.views.common import is_user_authenticated
from rest_framework.permissions import BasePermission
from django.conf import settings


Non_KYC_API_Views = ['GetMeView', 'KYCViewSet']


class KYCAndLoginPermission(BasePermission):
    # def _check_KYC(self, user, view):
    #     return not settings.KYC_ENABLED or \
    #         view.__class__.__name__ in Non_KYC_API_Views or user.passed_kys

    def _check_request(self, request):
        return request.user and is_user_authenticated(request.user)

    def has_permission(self, request, view):
        if self._check_request(request): # and self._check_KYC(request.user, view):
            return True
        else:
            return False
