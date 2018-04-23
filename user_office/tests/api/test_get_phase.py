from datetime import datetime

from user_office.factories import CurrentPhaseFactory
from .base import APITestCase


class TestGetPhase(APITestCase):
    date_format = '%Y-%m-%dT%H:%M:%S.%f'

    def test_successful_request(self):
        self.stub_datetime_utcnow(datetime(2018, 5, 14, 11, 11, 11))

        phase = CurrentPhaseFactory(name='TestPhase', bonus_percents=30)

        response = self.client.get('/api/getPhase/')

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data,
                          {'name': 'TestPhase',
                           'begin_date': '2018-05-04T11:11:11',
                           'end_date': '2018-05-24T11:11:11',
                           'bonus_percents': 30})
