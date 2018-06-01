from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User
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


UserModel = User

class AdminUserBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None:
            username = kwargs.get(UserModel.USERNAME_FIELD)
        try:
            user = UserModel._default_manager.get_by_natural_key(username)
        except UserModel.DoesNotExist:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a nonexistent user (#20760).
            UserModel().set_password(password)
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user

    def get_user(self, user_id):
        try:
            user = UserModel._default_manager.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None
        return user if self.user_can_authenticate(user) else None
