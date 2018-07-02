from shutil import rmtree
from django.conf import settings

from .helpers.kyc import create_kyc
from ..base import APITestCase
from user_office.models import KYC
from helpdesk.models import Ticket


class TestKYC(APITestCase):
    def setUp(self):
        super().setUp()

        rmtree(settings.MEDIA_ROOT, ignore_errors=True)

    @property
    def _expected(self):
        ticket_id = Ticket.objects.last().id

        return {
            'state': 'WAITING',
            'user_photo': f'http://testserver/media/kyc/{self._investor_id}/selfie/selfie.jpg',
            'firstname': 'John',
            'midname': None,
            'surname': 'Doe',
            'gender': 'M',
            'birthdate': '1990-01-01',
            'country': 'Russia',
            'city': 'Moscow',
            'registration_address': 'Lenina st., 1, 4',
            'postcode': '123422',
            'document_type': 'Passport',
            'document_no': '123123',
            'document_country': 'Russia',
            'document_date': '1990-01-01',
            'document_photo': f'http://testserver/media/kyc/{self._investor_id}/photo/photo.jpg',
            'decline_reason': None,
            'ticket_id': ticket_id
        }

    def test_create_kyc(self):
        response = create_kyc(self.client)

        self.assertEqual(KYC.objects.count(), 1)
        kyc = KYC.objects.first()
        self.assertEqual(kyc.investor, self.get_investor())

        ticket = kyc.ticket
        self.assertEqual(Ticket.objects.first(), ticket)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data, self._expected)

    def test_get_created_kyc(self):
        response = create_kyc(self.client)

        response = self.client.get('/api/kyc/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, self._expected)

    def test_get_not_created_kyc(self):
        response = self.client.get('/api/kyc/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {})
