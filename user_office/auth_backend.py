from django.contrib.auth.backends import ModelBackend
from .models import Investor


class UserOfficeAuthBackend(ModelBackend):
    def authenticate(self, request, passwd, eth_account=None, username=None):
        try:
            user = Investor.objects.find_for_auth(username, eth_account)
        except Investor.DoesNotExist:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a nonexistent user (#20760).
            Investor().set_password(passwd)
        else:
            if user.check_password(passwd) and self.user_can_authenticate(user):
                return user

    def get_user(self, user_id):
        try:
            user = Investor.objects.get(id=user_id)
        except Investor.DoesNotExist:
            return None

        return user if self.user_can_authenticate(user) else None
