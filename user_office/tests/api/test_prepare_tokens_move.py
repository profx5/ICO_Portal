from datetime import datetime
from decimal import Decimal

from ..base import APITestCase
from user_office.factories import PhaseFactory, ExchangeRateFactory, KYCFactory
from user_office.models import Transfer, TokensMove


class TestPrepareTokensMove(APITestCase):
    txn_hash = '0x9496849ff00c5e9cd7a42c06d3c60fd07925da7d4fd08b428f3219616976f6a8'

    def test_successful_request(self):
        utcnow = datetime(2018, 5, 14, 11, 11, 11)
        self.stub_datetime_utcnow(utcnow)

        KYCFactory(investor=self.get_investor())
        PhaseFactory(bonus_percents=30)
        ExchangeRateFactory(currency='ETH', rate=Decimal('750.77085033'))

        response = self.client.post('/api/prepareTokensMove/', {
            'value': '1.23',
            'txn_hash': self.txn_hash
        })

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data, {'success': True})

        transfers = Transfer.objects.all()
        self.assertEqual(transfers.count(), 1)

        transfer = transfers.first()
        self.assertEqual(transfer.txn_hash, self.txn_hash)
        self.assertEqual(transfer.state, 'PREPARED')

        tokens_moves = TokensMove.objects.all()
        self.assertEqual(tokens_moves.count(), 1)

        tokens_move = tokens_moves.first()
        self.assertEqual(tokens_move.investor, self.get_investor())
        self.assertIsNone(tokens_move.amount)
        self.assertEqual(tokens_move.transfer, transfer)
        self.assertEqual(tokens_move.state, 'PREPARED')
        self.assertEqual(tokens_move.direction, 'IN')

    def test_non_kyc_user(self):
        utcnow = datetime(2018, 5, 14, 11, 11, 11)
        self.stub_datetime_utcnow(utcnow)

        PhaseFactory(bonus_percents=30)
        ExchangeRateFactory(currency='ETH', rate=Decimal('750.77085033'))

        response = self.client.post('/api/prepareTokensMove/', {
            'value': '1.23',
            'txn_hash': self.txn_hash
        })

        self.assertEqual(response.status_code, 403)
