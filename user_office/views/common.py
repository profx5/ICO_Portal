from django.shortcuts import redirect
from user_office.models import Investor


def is_user_authenticated(user):
    return user.is_authenticated and isinstance(user, Investor)


class LoginRequiredMixin:
    def dispatch(self, request, *args, **kwargs):
        if is_user_authenticated(request.user):
            return super().dispatch(request, *args, **kwargs)
        else:
            return redirect('/login')
