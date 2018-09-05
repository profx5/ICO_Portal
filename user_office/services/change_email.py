from urllib.parse import urljoin
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError
from user_office.tasks import send_mail
from django.conf import settings
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.db import DatabaseError

from user_office.models import Investor
from ico_portal.utils.datetime import datetime
from ico_portal.utils.service_object import service_call, ServiceObject


class CheckEmailMixin:
    def check_email(self, context):
        if context.email != context.investor.email:
            validator = EmailValidator()

            try:
                validator(context.email)

                return self.success()
            except ValidationError:
                return self.fail('invalid email address')


class EmailResetTokenGenerator(PasswordResetTokenGenerator):
    key_salt = "user_office.services.change_email.EmailResetTokenGenerator"

    def _make_hash_value(self, user, timestamp):
        login_timestamp = '' if user.last_login is None else user.last_login.replace(microsecond=0, tzinfo=None)
        return str(user.pk) + user.email + str(login_timestamp) + str(timestamp)

    def _today(self):
        return datetime.utcnow().date()


class SendChangeEmailConfirm(ServiceObject, CheckEmailMixin):
    def get_token(self, context):
        token = EmailResetTokenGenerator().make_token(context.investor)

        return self.success(token=token)

    def encode_user_id_and_email(self, context):
        encode_string = f'{context.investor.id};{context.email}'
        encoded = urlsafe_base64_encode(force_bytes(encode_string)).decode()

        return self.success(uid=encoded)

    def send_email(self, context):
        link = urljoin(settings.HOST, f'change_email/{context.uid}/{context.token}/')

        send_mail.delay('Change email', context.investor.email, 'mail/change_email.html', {
            'link': link,
            'old_email': context.investor.email,
            'new_email': context.email
        })

        return self.success()

    @service_call
    def __call__(self, investor, email):
        return self.success(investor=investor, email=email.lower()) | \
            self.check_email | \
            self.get_token | \
            self.encode_user_id_and_email | \
            self.send_email


class SetEmail(ServiceObject, CheckEmailMixin):
    def parse_uid(self, context):
        try:
            decoded = urlsafe_base64_decode(context.uid).decode()
            user_id, new_email = decoded.split(';')

            return self.success(user_id=user_id, email=new_email)
        except (TypeError, ValueError, OverflowError) as e:
            return self.fail(e)

    def find_investor(self, context):
        try:
            investor = Investor.objects.get(pk=context.user_id)

            if investor.id == context.investor.id:
                return self.success(investor=investor)
            else:
                return self.fail('Invalid investor')
        except Investor.DoesNotExist as e:
            return self.fail(e)

    def check_token(self, context):
        is_token_valid = EmailResetTokenGenerator().check_token(context.investor, context.token)

        if is_token_valid:
            return self.success()
        else:
            return self.fail('Invalid token')

    def save_email(self, context):
        investor = context.investor

        try:
            investor.email = context.email
            investor.save()

            return self.success()
        except DatabaseError as e:
            return self.fail(e)

    @service_call
    def __call__(self, investor, uid, token):
        return self.success(uid=uid, token=token, investor=investor) | \
            self.parse_uid | \
            self.find_investor | \
            self.check_token | \
            self.check_email | \
            self.save_email
