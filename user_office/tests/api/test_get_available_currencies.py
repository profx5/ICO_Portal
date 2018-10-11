from decimal import Decimal
import time

from ..base import APITestCase
from user_office.factories import ExchangeRateFactory


class TestGetAvailableCurrencies(APITestCase):
    def test_successful_request(self):
        ExchangeRateFactory(currency='ETH', rate=Decimal('720.11418839'), timestamp=time.time())
        ExchangeRateFactory(currency='LTC', rate=Decimal('150.42323231'), timestamp=time.time())
        ExchangeRateFactory(currency='LTC', rate=Decimal('151.43323231'), timestamp=time.time() + 1)
        ExchangeRateFactory(currency='DOGE', rate=Decimal('0.00233829'), timestamp=time.time())

        response = self.client.get('/api/getAvailableCurrencies/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [
            {'code': 'ETH', 'name': 'Ethereum', 'rate': Decimal('720.11418839')},
            {'code': 'LTC', 'name': 'Litecoin', 'rate': Decimal('151.43323231')},
            {'code': 'DOGE', 'name': 'Dogecoin', 'rate': Decimal('0.00233829')},
            {'code': 'DAI', 'name': 'DAI', 'rate': 0}
        ])
