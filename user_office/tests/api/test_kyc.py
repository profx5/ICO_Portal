from shutil import rmtree  # noqa
from django.conf import settings
from django.test.utils import override_settings

from .helpers.fixture import fixture_path
from ..base import EthTesterAPITestCase, APITestCase
from user_office.models import KYC
from helpdesk.models import Ticket
from blockchain.ico.services import SendPreparedTxns


class TestKYC(APITestCase):
    def tearDown(self):
        super().tearDown()

        rmtree(settings.MEDIA_ROOT, ignore_errors=True)

    def assert_response_natural(self, response):
        ticket_id = Ticket.objects.last().id
        wo_attacmemts = {k: v for k, v in response.data.items() if k != 'attachments'}

        self.assertDictEqual(wo_attacmemts, {
            'address': None,
            'beneficial_birthdate': None,
            'beneficial_fullname': None,
            'beneficial_personal_id': None,
            'beneficial_place_of_birth': None,
            'beneficial_place_of_residence': None,
            'birthdate': None,
            'business_name': None,
            'decline_reason': None,
            'director_firstname': None,
            'director_lastname': None,
            'email': 'gordon@ongrid.pro',
            'field_of_activity': None,
            'firstname': 'John',
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
        })

        self.assertListEqual(response.data['attachments'], [
            {
                'file': 'http://testserver/media/ae0e9df12a898fa098779e1520334db0f051b1a4a63e5ce96588823f2c1ed78a.jpg',
                'filename': 'document.jpg',
                'mime_type': 'image/jpeg',
                'size': 30236,
                'type': 'id_document_photo'
            },
            {
                'file': 'http://testserver/media/f3a61d28437680d3850c5e8a93da69679f47739e207d93e65a8b4ba5681c3605.jpg',
                'filename': 'bill.jpg',
                'mime_type': 'image/jpeg',
                'size': 9566,
                'type': 'bill_photo'
            }
            ])

    def assert_response_legal(self, response):
        ticket_id = Ticket.objects.last().id
        wo_attacmemts = {k: v for k, v in response.data.items() if k != 'attachments'}

        self.assertDictEqual(wo_attacmemts, {
            'address': 'Moscow, Russia',
            'beneficial_birthdate': '1990-01-01',
            'beneficial_fullname': 'John Doe',
            'beneficial_personal_id': '1488123',
            'beneficial_place_of_birth': 'Moscow, Russia',
            'beneficial_place_of_residence': 'Moscow, Russia',
            'birthdate': None,
            'business_name': 'Vector',
            'decline_reason': None,
            'director_firstname': 'John',
            'director_lastname': 'Doe',
            'email': 'john@ongrid.pro',
            'field_of_activity': 'Drugs',
            'firstname': None,
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
        })

        self.assertListEqual(response.data['attachments'], [
            {
                'file': 'http://testserver/media/9d672a6e07016f3c005ec7aebd9a95b4513be7a5331cc8ea8895fa69e1bd81cc.jpg',
                'filename': 'basis.jpg',
                'mime_type': 'image/jpeg',
                'size': 151959,
                'type': 'basis_doc'
            },
            {
                'file': 'http://testserver/media/ae0e9df12a898fa098779e1520334db0f051b1a4a63e5ce96588823f2c1ed78a.jpg',
                'filename': 'document.jpg',
                'mime_type': 'image/jpeg',
                'size': 30236,
                'type': 'id_document_photo'
            },
            {
                'file': 'http://testserver/media/f3a61d28437680d3850c5e8a93da69679f47739e207d93e65a8b4ba5681c3605.jpg',
                'filename': 'bill.jpg',
                'mime_type': 'image/jpeg',
                'size': 9566,
                'type': 'bill_photo'
            }
        ])

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
        self.assert_response_natural(response)

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
        self.assert_response_legal(response)

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
        self.assert_response_natural(response)

    def test_get_not_created_kyc(self):
        response = self.client.get('/api/kyc/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {})

    def test_update_kyc(self):
        with open(fixture_path('document.jpg'), 'rb') as photo:
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
                'id_document_photo': photo
            })
        self.assertEqual(KYC.objects.count(), 1)

        rmtree(settings.MEDIA_ROOT, ignore_errors=True)

        with open(fixture_path('document.jpg'), 'rb') as photo, \
             open(fixture_path('bill.jpg'), 'rb') as bill: # noqa
            response = self.client.put('/api/kyc/', {
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

        self.assertEqual(response.status_code, 200)
        self.assert_response_natural(response)

    def test_upload_multiple_files(self):
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
                'id_document_photo': [photo, bill]
            })

        self.assertEqual(response.status_code, 201)
        self.assertListEqual(response.data['attachments'], [
            {
                'file': 'http://testserver/media/ae0e9df12a898fa098779e1520334db0f051b1a4a63e5ce96588823f2c1ed78a.jpg',
                'filename': 'document.jpg',
                'mime_type': 'image/jpeg',
                'size': 30236,
                'type': 'id_document_photo'
            },
            {
                'file': 'http://testserver/media/f3a61d28437680d3850c5e8a93da69679f47739e207d93e65a8b4ba5681c3605.jpg',
                'filename': 'bill.jpg',
                'mime_type': 'image/jpeg',
                'size': 9566,
                'type': 'id_document_photo'
            }
        ])


class TestKYCAutoApprove(EthTesterAPITestCase):
    def tearDown(self):
        super().tearDown()

        rmtree(settings.MEDIA_ROOT, ignore_errors=True)

    def assert_response_natural(self, response):
        wo_attacmemts = {k: v for k, v in response.data.items() if k != 'attachments'}

        self.assertDictEqual(wo_attacmemts, {
            'address': None,
            'beneficial_birthdate': None,
            'beneficial_fullname': None,
            'beneficial_personal_id': None,
            'beneficial_place_of_birth': None,
            'beneficial_place_of_residence': None,
            'birthdate': None,
            'business_name': None,
            'decline_reason': None,
            'director_firstname': None,
            'director_lastname': None,
            'email': 'gordon@ongrid.pro',
            'field_of_activity': None,
            'firstname': 'John',
            'is_pep': None,
            'lastname': 'Doe',
            'personal_id': None,
            'phone_number': '+79999999999',
            'place_of_birth': 'Moscow, Russia',
            'place_of_residence': 'Moscow, Russia',
            'profession': 'Medic',
            'registration_date': None,
            'registration_number': None,
            'state': 'MINING',
            'ticket': None,
            'type': 'NATURAL'
        })

        self.assertListEqual(response.data['attachments'], [
            {
                'file': 'http://testserver/media/ae0e9df12a898fa098779e1520334db0f051b1a4a63e5ce96588823f2c1ed78a.jpg',
                'filename': 'document.jpg',
                'mime_type': 'image/jpeg',
                'size': 30236,
                'type': 'id_document_photo'
            },
            {
                'file': 'http://testserver/media/f3a61d28437680d3850c5e8a93da69679f47739e207d93e65a8b4ba5681c3605.jpg',
                'filename': 'bill.jpg',
                'mime_type': 'image/jpeg',
                'size': 9566,
                'type': 'bill_photo'
            }
            ])

    @override_settings(AUTO_APPROVE_KYC=True)
    def test_create_approved_kyc(self):
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

        self.assertEqual(response.status_code, 201)
        self.assert_response_natural(response)

        SendPreparedTxns()()

        self.assertTrue(
            self.crowdsale_contract.functions.hasRole(self.get_investor().eth_account, 'kycVerified').call()
        )
