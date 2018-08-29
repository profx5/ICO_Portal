from django.db.models import Sum
from django.db.models.functions import Coalesce

from blockchain.ico.services import PrepareTokensMove, AddBonuses
from ico_portal.utils.service_object import ServiceObject, service_call, transactional
from user_office.helpers import get_referral_tokens_treshold
from user_office.models import ReferralBonus, Investor

CURRENCY = 'ETH'


class CollectReferralBonuses(ServiceObject):
    def get_referral_bonuses(self, context):
        referral_bonuses = ReferralBonus.objects\
            .prepared_for_collection()\
            .filter(beneficiary=context.investor)\
            .select_for_update()

        return self.success(referral_bonuses=referral_bonuses)

    def create_transaction(self, context):
        return AddBonuses()(
            to=context.investor.eth_account,
            tokens_amount=context.cumulative_amount) | \
            (lambda result: self.success(transaction=result.transaction))

    def create_tokens_move(self, context):
        return PrepareTokensMove()(
            investor=context.investor,
            currency=CURRENCY,
            # FIXME buy_txn_id is probably not the right name
            buy_txn_id=context.transaction.txn_id) | \
            (lambda result: self.success(tokens_move=result.tokens_move))

    def assign_tokens_move(self, context):
        context.referral_bonuses.update(accrued_in=context.tokens_move)

        return self.success()

    @service_call
    @transactional
    def collect_referral_bonuses(self, referral_bonus_info):
        investor = Investor.objects.get(id=referral_bonus_info['beneficiary'])

        return self.success(investor=investor, cumulative_amount=referral_bonus_info['cumulative_amount']) | \
            self.get_referral_bonuses | \
            self.create_transaction | \
            self.create_tokens_move | \
            self.assign_tokens_move

    def __call__(self, **kwargs):
        referral_bonuses = ReferralBonus.objects\
            .prepared_for_collection()\
            .values('beneficiary')\
            .order_by('beneficiary')\
            .annotate(cumulative_amount=Coalesce(Sum('amount'), 0))\
            .filter(cumulative_amount__gte=get_referral_tokens_treshold())

        return list(map(self.collect_referral_bonuses, referral_bonuses))
