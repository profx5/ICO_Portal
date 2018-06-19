from datetime import datetime

from user_office.factories import PhaseFactory
from ..base import APITestCase


class TestGetPhases(APITestCase):
    def test_successful_request(self):
        self.stub_datetime_utcnow(datetime(2018, 5, 10))

        phase_1 = PhaseFactory(name='Phase One',
                               bonus_percents=30,
                               hard_cap=5000000000,
                               begin_date=datetime(2018, 4, 1),
                               end_date=datetime(2018, 5, 1))
        phase_2 = PhaseFactory(name='Phase Two',
                               bonus_percents=10,
                               hard_cap=500000000000,
                               begin_date=datetime(2018, 5, 2),
                               end_date=datetime(2018, 6, 2))

        response = self.client.get('/api/getPhases/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [
            {
                'name': 'Phase One',
                'begin_date': '2018-04-01T00:00:00',
                'end_date': '2018-05-01T00:00:00',
                'bonus_percents': 30,
                'hard_cap': '5000000000',
                'current': False
            }, {
                'name': 'Phase Two',
                'begin_date': '2018-05-02T00:00:00',
                'end_date': '2018-06-02T00:00:00',
                'bonus_percents': 10,
                'hard_cap': '500000000000',
                'current': True
            }
        ])
