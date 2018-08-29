from django.conf import settings
from decimal import Decimal, ROUND_HALF_UP

from ico_portal.utils.service_object import ServiceObject, service_call
from user_office.models import Phase, ExchangeRate


class CalcTokensAmount(ServiceObject):
    @property
    def tokens_per_usd(self):
        return Decimal(1 / settings.TOKEN_PRICE_IN_USD)

    def find_phase(self, context):
        current_phase = Phase.objects.get_phase()

        if current_phase:
            return self.success(phase=current_phase)
        else:
            return self.fail('Current phase not found')

    def find_exchange_rate(self, context):
        rate = ExchangeRate.objects.get_rate_by_currency(context.currency)

        if rate:
            return self.success(rate=rate)
        else:
            return self.fail(f"Exchange rate for cuurency {context.currency} not found")

    def round_amount(self, amount):
        return amount.quantize(Decimal('1.'), rounding=ROUND_HALF_UP)

    def calc_amount(self, context):
        phase_bonus_factor = 1 + Decimal(context.phase.bonus_percents) / 100
        rate = context.rate.rate
        value = Decimal(context.value)

        amount_wo_bonus = value * rate * self.tokens_per_usd * 10 ** settings.TOKEN_DECIMALS
        amount = amount_wo_bonus * phase_bonus_factor

        return self.success(amount=self.round_amount(amount),
                            amount_wo_bonus=self.round_amount(amount_wo_bonus))

    @service_call
    def __call__(self, value, currency):
        return self.success(value=value, currency=currency) | \
            self.find_phase | \
            self.find_exchange_rate | \
            self.calc_amount
