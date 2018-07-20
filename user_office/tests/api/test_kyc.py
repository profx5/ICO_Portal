from shutil import rmtree  # noqa
from django.conf import settings

from .helpers.fixture import fixture_path
from ..base import APITestCase
from user_office.models import KYC
from helpdesk.models import Ticket


class TestKYC(APITestCase):
    def tearDown(self):
        super().tearDown()

        rmtree(settings.MEDIA_ROOT, ignore_errors=True)

    @property
    def _expected_natural(self):
        ticket_id = Ticket.objects.last().id

        return {
            'address': None,
            'basis_doc': None,
            'beneficial_birthdate': None,
            'beneficial_fullname': None,
            'beneficial_personal_id': None,
            'beneficial_place_of_birth': None,
            'beneficial_place_of_residence': None,
            'bill_photo': 'http://testserver/media/kyc/1/bill_photo/bill.jpg',
            'birthdate': None,
            'business_name': None,
            'decline_reason': None,
            'director_firstname': None,
            'director_lastname': None,
            'email': 'gordon@ongrid.pro',
            'field_of_activity': None,
            'firstname': 'John',
            'id_document_photo': 'http://testserver/media/kyc/1/doc_photo/document.jpg',
            'is_pep': None,
            'lastname': 'Doe',
            'personal_id': None,
            'phone_number': '+79999999999',
            'place_of_birth': 'Moscow, Russia',
            'place_of_residence': 'Moscow, Russia',
            'profession': 'Medic',
            'registration_date': None,
            'registration_number': None,
            'state': 'WAITING',
            'ticket': ticket_id,
            'type': 'NATURAL'
        }

    @property
    def _expected_legal(self):
        ticket_id = Ticket.objects.last().id

        return {
            'address': 'Moscow, Russia',
            'basis_doc': 'http://testserver/media/kyc/1/basis/basis.jpg',
            'beneficial_birthdate': '1990-01-01',
            'beneficial_fullname': 'John Doe',
            'beneficial_personal_id': '1488123',
            'beneficial_place_of_birth': 'Moscow, Russia',
            'beneficial_place_of_residence': 'Moscow, Russia',
            'bill_photo': 'http://testserver/media/kyc/1/bill_photo/bill.jpg',
            'birthdate': None,
            'business_name': 'Vector',
            'decline_reason': None,
            'director_firstname': 'John',
            'director_lastname': 'Doe',
            'email': 'john@ongrid.pro',
            'field_of_activity': 'Drugs',
            'firstname': None,
            'id_document_photo': 'http://testserver/media/kyc/1/doc_photo/document.jpg',
            'is_pep': True,
            'lastname': None,
            'personal_id': None,
            'phone_number': '88005553535',
            'place_of_birth': None,
            'place_of_residence': None,
            'profession': None,
            'registration_date': '2013-01-01',
            'registration_number': None,
            'state': 'WAITING',
            'ticket': ticket_id,
            'type': 'LEGAL'
        }

    def test_create_natural_kyc(self):
        with open(fixture_path('document.jpg'), 'rb') as photo, \
             open(fixture_path('bill.jpg'), 'rb') as bill:
            response = self.client.post('/api/kyc/', {
                'type': 'NATURAL',
                'firstname': 'John',
                'lastname': 'Doe',
                'place_of_birth': 'Moscow, Russia',
                'birth_date': '1990-01-01',
                'peronal_id': '1488123',
                'phone_number': '+79999999999',
                'email': 'gordon@ongrid.pro',
                'place_of_residence': 'Moscow, Russia',
                'profession': 'Medic',
                'id_document_photo': photo,
                'bill_photo': bill
            })

        self.assertEqual(KYC.objects.count(), 1)
        kyc = KYC.objects.first()
        self.assertEqual(kyc.investor, self.get_investor())

        ticket = kyc.ticket
        self.assertEqual(Ticket.objects.first(), ticket)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data, self._expected_natural)

    def test_create_legal_kyc(self):
        with open(fixture_path('document.jpg'), 'rb') as photo, \
             open(fixture_path('bill.jpg'), 'rb') as bill, \
             open(fixture_path('basis.jpg'), 'rb') as basis:
            response = self.client.post('/api/kyc/', {
                'type': 'LEGAL',
                'business_name': 'Vector',
                'registration_umber': '13123123123',
                'registration_date': '2013-01-01',
                'phone_number': '88005553535',
                'director_firstname': 'John',
                'director_lastname': 'Doe',
                'basis_doc': basis,
                'email': 'john@ongrid.pro',
                'address': 'Moscow, Russia',
                'field_of_activity': 'Drugs',
                'beneficial_fullname': 'John Doe',
                'beneficial_personal_id': '1488123',
                'beneficial_birthdate': '1990-01-01',
                'beneficial_place_of_birth': 'Moscow, Russia',
                'beneficial_place_of_residence': 'Moscow, Russia',
                'is_pep': True,
                'id_document_photo': photo,
                'bill_photo': bill
            })

        self.assertEqual(KYC.objects.count(), 1)
        kyc = KYC.objects.first()
        self.assertEqual(kyc.investor, self.get_investor())

        ticket = kyc.ticket
        self.assertEqual(Ticket.objects.first(), ticket)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data, self._expected_legal)

    def test_get_created_kyc(self):
        with open(fixture_path('document.jpg'), 'rb') as photo, \
             open(fixture_path('bill.jpg'), 'rb') as bill:
            self.client.post('/api/kyc/', {
                'type': 'NATURAL',
                'firstname': 'John',
                'lastname': 'Doe',
                'place_of_birth': 'Moscow, Russia',
                'birth_date': '1990-01-01',
                'peronal_id': '1488123',
                'phone_number': '+79999999999',
                'email': 'gordon@ongrid.pro',
                'place_of_residence': 'Moscow, Russia',
                'profession': 'Medic',
                'id_document_photo': photo,
                'bill_photo': bill
            })

        response = self.client.get('/api/kyc/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, self._expected_natural)

    def test_get_not_created_kyc(self):
        response = self.client.get('/api/kyc/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {})

    def test_update_kyc(self):
        with open(fixture_path('document.jpg'), 'rb') as photo, \
             open(fixture_path('bill.jpg'), 'rb') as bill:
            self.client.post('/api/kyc/', {
                'type': 'LEGAL',
                'business_name': 'Vector',
                'registration_umber': '13123123123',
                'registration_date': '2013-01-01',
                'phone_number': '88005553535',
                'director_firstname': 'John',
                'director_lastname': 'Doe',
                'email': 'john@ongrid.pro',
                'address': 'Moscow, Russia',
                'field_of_activity': 'Drugs',
                'beneficial_fullname': 'John Doe',
                'beneficial_personal_id': '1488123',
                'beneficial_birthdate': '1990-01-01',
                'beneficial_place_of_birth': 'Moscow, Russia',
                'beneficial_place_of_residence': 'Moscow, Russia',
                'is_pep': True,
                'id_document_photo': photo,
                'bill_photo': bill
            })
        self.assertEqual(KYC.objects.count(), 1)

        rmtree(settings.MEDIA_ROOT, ignore_errors=True)

        with open(fixture_path('document.jpg'), 'rb') as photo, \
             open(fixture_path('bill.jpg'), 'rb') as bill, \
             open(fixture_path('basis.jpg'), 'rb') as basis:  # noqa
            response = self.client.post('/api/kyc/upd/', {
                'type': 'LEGAL',
                'business_name': 'Vector',
                'registration_umber': '13123123123',
                'registration_date': '2013-01-01',
                'phone_number': '88005553535',
                'director_firstname': 'John',
                'director_lastname': 'Doe',
                'basis_doc': basis,  # !!!
                'email': 'john@ongrid.pro',
                'address': 'Moscow, Russia',
                'field_of_activity': 'Drugs',
                'beneficial_fullname': 'John Doe',
                'beneficial_personal_id': '1488123',
                'beneficial_birthdate': '1990-01-01',
                'beneficial_place_of_birth': 'Moscow, Russia',
                'beneficial_place_of_residence': 'Moscow, Russia',
                'is_pep': True,
                'id_document_photo': photo,
                'bill_photo': bill
            })

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, self._expected_legal)
