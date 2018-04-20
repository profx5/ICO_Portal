from django.conf import settings
from oslash import Left, Right
from decimal import Decimal

from user_office.models import Phase, ICO_Info

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

    def find_ico_info(self, args):
        ico_info = ICO_Info.objects.last()

        if ico_info:
            return Right(dict(args, ico_info=ico_info))
        else:
            return Left('ICO info not found')

    def calc_amount(self, args):
        phase_bonus_factor = 1 + Decimal(args['phase'].bonus_percents) / 100
        usd_c_per_eth = Decimal(args['ico_info'].usd_c_per_eth) / 100
        value = Decimal(args['value'])

        amount_wo_bonus = value / 10 ** 18 * usd_c_per_eth * self.tokens_per_usd
        amount = amount_wo_bonus * phase_bonus_factor

        return Right((amount, amount_wo_bonus))

    def __call__(self, value):
        return \
            self.find_phase({'value': value}) | \
            self.find_ico_info | \
            self.calc_amount
