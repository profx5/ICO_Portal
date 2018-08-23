import responses
from oslash import Right, Left
from decimal import Decimal
from requests.exceptions import ConnectionError

from ..base import BlockChainTestCase
from blockchain.ico.services import SyncExchangeRates
from user_office.models import ExchangeRate


class TestSyncExchageRates(BlockChainTestCase):
    @responses.activate
    def test_successful_sync(self):
        responses.add(responses.GET, 'https://api.cryptonator.com/api/ticker/eth-usd/',
                      json={
                          "ticker": {
                              "base": "ETH",
                              "target": "USD",
                              "price": "272.98837545",
                              "volume": "385210.46037584",
                              "change": "0.12940972"
                          },
                          "timestamp": 1535039461,
                          "success": True,
                          "error": ""
                      })
        responses.add(responses.GET, 'https://api.cryptonator.com/api/ticker/doge-usd/',
                      json={
                          "ticker": {
                              "base": "DOGE",
                              "target": "USD",
                              "price": "0.00232651",
                              "volume": "277544152.79960001",
                              "change": "0.00000733"
                          },
                          "timestamp": 1535039769,
                          "success": True,
                          "error": ""
                      })

        result = SyncExchangeRates()(['ETH', 'DOGE'])

        self.assertIsInstance(result['ETH'], Right)
        self.assertIsInstance(result['DOGE'], Right)

        exchange_rates = ExchangeRate.objects.all()
        self.assertEqual(exchange_rates.count(), 2)

        eth_rate = exchange_rates.get(currency='ETH')
        self.assertEqual(eth_rate.creation_date, self.utcnow)
        self.assertEqual(eth_rate.rate, Decimal('272.98837545'))
        self.assertEqual(eth_rate.timestamp, 1535039461)

        doge_rate = exchange_rates.get(currency='DOGE')
        self.assertEqual(doge_rate.creation_date, self.utcnow)
        self.assertEqual(doge_rate.rate, Decimal('0.00232651'))
        self.assertEqual(doge_rate.timestamp, 1535039769)

    @responses.activate
    def test_connection_error(self):
        with self.assertRaises(ConnectionError):
            SyncExchangeRates()(['ETH'])

        self.assertEqual(ExchangeRate.objects.count(), 0)

    @responses.activate
    def test_api_error(self):
        responses.add(responses.GET, 'https://api.cryptonator.com/api/ticker/eth-usd/',
                      json={
                          "timestamp": 1535039461,
                          "success": False,
                          "error": "Nope"
                      })
        result = SyncExchangeRates()(['ETH'])

        self.assertIsInstance(result['ETH'], Left)
        self.assertEqual(ExchangeRate.objects.count(), 0)
