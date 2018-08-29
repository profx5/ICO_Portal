from decimal import Decimal

from django.conf import settings
from django.test import override_settings
from oslash import Right

from blockchain.ico.services import ProcessTransfer, SendPreparedTxns
from blockchain.ico.services.collect_referral_bonuses import CollectReferralBonuses
from user_office.factories import InvestorFactory, ReferralBonusFactory
from user_office.models import Transfer, TokensMove, ReferralBonus, Transaction
from ..base import BlockChainTestCase

SINGLE_REFERRAL_AMOUNT_INT = Decimal('1')
SINGLE_REFERRAL_AMOUNT = SINGLE_REFERRAL_AMOUNT_INT * 10 ** settings.TOKEN_DECIMALS


@override_settings(REFERRAL_TOKENS_THRESHOLD=SINGLE_REFERRAL_AMOUNT_INT * 2)
class TestCollectReferralBonuses(BlockChainTestCase):
    setup_eth_tester = True
    setup_contracts = ['price_oracle', 'token', 'crowdsale']

    def test_single_investor(self):
        self.assertEqual(Transaction.objects.count(), 0)
        self.assertEqual(TokensMove.objects.count(), 0)
        self.assertEqual(Transfer.objects.count(), 0)
        self.assertEqual(ReferralBonus.objects.count(), 0)
        investor = InvestorFactory()
        self.assertEqual(len(CollectReferralBonuses()()), 0)

        ReferralBonusFactory(
            beneficiary=investor, amount=SINGLE_REFERRAL_AMOUNT, state=ReferralBonus.State.prepared)
        self.assertEqual(len(CollectReferralBonuses()()), 0)

        ReferralBonusFactory(
            beneficiary=investor, amount=SINGLE_REFERRAL_AMOUNT * 2, state=ReferralBonus.State.prepared)
        self.assertEqual(TokensMove.objects.count(), 2)
        self.assertEqual(Transfer.objects.count(), 2)
        self.assertEqual(ReferralBonus.objects.prepared_for_collection().count(), 2)
        self.assertEqual(ReferralBonus.objects.count(), 2)

        ReferralBonus.objects.all().update(state=ReferralBonus.State.prepared)
        collect_result, = CollectReferralBonuses()()
        self.assertIsInstance(collect_result, Right)
        self.assertEqual(Transaction.objects.count(), 1)
        self.assertEqual(TokensMove.objects.count(), 3)
        self.assertEqual(Transfer.objects.count(), 3)
        self.assertEqual(ReferralBonus.objects.count(), 2)
        self.assertEqual(ReferralBonus.objects.prepared_for_collection().count(), 0)
        self.assertEqual(
            ReferralBonus.objects.filter(state=ReferralBonus.State.prepared, accrued_in__isnull=False).count(), 2)

        investor.refresh_from_db()
        self.assertEqual(investor.tokens_amount, 0)

        tokens_move = ReferralBonus.objects.first().accrued_in
        self.assertEqual(tokens_move.referral_bonuses.count(), 2)
        self.assertEqual(tokens_move.amount, None)
        self.assertEqual(tokens_move.state, 'PREPARED')

        result, = SendPreparedTxns()()
        self.assertIsInstance(result, Right)
        txn_hash = result.value['txn_object'].txn_hash
        self.assertIsInstance(ProcessTransfer()(self.get_transfer_event(txn_hash)), Right)

        tokens_move.refresh_from_db()
        self.assertEqual(tokens_move.state, 'ACTUAL')
        self.assertEqual(tokens_move.amount, SINGLE_REFERRAL_AMOUNT * 3)

        investor.refresh_from_db()
        self.assertEqual(investor.tokens_amount, SINGLE_REFERRAL_AMOUNT * 3)
        self.assertEqual(ReferralBonus.objects.filter(state=ReferralBonus.State.accrued).count(), 2)
        self.assertEqual(ReferralBonus.objects.filter(state=ReferralBonus.State.prepared).count(), 0)
        self.assertEqual(len(CollectReferralBonuses()()), 0)

    def test_multiple_investors(self):
        investor = InvestorFactory()
        second_investor = InvestorFactory()
        third_investor = InvestorFactory()

        ReferralBonusFactory(beneficiary=investor, amount=SINGLE_REFERRAL_AMOUNT, state=ReferralBonus.State.prepared)
        ReferralBonusFactory(beneficiary=investor, amount=SINGLE_REFERRAL_AMOUNT * 2, state=ReferralBonus.State.prepared)

        ReferralBonusFactory(
            beneficiary=second_investor, amount=SINGLE_REFERRAL_AMOUNT * 3, state=ReferralBonus.State.prepared)
        ReferralBonusFactory(
            beneficiary=second_investor, amount=SINGLE_REFERRAL_AMOUNT * 3, state=ReferralBonus.State.prepared)
        ReferralBonusFactory(
            beneficiary=second_investor, amount=SINGLE_REFERRAL_AMOUNT * 3, state=ReferralBonus.State.prepared)

        ReferralBonusFactory(
            beneficiary=third_investor, amount=SINGLE_REFERRAL_AMOUNT, state=ReferralBonus.State.prepared)

        self.assertEqual(TokensMove.objects.count(), 6)
        self.assertEqual(Transfer.objects.count(), 6)
        self.assertEqual(ReferralBonus.objects.prepared_for_collection().count(), 6)
        collect_results = CollectReferralBonuses()()
        self.assertEqual(len(collect_results), 2)
        self.assertTrue(all(isinstance(collect_result, Right) for collect_result in collect_results))

        investor.refresh_from_db()
        self.assertEqual(ReferralBonus.objects.count(), 6)
        self.assertEqual(ReferralBonus.objects.prepared_for_collection().count(), 1)
        self.assertEqual(
            ReferralBonus.objects.filter(state=ReferralBonus.State.prepared, accrued_in__isnull=False).count(), 5)

        result = SendPreparedTxns()()
        self.assertEqual(len(result), 2)
        for res in result:
            self.assertIsInstance(res, Right)
            txn_hash = res.value['txn_object'].txn_hash
            self.assertIsInstance(ProcessTransfer()(self.get_transfer_event(txn_hash)), Right)
        self.assertEqual(ReferralBonus.objects.filter(state=ReferralBonus.State.accrued).count(), 5)
        self.assertEqual(ReferralBonus.objects.filter(state=ReferralBonus.State.prepared).count(), 1)
        self.assertEqual(
            ReferralBonus.objects.filter(state=ReferralBonus.State.prepared, accrued_in__isnull=False).count(), 0)

        investor.refresh_from_db()
        self.assertEqual(investor.tokens_amount, SINGLE_REFERRAL_AMOUNT * 3)

        second_investor.refresh_from_db()
        self.assertEqual(second_investor.tokens_amount, SINGLE_REFERRAL_AMOUNT * 9)

        third_investor.refresh_from_db()
        self.assertEqual(third_investor.tokens_amount, 0)
