from django.shortcuts import render, redirect
from django.views.generic import View
from user_office.models import Investor
from django.contrib.auth import authenticate, login


class LoginView(View):
    template_name = "authentication/login.html"

    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        user = authenticate(request,
                            email=request.POST['email'],
                            password=request.POST['password'])

        if user is not None:
            login(request, user)

        return redirect('/user_office/')
