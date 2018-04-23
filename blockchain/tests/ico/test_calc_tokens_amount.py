from oslash import Right
from decimal import Decimal

from ico_portal.utils.datetime import datetime
from ..base import BlockChainTestCase
from user_office.factories import *
from blockchain.ico.services import CalcTokensAmount


class TestCalcTokensAmount(BlockChainTestCase):
    def setUp(self):
        self.utcnow = datetime.utcnow()
        self.stub_datetime_utcnow(self.utcnow)

    def test_successful_calc(self):
        ExchangeRateFactory(currency='ETH', rate=Decimal('720.31422'))
        CurrentPhaseFactory(bonus_percents=40)

        result = CalcTokensAmount()('1.23', 'ETH')

        self.assertTrue(isinstance(result, Right))

        self.assertEqual(result.value[0], Decimal('124038'))
        self.assertEqual(result.value[1], Decimal('88599'))
