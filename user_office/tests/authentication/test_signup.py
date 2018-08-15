from unittest.mock import patch

from django.test import override_settings
from django.urls import reverse
from django.conf import settings

from ico_portal.utils import tuple_exclude
from user_office.models import Investor
from user_office.tests.base import APITestCase


SOCIAL_AUTH_EMAIL_PIPELINE_MOCK = tuple_exclude(
    settings.SOCIAL_AUTH_EMAIL_PIPELINE,
    ['user_office.auth_steps.check_recaptcha', ]
)


class TestSignupWithEmail(APITestCase):
    setup_login = False

    @patch('user_office.tasks.send_mail.delay')
    @override_settings(SOCIAL_AUTH_EMAIL_PIPELINE=SOCIAL_AUTH_EMAIL_PIPELINE_MOCK)
    def assert_authorization(self, send_mail_mock, data, referrer):
        old_investors_count = Investor.objects.count()
        response = self.client.post(reverse('signup'), data)

        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, reverse('email_validation'))
        self.assertIn('sessionid', self.client.cookies)
        self.assertEqual(Investor.objects.count(), old_investors_count)

        temporary_sessionid = self.client.cookies['sessionid']
        send_mail_mock.assert_called_once()
        (_, _, _, context), _kwargs = send_mail_mock.call_args
        self.assertIn('link', context)
        response = self.client.get(context['link'])
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, reverse('user_office'))
        self.assertNotEqual(self.client.cookies['sessionid'], temporary_sessionid)

        self.assertEqual(Investor.objects.count(), old_investors_count + 1)
        self.assertEqual(response.wsgi_request.user.referrer, referrer)

    def test_signup(self):
        self.assert_authorization(
            data={
                'email': 'test@example.com',
                'password1': 'str0ngPa$$word',
                'password2': 'str0ngPa$$word',
            },
            referrer=None)

    def test_referral(self):
        referrer = Investor.objects.get()
        self.assert_authorization(
            data={
                'email': 'test@example.com',
                'password1': 'str0ngPa$$word',
                'password2': 'str0ngPa$$word',
                'refid': referrer.referral_id,
            },
            referrer=referrer)

    def test_invalid_referral(self):
        self.assert_authorization(
            data={
                'email': 'test@example.com',
                'password1': 'str0ngPa$$word',
                'password2': 'str0ngPa$$word',
                'refid': 'foobar',
            },
            referrer=None)
