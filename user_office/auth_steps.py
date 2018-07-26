import requests
from django.template import loader
from django.core.mail import send_mail
from django.urls import reverse
from django.conf import settings
from social_core.pipeline.social_auth import social_user, AuthForbidden

from user_office.models import Investor


def associate_user(backend, uid, user=None, social=None, *args, **kwargs):
    if user and not social:
        try:
            storage = backend.strategy.storage

            social = storage.user.create_social_auth(user, uid, backend.name)

            if backend.name != 'email' and user.email and not \
               storage.user.get_social_auth_for_user(user, 'email'):
                storage.user.create_social_auth(user, user.email, 'email')
        except Exception as err:
            if not backend.strategy.storage.is_integrity_error(err):
                raise
            # Protect for possible race condition, those bastard with FTL
            # clicking capabilities, check issue #131:
            #   https://github.com/omab/django-social-auth/issues/131
            return social_user(backend, uid, user, *args, **kwargs)
        else:
            return {'social': social,
                    'user': social.user,
                    'new_association': True}


def user_password(strategy, backend, user, is_new=False, *args, **kwargs):
    password = strategy.request_data().get('password', kwargs['password'])
    if is_new:
        user.set_password(password)
        user.save()
    elif not user.check_password(password):
        raise AuthForbidden(backend)


def set_referrer(strategy, backend, user, is_new=False, *args, **kwargs):
    if 'refid' in strategy.request_data():
        referrer = Investor.objects.filter(referral_id=strategy.request_data()['refid'])

        if referrer:
            user.referrer = referrer


def send_validation_email(strategy, backend, code, partial_token):
    if not code.verified:
        url = strategy.absolute_uri(
            '{0}?verification_code={1}&partial_token={2}'.format(
                reverse('social:complete', args=(backend.name,)),
                code.code,
                partial_token))

        content = loader.render_to_string('mail/validation.html', {'link': url})

        send_mail('Activation ICO investor account', content,
                  settings.DEFAULT_FROM_EMAIL, [code.email], fail_silently=True)


def check_recaptcha(backend, details, response, *args, **kwargs):
    g_recaptcha_response = backend.strategy.request_data()['g-recaptcha-response']
    secret = settings.RECAPTCHA_SECRET

    response = requests.post('https://www.google.com/recaptcha/api/siteverify',
                             data={'secret': secret,
                                   'response': g_recaptcha_response})

    result = response.json()

    if not result['success']:
        raise Exception('RECAPTCHA challenge failed')
