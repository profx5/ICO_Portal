from urllib.parse import urljoin
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.conf import settings
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template import loader
from django.db import DatabaseError
from oslash import Left, Right

from user_office.models import Investor
from ico_portal.utils.datetime import datetime


def check_email(args):
    if args['email'] != args['investor'].email:
        validator = EmailValidator()

        try:
            validator(args['email'])

            return Right(args)
        except ValidationError:
            return Left('invalid email address')


class EmailResetTokenGenerator(PasswordResetTokenGenerator):
    key_salt = "user_office.services.change_email.EmailResetTokenGenerator"

    def _make_hash_value(self, user, timestamp):
        login_timestamp = '' if user.last_login is None else user.last_login.replace(microsecond=0, tzinfo=None)
        return str(user.pk) + user.email + str(login_timestamp) + str(timestamp)

    def _today(self):
        return datetime.utcnow().date()


class SendChangeEmailConfirm:
    def get_token(self, args):
        token = EmailResetTokenGenerator().make_token(args['investor'])

        return Right(dict(args, token=token))

    def encode_user_id_and_email(self, args):
        investor = args['investor']
        email = args['email']

        encode_string = f'{investor.id};{email}'
        encoded = urlsafe_base64_encode(force_bytes(encode_string)).decode()

        return Right(dict(args, uid=encoded))

    def send_email(self, args):
        investor = args['investor']
        token = args['token']
        uid = args['uid']
        new_email = args['email']

        link = urljoin(settings.HOST, f'change_email/{uid}/{token}/')

        content = loader.render_to_string('mail/change_email.html', {
            'link': link,
            'email': new_email
        })

        send_mail('Change email', content, settings.EMAIL_HOST_USER,
                  [investor.email], fail_silently=True)

        return Right(args)

    def __call__(self, investor, email):
        return Right({'investor': investor,
                      'email': email.lower()}) | \
                      check_email | \
                      self.get_token | \
                      self.encode_user_id_and_email | \
                      self.send_email


class SetEmail:
    def parse_uid(self, args):
        try:
            decoded = urlsafe_base64_decode(args['uid']).decode()
            user_id, new_email = decoded.split(';')

            return Right(dict(args, user_id=user_id, email=new_email))
        except (TypeError, ValueError, OverflowError) as e:
            return Left(f'Cant parse uid, {e}')

    def find_investor(self, args):
        try:
            investor = Investor.objects.get(pk=args['user_id'])

            if investor.id == args['investor'].id:
                return Right(dict(args, investor=investor))
            else:
                return Left('Invalid investor')
        except Investor.DoesNotExist as e:
            return Left(f'Cant find investor, {e}')

    def check_token(self, args):
        is_token_valid = EmailResetTokenGenerator().check_token(args['investor'], args['token'])

        if is_token_valid:
            return Right(args)
        else:
            return Left('Invalid token')

    def save_email(self, args):
        investor = args['investor']

        try:
            investor.email = args['email']
            investor.save()

            return Right(args)
        except DatabaseError as e:
            return Left(f'Error while saving investor, {e}')

    def __call__(self, investor, uid, token):
        return Right({'uid': uid,
                      'token': token,
                      'investor': investor}) | \
                      self.parse_uid | \
                      self.find_investor | \
                      self.check_token | \
                      check_email | \
                      self.save_email
