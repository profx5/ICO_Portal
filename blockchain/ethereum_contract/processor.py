from django.db import transaction, IntegrityError

from user_office.models import Investor, Mint, Deposit


class Processor:
    def __init__(self, settings):
        self.settings = settings

    def set_investor(self, account):
        self.investor = Investor.objects.get(eth_account=account)

    def get_or_update_mint(self, event):
        fields = {
            'txn_hash': event.txn_hash,
            'currency': self.settings.code,
            'account_from': event.payer,
            'account_to': event.contract_address,
            'value': event.value,
            'block_hash': event.block_hash,
            'block_number': event.block_number,
            'txn_date': event.accepted_at
        }

        mint = Mint.objects.filter(txn_hash=fields['txn_hash'],
                                   currency=fields['currency'])

        if mint:
            mint = mint[0]

            for k, v in fields.items():
                setattr(mint, k, v)

            return mint
        else:
            return Mint(**fields)

    def get_or_update_deposit(self, mint):
        amount, amount_wo_bonus = self.settings.calc_tokens_amount(mint.value)

        fields = {
            'investor': self.investor,
            'amount': amount,
            'amount_wo_bonus': amount_wo_bonus,
            'mint': mint
        }

        deposit = Deposit.objects.filter(mint=mint)

        if deposit:
            deposit = deposit[0]

            for k, v in fields.items():
                setattr(mint, k, v)

            return deposit
        else:
            return Deposit(**fields)

    def __call__(self, event):
        payer_address = event.payer
        self.set_investor(payer_address)

        with transaction.atomic():
            mint = self.get_or_update_mint(event)

            if not mint.confirmed:
                mint.confirm()

                try:
                    mint.save()
                except IntegrityError as e:
                    print(e)

                    return False

                deposit = self.get_or_update_deposit(mint)
                deposit.confirm()
                deposit.save()

                self.investor.recalc_balance()
                self.investor.save()

                return True
