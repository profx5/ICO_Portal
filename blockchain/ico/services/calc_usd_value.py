from decimal import Decimal, ROUND_HALF_UP

from ico_portal.utils.service_object import ServiceObject, service_call
from user_office.models import ExchangeRate


class CalcUSDValue(ServiceObject):
    def round_value(self, value):
        return value.quantize(Decimal('1.'), rounding=ROUND_HALF_UP)

    def find_exchange_rate(self, context):
        rate = ExchangeRate.objects.get_rate_by_currency(context.currency)

        if rate:
            return self.success(rate=rate)
        else:
            return self.fail(f"Exchange rate for cuurency {context.currency} not found")

    def calc_value(self, context):
        rate = context.rate.rate_cents
        amount = Decimal(context.amount)

        value = amount * rate

        return self.success(value=self.round_value(value))

    @service_call
    def __call__(self, amount, currency):
        return self.success(currency=currency, amount=amount) | \
            self.find_exchange_rate | \
            self.calc_value
