from django.shortcuts import render, redirect
from django.views.generic import View
from django.contrib.auth import authenticate, login

from user_office.services import GetMMToken


class LoginView(View):
    template_name = "authentication/login.html"

    def render_login_page(self, request):
        token = GetMMToken()().value.token
        context = {'token': token}

        return render(request, self.template_name, context)

    def get(self, request):
        if self.request.user.is_authenticated:
            return redirect('user_office')

        return self.render_login_page(request)

    def post(self, request):
        if 'email' in request.POST.keys():
            user = authenticate(request,
                                email=request.POST['email'],
                                password=request.POST['password'])
        elif 'account' in request.POST.keys():
            user = authenticate(request,
                                account=request.POST['account'],
                                signature=request.POST['signature'])
        else:
            user = None

        if user is not None:
            login(request, user)

            return redirect('user_office')
        else:
            return redirect('login')
