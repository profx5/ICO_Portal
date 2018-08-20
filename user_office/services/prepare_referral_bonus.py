from django.db.models import Sum
from django.db.models.functions import Coalesce

from ico_portal.utils.service_object import service_call, ServiceObject, transactional
from user_office.helpers import get_referral_tokens_treshold
from user_office.models import ReferralBonus


class PrepareReferralBonuses(ServiceObject):
    def get_referral_bonuses(self, context):
        referral_bonuses = ReferralBonus.objects\
            .filter(state=ReferralBonus.State.created, beneficiary=context.investor)\
            .select_for_update()
        total_amount = referral_bonuses.aggregate(total_amount=Coalesce(Sum('amount'), 0))['total_amount']

        if total_amount < get_referral_tokens_treshold():
            return self.fail('Not enough bonuses to collect')
        else:
            return self.success(referral_bonuses=referral_bonuses)

    def prepare_referral_bonuses(self, context):
        context.referral_bonuses.update(state=ReferralBonus.State.prepared)

        return self.success()

    @transactional
    @service_call
    def __call__(self, investor):
        return self.success(investor=investor) | self.get_referral_bonuses | self.prepare_referral_bonuses
