import django.core.mail
from django.template.exceptions import TemplateDoesNotExist

from user_office.tasks import send_mail
from .base import APITestCase


class TestMailCase(APITestCase):
    def test_mail_sending(self):
        send_mail.delay("Subject", "mail@mail.com", "mail/token_incoming.html", {})

        sent_mails = django.core.mail.outbox

        self.assertEqual(len(sent_mails), 1)
        self.assertEqual(sent_mails[0].subject, "Subject")

    def test_invalid_template(self):
        result = send_mail.delay("Subject", "mail@mail.com", "invalid_template.html", {})
        self.assertIsInstance(result.info, TemplateDoesNotExist)
