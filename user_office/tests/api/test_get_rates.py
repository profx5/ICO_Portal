import json
import time
from .base import APITestCase
from user_office.models import ExchangeRate


class TestGetRates(APITestCase):
    def test_get_rates(self):
        rates = [ExchangeRate(currency='ETH',
                              rate=0.42341,
                              timestamp=time.time()),
                 ExchangeRate(currency='BTC',
                              rate=0.24125,
                              timestamp=time.time()),
                 ExchangeRate(currency='LTC',
                              rate=0.23456,
                              timestamp=time.time())]
        ExchangeRate.objects.bulk_create(rates)

        response = self.client.get('/api/getRates/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data,
                         [{"currency": "ETH",
                           "rate": "0.42341"
                           },
                          {"currency": "BTC",
                           "rate": "0.24125"
                           },
                          {"currency": "LTC",
                           "rate": "0.23456"
                           }
                          ])

    def test_get_empty_rates(self):
        response = self.client.get('/api/getRates/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [])
