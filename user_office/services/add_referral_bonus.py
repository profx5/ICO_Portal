from django.conf import settings
from django.db import DatabaseError

from ico_portal.utils.service_object import service_call, ServiceObject
from user_office.models import Payment, ReferralBonus


class AddReferralBonus(ServiceObject):
    def get_referrer(self, context):
        return self.success(referrer=context.investor.referrer)

    def calculate_bonus_amounts(self, context):
        referrer_amount = context.payment.tokens_move.amount * settings.REFERRER_BONUS_PERCENT / 100
        referral_amount = context.payment.tokens_move.amount * settings.REFERRAL_BONUS_PERCENT / 100

        return self.success(referral_amount=referral_amount, referrer_amount=referrer_amount)

    @staticmethod
    def _create_bonus(amount, beneficiary, payment, is_from_referrer):
        if amount <= 0:
            return None

        return ReferralBonus.objects.create(
            amount=amount,
            beneficiary=beneficiary,
            created_from=payment,
            is_from_referrer=is_from_referrer)

    def create_referrer_bonus(self, context):
        try:
            return self.success(
                referrer_bonus=self._create_bonus(
                    amount=context.referrer_amount,
                    beneficiary=context.referrer,
                    is_from_referrer=False,
                    payment=context.payment))
        except DatabaseError as e:
            return self.fail(e)

    def create_referral_bonus(self, context):
        try:
            return self.success(
                referrer_bonus=self._create_bonus(
                    amount=context.referral_amount,
                    beneficiary=context.investor,
                    is_from_referrer=True,
                    payment=context.payment))
        except DatabaseError as e:
            return self.fail(e)

    def send_bonus_notification(self, context):
        # notification at 1, 2, 5, 10, 50, x100 bonuses
        pass

    @service_call
    def __call__(self, payment):
        tokens_move = payment.tokens_move
        if tokens_move.referral_bonuses.exists():
            self.logger.debug(f'Tokens move {payment.tokens_move.id} is there to accrue referral_bonuses')

            return self.success()

        investor = tokens_move.investor
        if not investor.referrer:
            self.logger.debug(f'Investor {investor.id} does not have a referrer')

            return self.success()

        number_of_payments = Payment.objects.filter(tokens_move__investor=investor).exclude(id=payment.id).count()
        if (
                settings.REFERRAL_MAX_NUMBER_OF_PAYMENTS is not None and
                settings.REFERRAL_MAX_NUMBER_OF_PAYMENTS <= number_of_payments
        ):
            self.logger.debug(
                f'The investor {investor.id} has exceeded the number of payments that are subject to referral bonuses')

            return self.success()

        return self.success(investor=investor, payment=payment, tokens_move=tokens_move) | \
            self.get_referrer | \
            self.calculate_bonus_amounts | \
            self.create_referral_bonus | \
            self.create_referrer_bonus
