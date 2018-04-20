from user_office.models import Phase
from .base import APITestCase

from datetime import datetime, timedelta


class TestGetPhase(APITestCase):
    date_format = '%Y-%m-%dT%H:%M:%S.%f'

    def test_successful_request(self):
        begin_date = datetime.today() - timedelta(days=1)
        end_date = datetime.today() + timedelta(days=1)
        phase = Phase(name='TestPhase',
                      begin_date=begin_date,
                      end_date=end_date,
                      bonus_percents=30)
        phase.save()

        response = self.client.get('/api/getPhase/')

        self.assertEquals(response.status_code, 200)

        self.assertEquals(response.data,
                          {'name': 'TestPhase',
                           'begin_date': begin_date.strftime(self.date_format),
                           'end_date': end_date.strftime(self.date_format),
                           'bonus_percents': 30})
