from django.conf import settings
from oslash import Left, Right
from decimal import Decimal, ROUND_HALF_UP

from user_office.models import Phase, ExchangeRate

class CalcTokensAmount:
    @property
    def tokens_per_usd(self):
        return Decimal(settings.TOKENS_PER_USD)

    def find_phase(self, args):
        current_phase = Phase.objects.get_phase()

        if current_phase:
            return Right(dict(args, phase=current_phase))
        else:
            return Left('Current phase not found')

    def find_exchange_rate(self, args):
        rate = ExchangeRate.objects.get_rate_by_currency(args['currency'])

        if rate:
            return Right(dict(args, rate=rate))
        else:
            return Left(f"Exchange rate for cuurency {args['currency']} not found")

    def round_amount(self, amount):
        return amount.quantize(Decimal('1.'), rounding=ROUND_HALF_UP)

    def calc_amount(self, args):
        phase_bonus_factor = 1 + Decimal(args['phase'].bonus_percents) / 100
        rate = args['rate'].rate
        value = Decimal(args['value'])

        amount_wo_bonus = value * rate * self.tokens_per_usd * 10 ** settings.TOKEN_DECIMALS
        amount = amount_wo_bonus * phase_bonus_factor

        return Right((self.round_amount(amount),
                      self.round_amount(amount_wo_bonus)))

    def __call__(self, value, currency):
        return Right({'value': value,
                      'currency': currency}) | \
                      self.find_phase | \
                      self.find_exchange_rate | \
                      self.calc_amount
