from shutil import rmtree
from django.conf import settings

from django.core.files.uploadedfile import SimpleUploadedFile
from .helpers.kyc import create_kyc
from ..base import APITestCase


class TestKYC(APITestCase):
    def setUp(self):
        super().setUp()

        rmtree(settings.MEDIA_ROOT, ignore_errors=True)

    def test_create_kyc(self):
        expected = {'user_photo': f'http://testserver/media/kyc/{self._investor_id}/selfie/selfie.jpg',
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
        }

        response = create_kyc(self.client)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data, expected)

    def test_get_created_kyc(self):
        expected = {'state': 'WAITING',
                    'user_photo': 'http://testserver/media/kyc/1/selfie/selfie.jpg',
                    'firstname': 'John',
                    'midname': None,
                    'surname': 'Doe',
                    'gender': 'M',
                    'birthdate': '1990-01-01',
                    'country': 'Russia',
                    'city': 'Moscow',
                    'registration_address':
                    'Lenina st., 1, 4',
                    'postcode': '123422',
                    'document_type': 'Passport',
                    'document_no': '123123',
                    'document_country': 'Russia',
                    'document_date': '1990-01-01',
                    'document_photo': 'http://testserver/media/kyc/1/photo/photo.jpg',
                    'decline_reason': None}

        response = create_kyc(self.client)

        response = self.client.get('/api/kyc/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, expected)

    def test_get_not_created_kyc(self):
        response = self.client.get('/api/kyc/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {})
