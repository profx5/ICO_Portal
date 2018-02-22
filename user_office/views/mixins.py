from django.shortcuts import redirect
from user_office.models import Investor
from django.contrib.auth import logout


class LoginRequiredMixin:
    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated and isinstance(request.user, Investor):
            return super().dispatch(request, *args, **kwargs)
        else:
            return redirect('/login')
