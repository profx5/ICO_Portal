from django.contrib.auth.backends import ModelBackend
from .models import Investor


class EmailBackend(ModelBackend):
    def authenticate(self, request, email, password):
        try:
            user = Investor.objects.get(email=email)
        except Investor.DoesNotExist:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a nonexistent user (#20760).
            Investor().set_password(password)
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user

    def get_user(self, user_id):
        try:
            user = Investor.objects.get(id=user_id)
        except Investor.DoesNotExist:
            return None

        return user if self.user_can_authenticate(user) else None


class AdminUserBackend(ModelBackend):
    def authenticate(self, request, username, password):
        try:
            user = Investor.objects.get(email=username, is_admin=True)
        except Investor.DoesNotExist:
            Investor().set_password(password)
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user

    def get_user(self, user_id):
        try:
            user = Investor.objects.get(id=user_id, is_admin=True)
        except Investor.DoesNotExist:
            return None

        return user if self.user_can_authenticate(user) else None
