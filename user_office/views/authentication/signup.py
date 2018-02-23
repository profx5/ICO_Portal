from django.shortcuts import render, redirect
from django.views.generic import View
from user_office.models import Investor


class SignUpView(View):
    template_name = "authentication/signup.html"

    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        investor = Investor.objects.create(username=request.POST['username'],
                                           eth_account=request.POST['eth_account'])

        investor.set_password(request.POST['password'])
        investor.save()

        return redirect('/login')
