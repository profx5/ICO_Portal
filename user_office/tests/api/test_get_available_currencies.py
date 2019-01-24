from decimal import Decimal

from ..base import APITestCase


class TestGetAvailableCurrencies(APITestCase):
    def test_successful_request(self):
        response = self.client.get('/api/getAvailableCurrencies/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [
            {'code': 'DAI', 'name': 'DAI', 'rate': Decimal('1')},
            {'code': 'USDC', 'name': 'USDC', 'rate': Decimal('1')},
            {'code': 'USDT', 'name': 'USDT', 'rate': Decimal('1')},
            {'code': 'TUSD', 'name': 'TUSD', 'rate': Decimal('1')}
        ])
