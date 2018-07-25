from django.conf import settings
from django.views.generic import FormView
from social_core.actions import do_complete
from social_django.utils import load_strategy, load_backend
from social_django.views import _do_login

from user_office.forms import SignUpForm
from user_office.models import Investor


class SignUpView(FormView):
    template_name = "authentication/signup.html"
    form_class = SignUpForm

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.request = None

    def _get_referrer(self, request):
        if 'refid' in request.POST:
            referrer = Investor.objects.filter(referral_id=request.POST.get('refid'))

            if referrer.exists():
                return referrer.first()

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['sitekey'] = settings.RECAPTCHA_DATA_SITEKEY
        return ctx

    def form_valid(self, form):
        email = form.cleaned_data['email']
        password = form.cleaned_data['password2']

        strategy = load_strategy(self.request)
        backend = load_backend(strategy, 'email', None)

        return do_complete(backend, _do_login,
                           request=self.request,
                           email=email,
                           password=password)
