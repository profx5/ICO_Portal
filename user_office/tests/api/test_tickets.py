from oslash import Right

from ico_portal.utils.datetime import datetime
from ..base import APITestCase
from user_office.services import CreateSupportTicket
from helpdesk.models import FollowUp, Ticket


class TestTickets(APITestCase):
    def setUp(self):
        super().setUp()

        self.utcnow = datetime.utcnow()
        self.stub_datetime_utcnow(self.utcnow)

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
                'sender': self.get_investor().email
            }]
        })

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
                'sender': self.get_investor().email
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
                'sender': self.get_investor().email
            }, {
                'id': FollowUp.objects.order_by('id').last().id,
                'date': self.utcnow.isoformat(),
                'comment': 'Test comment',
                'sender': self.get_investor().email
            }]
        })

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
                'sender': self.get_investor().email
            }]
        })

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
                'sender': 'John Doe'
            }]
        })
