from user_office.tasks import send_mail
from django.urls import reverse
from social_core.pipeline.social_auth import social_user, AuthForbidden
from oslash import Right

from user_office.models import Investor
from user_office.services import CheckRECAPTCHA


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


def set_referrer(user, refid, *args, **kwargs):
    user.referrer = Investor.objects.filter(referral_id=refid).first()


def send_validation_email(strategy, backend, code, partial_token):
    if not code.verified:
        email = strategy.request_data().get('email', None)
        url = strategy.absolute_uri(
            '{0}?verification_code={1}&partial_token={2}'.format(
                reverse('social:complete', args=(backend.name,)),
                code.code,
                partial_token))
        ctx = {
            'link': url,
            'email': email
        }

        send_mail.delay('Activation ICO investor account', code.email, 'mail/validation.html', ctx)


def check_recaptcha(backend, details, response, *args, **kwargs):
    g_recaptcha_response = backend.strategy.request_data()['g-recaptcha-response']

    result = CheckRECAPTCHA()(g_recaptcha_response)

    if not isinstance(result, Right):
        raise Exception('RECAPTCHA challenge failed')
