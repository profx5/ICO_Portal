from datetime import datetime

from user_office.models import Phase
from .base import APITestCase
from ..factories.phase import PhaseFactory


class GetICOPhaseStats(APITestCase):
    def setUp(self):
        super().setUp()
        self.stub_datetime_utcnow(datetime(2018, 2, 15))

    def test_successful_request(self):
        self.stub_datetime_utcnow(datetime(2018, 2, 15))

        phases = [PhaseFactory(begin_date=datetime(2018, 1, 1),
                               end_date=datetime(2018, 1, 31)),
                  PhaseFactory(begin_date=datetime(2018, 2, 1),
                               end_date=datetime(2018, 2, 28)),
                  PhaseFactory(begin_date=datetime(2018, 3, 1),
                               end_date=datetime(2018, 3, 31))]
        response = self.client.get('/api/getICOPhaseStats/')

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data,
                          {'name': 'Phase 001',
                           'bonus_percents': 90,
                           'end_date': '2018-02-28T00:00:00',
                           'currency_from': 'USD',
                           'currency_to': 'TKN',
                           'token_price': 1})

    def test_no_phases(self):
        response = self.client.get('/api/getICOPhaseStats/')

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data,
                          {'name': '',
                           'bonus_percents': None,
                           'end_date': None,
                           'currency_from': 'USD',
                           'currency_to': 'TKN',
                           'token_price': 1})
