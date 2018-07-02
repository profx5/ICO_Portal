from django.shortcuts import render
from django.views.generic import View
from django.conf import settings
from social_core.actions import do_complete
from social_django.utils import load_strategy, load_backend
from social_django.views import _do_login

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

        return render(request, self.template_name, {'form': form,
                                                    'sitekey': settings.REDAPTCHA_DATA_SITEKEY})

    def post(self, request, *args, **kwargs):
        form = SignUpForm(request.POST)

        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password2']

            strategy = load_strategy(request)
            backend = load_backend(strategy, 'email', None)

            return do_complete(backend, _do_login,
                               request=request,
                               email=email,
                               password=password)
        else:
            raise Exception('Invalid signup data')
