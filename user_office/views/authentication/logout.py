from django.shortcuts import redirect
from django.contrib.auth import logout as auth_logout
from django.urls import reverse_lazy


def logout(request):
    auth_logout(request)

    return redirect(reverse_lazy('login'))
