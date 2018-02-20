from django.shortcuts import render, redirect
from django.views.generic import View
from user_office.models import Investor
from django.contrib.auth import authenticate, login


class LoginView(View):
    auth_backend = 'user_office.auth_backend.UserOfficeAuthBackend'
    template_name = "login.html"

    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        user = authenticate(request,
                            passwd=request.POST['password'],
                            eth_addr=request.POST['eth_addr'],
                            username=request.POST['username'])

        if user is not None:
            login(request, user, self.auth_backend)

        return redirect('/user_office/')
