from .base import APITestCase
from user_office.models import Deposit, Mint

from django.conf import settings
from datetime import datetime
from decimal import Decimal


class PrepareDepositTestCase(APITestCase):
    txn_hash = '0x9496849ff00c5e9cd7a42c06d3c60fd07925da7d4fd08b428f3219616976f6a8'

    def test_successful_request(self):
        utcnow = datetime.utcnow()

        self.stub_datetime_utcnow(utcnow)

        response = self.client.post('/api/prepareDeposit/',
                                    {'value': 10000000000000,
                                     'txn_hash': self.txn_hash})

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data, {'success': True})

        mint = Mint.objects.all().first()
        self.assertEqual(mint.currency, 'ETH')
        self.assertEqual(mint.txn_hash, self.txn_hash)
        self.assertEqual(mint.account_to, '0xD0EDB4aa92d03Efbdbf0978Cc17023BEa1574152')
        self.assertEqual(mint.account_from, self.get_investor().eth_account)
        self.assertEqual(mint.value, '10000000000000')
        self.assertEqual(mint.state, 'WAIT')

        deposit = Deposit.objects.all().first()
        self.assertEqual(deposit.investor, self.get_investor())
        self.assertEqual(deposit.amount, Decimal('0.01208410'))
        self.assertEqual(deposit.amount_wo_bonus, Decimal('0.00863150'))
        self.assertEqual(deposit.created_at, utcnow)
        self.assertEqual(deposit.mint, mint)
        self.assertEqual(deposit.state, 'PREPARED')
