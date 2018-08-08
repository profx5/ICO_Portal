import django.core.mail
from oslash import Right
from shutil import rmtree
from django.conf import settings

from ico_portal.utils.datetime import datetime
from user_office.services import CreateSupportTicket, CommentTicket
from user_office.factories import InvestorFactory
from helpdesk.models import FollowUp, Ticket
from .helpers.fixture import fixture_path
from ..base import APITestCase


class TestTickets(APITestCase):
    def setUp(self):
        super().setUp()

        self.utcnow = datetime.utcnow()
        self.stub_datetime_utcnow(self.utcnow)

    def tearDown(self):
        super().tearDown()

        rmtree(settings.MEDIA_ROOT, ignore_errors=True)

    def _get_ticket_id(self):
        return Ticket.objects.last().id

    def _get_follow_up_id(self):
        return FollowUp.objects.last().id

    def test_create_ticket(self):
        response = self.client.post('/api/tickets/', {
            'title': 'Test ticket',
            'description': 'Test description'
        })

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data, {
            'id': self._get_ticket_id(),
            'title': 'Test ticket',
            'created': self.utcnow.isoformat(),
            'status': 1,
            'public_follow_ups': [{
                'id': self._get_follow_up_id(),
                'date': self.utcnow.isoformat(),
                'comment': 'Test description',
                'sender': self.get_investor().email,
                'attachments': []
            }]
        })
        self.assertEqual(len(django.core.mail.outbox), 0)

    def test_create_ticket_w_attachment(self):
        with open(fixture_path('document.jpg'), 'rb') as document:
            response = self.client.post(f'/api/tickets/', {
                'title': 'Test ticket',
                'description': 'Test description',
                'attachment': document
            }, format='multipart')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data, {
            'id': self._get_ticket_id(),
            'title': 'Test ticket',
            'created': self.utcnow.isoformat(),
            'status': 1,
            'public_follow_ups': [{
                'id': self._get_follow_up_id(),
                'date': self.utcnow.isoformat(),
                'comment': 'Test description',
                'sender': self.get_investor().email,
                'attachments': [{
                    'file': FollowUp.objects.order_by('id').last().attachment_set.first().file.url,
                    'filename': 'document.jpg',
                    'mime_type': 'image/jpeg'
                }]
            }]
        })
        self.assertEqual(len(django.core.mail.outbox), 0)

    def test_get_tickets_list(self):
        result = CreateSupportTicket()(reporter=self.get_investor(),
                                       title='Test title',
                                       description='Test description')
        self.assertIsInstance(result, Right)

        response = self.client.get('/api/tickets/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [{
            'id': self._get_ticket_id(),
            'title': 'Test title',
            'created': self.utcnow.isoformat(),
            'status': 1,
            'last_reply_by': self.get_investor().email,
            'last_reply_at': self.utcnow
        }])

    def test_get_ticket(self):
        result = CreateSupportTicket()(reporter=self.get_investor(),
                                       title='Test title',
                                       description='Test description')
        self.assertIsInstance(result, Right)

        ticket_id = result.value['ticket'].id
        response = self.client.get(f'/api/tickets/{ticket_id}/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {
            'id': self._get_ticket_id(),
            'title': 'Test title',
            'created': self.utcnow.isoformat(),
            'status': 1,
            'public_follow_ups': [{
                'id': self._get_follow_up_id(),
                'date': self.utcnow.isoformat(),
                'comment': 'Test description',
                'sender': self.get_investor().email,
                'attachments': []
            }]
        })

    def test_add_comment(self):
        result = CreateSupportTicket()(reporter=self.get_investor(),
                                       title='Test title',
                                       description='Test description')
        self.assertIsInstance(result, Right)

        ticket_id = result.value['ticket'].id
        response = self.client.post(f'/api/tickets/{ticket_id}/comment/', {
            'comment': 'Test comment'
        })

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data, {
            'id': self._get_ticket_id(),
            'title': 'Test title',
            'created': self.utcnow.isoformat(),
            'status': 1,
            'public_follow_ups': [{
                'id': FollowUp.objects.order_by('id').first().id,
                'date': self.utcnow.isoformat(),
                'comment': 'Test description',
                'sender': self.get_investor().email,
                'attachments': []
            }, {
                'id': FollowUp.objects.order_by('id').last().id,
                'date': self.utcnow.isoformat(),
                'comment': 'Test comment',
                'sender': self.get_investor().email,
                'attachments': []
            }]
        })
        self.assertEqual(len(django.core.mail.outbox), 0)

    def test_private_comment(self):
        result = CreateSupportTicket()(reporter=self.get_investor(),
                                       title='Test title',
                                       description='Test description')
        self.assertIsInstance(result, Right)

        ticket = result.value['ticket']
        FollowUp.objects.create(ticket=ticket,
                                title='Private comment',
                                public=False)

        response = self.client.get(f'/api/tickets/{ticket.id}/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {
            'id': self._get_ticket_id(),
            'title': 'Test title',
            'created': self.utcnow.isoformat(),
            'status': 1,
            'public_follow_ups': [{
                'id': self._get_follow_up_id(),
                'date': self.utcnow.isoformat(),
                'comment': 'Test description',
                'sender': self.get_investor().email,
                'attachments': []
            }]
        })
        self.assertEqual(len(django.core.mail.outbox), 0)

    def test_first_last_name(self):
        investor = self.get_investor()
        investor.first_name = 'John'
        investor.last_name = 'Doe'
        investor.save()

        result = CreateSupportTicket()(reporter=investor,
                                       title='Test title',
                                       description='Test description')
        self.assertIsInstance(result, Right)

        ticket = result.value['ticket']
        FollowUp.objects.create(ticket=ticket,
                                title='Private comment',
                                public=False)

        response = self.client.get(f'/api/tickets/{ticket.id}/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {
            'id': self._get_ticket_id(),
            'title': 'Test title',
            'created': self.utcnow.isoformat(),
            'status': 1,
            'public_follow_ups': [{
                'id': self._get_follow_up_id(),
                'date': self.utcnow.isoformat(),
                'comment': 'Test description',
                'sender': 'John Doe',
                'attachments': []
            }]
        })

    def test_comment_w_attachment(self):
        result = CreateSupportTicket()(reporter=self.get_investor(),
                                       title='Test title',
                                       description='Test description')
        self.assertIsInstance(result, Right)

        ticket_id = result.value['ticket'].id

        with open(fixture_path('document.jpg'), 'rb') as document:
            response = self.client.post(f'/api/tickets/{ticket_id}/comment/', {
                'comment': 'Test with attachment',
                'attachment': document
            }, format='multipart')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data, {
            'id': self._get_ticket_id(),
            'title': 'Test title',
            'created': self.utcnow.isoformat(),
            'status': 1,
            'public_follow_ups': [{
                'id': FollowUp.objects.order_by('id').first().id,
                'date': self.utcnow.isoformat(),
                'comment': 'Test description',
                'sender': self.get_investor().email,
                'attachments': []
            }, {
                'id': FollowUp.objects.order_by('id').last().id,
                'date': self.utcnow.isoformat(),
                'comment': 'Test with attachment',
                'sender': self.get_investor().email,
                'attachments': [{
                    'file': FollowUp.objects.order_by('id').last().attachment_set.first().file.url,
                    'filename': 'document.jpg',
                    'mime_type': 'image/jpeg'
                }]
            }]
        })

    def test_email_notification_on_reply(self):
        sender = InvestorFactory()

        result = CreateSupportTicket()(reporter=self.get_investor(),
                                       title='Test title',
                                       description='Test description')
        self.assertIsInstance(result, Right)
        ticket = result.value['ticket']

        result = CommentTicket()(sender, ticket, 'New comment')
        self.assertIsInstance(result, Right)
        self.assertEqual(len(django.core.mail.outbox), 1)
        self.assertEqual(django.core.mail.outbox[0].subject, 'New reply in your ticket')
