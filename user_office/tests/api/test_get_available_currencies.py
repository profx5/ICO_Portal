from decimal import Decimal

from ..base import APITestCase


class TestGetAvailableCurrencies(APITestCase):
    def test_successful_request(self):
        response = self.client.get('/api/getAvailableCurrencies/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [
            {'code': c, 'name': c, 'contract_address': '0x0000000000000000000000000000000000000000', 'rate': Decimal('1')}
            for c in ['DAI', 'USDC', 'USDT', 'TUSD']
        ])
