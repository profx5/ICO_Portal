from django.shortcuts import render, redirect
from django.views.generic import View

from user_office.models import Investor
from user_office.forms import SignUpForm


class SignUpView(View):
    template_name = "authentication/signup.html"

    def _get_referrer(self, request):
        if 'refid' in request.POST:
            referrer = Investor.objects.filter(referral_id=request.POST['refid'])

            if referrer:
                return referrer[0]

    def get(self, request):
        form = SignUpForm()

        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = SignUpForm(request.POST)

        investor = form.save(commit=False)

        referrer = self._get_referrer(request)
        if referrer:
            investor.referrer = referrer

        investor.save()

        return redirect('/login')
