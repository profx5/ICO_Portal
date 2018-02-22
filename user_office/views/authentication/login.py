from django.shortcuts import render, redirect
from django.views.generic import View
from user_office.models import Investor
from django.contrib.auth import authenticate, login


class LoginView(View):
    auth_backend = 'user_office.auth_backend.UserOfficeAuthBackend'
    template_name = "authentication/login.html"

    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        user = authenticate(request,
                            passwd=request.POST['password'],
                            eht_account=request.POST['eht_account'],
                            username=request.POST['username'])

        if user is not None:
            login(request, user, self.auth_backend)

        return redirect('/user_office/')
