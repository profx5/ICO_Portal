from django.db import transaction
from datetime import datetime
from decimal import Decimal

from user_office.currencies import get_currency
from user_office.models import Account, Mint, Deposit, Phase


class Processor:
    def __init__(self, currency_code):
        self.currency = get_currency(currency_code.upper())

    def set_date(self):
        self.date_now = datetime.now()

    def set_account(self, address):
        self.account = Account.objects.get(currency=self.currency.code,
                                           address=address)

    def find_or_create_mint(self, txn_id, timestamp, acc_from, acc_to, value, confirms):
        mint, exists = Mint.objects.get_or_create(txn_id=txn_id,
                                                  currency=self.currency.code,
                                                  txn_date=timestamp,
                                                  account_from=acc_from,
                                                  account_to=acc_to,
                                                  value=value)

        mint.confirms = confirms

        return mint

    def calc_tokens_amount(self, value):
        phase_bonus_factor = (1 + Decimal(Phase.objects.get_phase(self.date_now).bonus_percents) / 100)

        tokens_amount = value / self.currency.token_price

        return (tokens_amount * phase_bonus_factor, tokens_amount)

    def create_deposit(self, mint):
        amount, amount_wo_bonus = self.calc_tokens_amount(mint.value)

        return Deposit.objects.create(investor=self.account.investor,
                                      amount=amount,
                                      amount_wo_bonus=amount_wo_bonus,
                                      charged_at=datetime.now(),
                                      mint=mint)

    def __call__(self, txn_id, timestamp, acc_from, acc_to, value, confirms):
        self.set_date()
        self.set_account(acc_to)

        with transaction.atomic():
            mint = self.find_or_create_mint(txn_id, timestamp, acc_to,
                                            acc_from, value, confirms)

            if int(confirms) >= self.currency.confirmations_required \
               and not mint.confirmed:
                deposit = self.create_deposit(mint)

                deposit.save()
                mint.confirm()

                self.account.investor.recalc_balance()
                self.account.investor.save()

            mint.save()

            return True
