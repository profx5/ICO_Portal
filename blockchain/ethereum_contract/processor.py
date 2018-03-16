from django.db import transaction, IntegrityError
from decimal import Decimal

from user_office.datetime import datetime
from user_office.models import Investor, Mint, Deposit, Phase


class Processor:
    def __init__(self, settings):
        self.settings = settings

    def set_investor(self, account):
        self.investor = Investor.objects.get(eth_account=account)

    def find_or_create_mint(self, event):
        mint = Mint.objects.filter(txn_hash=event.txn_hash, currency=self.settings.code)

        if mint:
            return True, mint[0]
        else:
            return False, Mint(txn_hash=event.txn_hash,
                               currency=self.settings.code,
                               account_from=event.payer,
                               account_to=event.contract_address,
                               value=event.value,
                               block_hash=event.block_hash,
                               block_number=event.block_number,
                               txn_date=event.accepted_at)

    def calc_tokens_amount(self, mint):
        phase_bonus_factor = (1 + Decimal(Phase.objects.get_phase(mint.txn_date).bonus_percents) / 100)

        tokens_amount = mint.value / self.settings.token_price

        return (tokens_amount * phase_bonus_factor, tokens_amount)

    def create_deposit(self, mint):
        amount, amount_wo_bonus = self.calc_tokens_amount(mint)

        return Deposit(investor=self.investor,
                       amount=amount,
                       amount_wo_bonus=amount_wo_bonus,
                       charged_at=datetime.now(),
                       mint=mint)

    def __call__(self, event):
        payer_address = event.payer
        self.set_investor(payer_address)

        with transaction.atomic():
            exists, mint = self.find_or_create_mint(event)

            if not exists:
                mint.confirm()
                try:
                    mint.save()
                except IntegrityError as e:
                    print(e)

                    return False

                deposit = self.create_deposit(mint)
                deposit.save()

                self.investor.recalc_balance()
                self.investor.save()

                return True
