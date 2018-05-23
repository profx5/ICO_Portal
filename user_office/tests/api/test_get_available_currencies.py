from decimal import Decimal
import time

from .base import APITestCase
from user_office.factories import ExchangeRateFactory


class TestGetAvailableCurrencies(APITestCase):
    def test_successful_request(self):
        ExchangeRateFactory(currency='ETH', rate='720.11223', timestamp=time.time())
        ExchangeRateFactory(currency='LTC', rate='150.42424', timestamp=time.time())
        ExchangeRateFactory(currency='LTC', rate='151.43324', timestamp=time.time() + 1)

        response = self.client.get('/api/getAvailableCurrencies/')

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data, [
            {'code': 'ETH', 'name': 'Ethereum', 'rate': Decimal('720.11223')},
            {'code': 'LTC', 'name': 'Litecoin', 'rate': Decimal('151.43324')}
        ])
