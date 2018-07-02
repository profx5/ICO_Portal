from oslash import Right
from decimal import Decimal

from ..base import BlockChainTestCase
from user_office.factories import ExchangeRateFactory, PhaseFactory
from blockchain.ico.services import CalcTokensAmount


class TestCalcTokensAmount(BlockChainTestCase):
    def test_successful_calc(self):
        ExchangeRateFactory(currency='ETH', rate=Decimal('720.31422'))
        PhaseFactory(bonus_percents=40)

        result = CalcTokensAmount()('1.23', 'ETH')

        self.assertTrue(isinstance(result, Right))

        self.assertEqual(result.value[0], Decimal('124038'))
        self.assertEqual(result.value[1], Decimal('88599'))
