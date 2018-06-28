import django.core.mail
from datetime import datetime
from django.db import connection

from ..base import APITestCase


class _Base(APITestCase):
    utcnow = datetime(2018, 5, 25)
    new_email = 'nodrog@ongrid.pro'

    def setUp(self):
        super().setUp()

        self.stub_datetime_utcnow(self.utcnow)

        investor = self.get_investor()
        investor.last_login = self.utcnow
        investor.save()

class TestChangeEmail(_Base):
    def test_successful_send_email(self):
        response = self.client.post('/api/changeEmail/', {
            'email': self.new_email
        })

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {'success': True})

        sent_mails = django.core.mail.outbox
        self.assertEqual(len(sent_mails), 1)
        self.assertEqual(sent_mails[0].to[0], self.email)
        self.assertEqual(sent_mails[0].subject, 'Change email')
        self.assertEqual(sent_mails[0].body,
                         f'To change your email to {self.new_email} follow this link ' \
                         'http://localhost:8000/change_email/MTtub2Ryb2dAb25ncmlkLnBybw/4wh-d320ec9b6fcf3233767d/')

    def test_invalid_email(self):
        new_email = 'it_is_no_email'

        response = self.client.post('/api/changeEmail/', {
            'email': new_email
        })

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, {
            'success': False,
            'error': 'invalid email address'
        })

        sent_mails = django.core.mail.outbox
        self.assertEqual(len(sent_mails), 0)


class TestConfirmEmailChange(_Base):
    def test_successful_cofirm(self):
        response = self.client.get('/change_email/MTtub2Ryb2dAb25ncmlkLnBybw/4wh-d320ec9b6fcf3233767d/')

        self.assertEqual(response.content.decode(), 'Email successfully changed')
        self.assertEqual(self.get_investor().email, self.new_email)

    def test_invalid_token(self):
        response = self.client.get('/change_email/MTtub2Ryb2dAb25ncmlkLnBybw/4wh-b111ec9b6fcf3233767d/')

        self.assertEqual(response.content.decode(), 'Error while changing email')
        self.assertEqual(self.get_investor().email, self.email)

    def test_expired_token(self):
        utcnow = datetime(2018, 6, 10)
        self.stub_datetime_utcnow(utcnow)

        response = self.client.get('/change_email/MTtub2Ryb2dAb25ncmlkLnBybw/4wh-d320ec9b6fcf3233767d/')
        self.assertEqual(response.content.decode(), 'Error while changing email')
        self.assertEqual(self.get_investor().email, self.email)
