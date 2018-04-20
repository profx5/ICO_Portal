from oslash import Left, Right
from django.db import transaction, DatabaseError

from user_office.models import Investor, Mint, Deposit, Phase
from user_office.services import RecalcBalance
from .calc_tokens_amount import CalcTokensAmount


class ProcessEvent:
    def __init__(self, settings):
        self.settings = settings

    def find_investor(self, args):
        event = args['event']

        investors = Investor.objects.filter(eth_account=event.payer)

        if len(investors) == 0:
            return Left(f'Investor for event with txn_hash={event.txn_hash} not found')
        else:
            return Right(dict(args, investor=investors[0]))

    def create_or_update_mint(self, args):
        event = args['event']

        fields = {
            'txn_hash': event.txn_hash,
            'currency': self.settings.code,
            'account_from': event.payer,
            'account_to': event.contract_address,
            'value': event.value,
            'block_hash': event.block_hash,
            'block_number': event.block_number,
            'txn_date': event.accepted_at,
        }

        mints = Mint.objects.filter(txn_hash=fields['txn_hash'],
                                    currency=fields['currency'])

        if len(mints) == 0:
            mint = Mint(**fields)
        else:
            mint = mints[0]

            if mint.confirmed:
                return Left(f'Found mint with id={mint.id} is already confirmed')

            for k, v in fields.items():
                setattr(mint, k, v)

        mint.confirm()

        return Right(dict(args, mint=mint))

    def calc_tokens_amount(self, args):
        service = CalcTokensAmount()

        return service(args['event'].value) | (lambda result: \
            Right(dict(args, amount=result[0], amount_wo_bonus=result[1])))

    def create_or_update_deposit(self, args):
        fields = {
            'investor': args['investor'],
            'amount': args['amount'],
            'amount_wo_bonus': args['amount_wo_bonus'],
            'mint': args['mint']
        }

        deposits = Deposit.objects.filter(mint=args['mint'])

        if len(deposits) == 0:
            deposit = Deposit(**fields)
        else:
            deposit = deposit[0]

            for k, v in fields.items():
                setattr(mint, k, v)

        return Right(dict(args, deposit=deposit))

    def confirm_deposit(self, args):
        args['deposit'].confirm()

        return Right(args)

    def save_all(self, args):
        try:
            args['mint'].save()
            # Update mint, otherwise mint_id will be empty
            args['deposit'].mint = args['mint']
            args['deposit'].save()

            return Right(args)
        except DatabaseError as e:
            return Left(f'Got error while saving deposit and mint {e}')

    def recalc_investor_balance(self, args):
        investor = args['investor']

        service = RecalcBalance()

        return service(investor) | (lambda _: Right(args))

    def __call__(self, event):
        args = {'event': event}

        with transaction.atomic():
            result = self.find_investor(args) | \
                     self.create_or_update_mint | \
                     self.calc_tokens_amount | \
                     self.create_or_update_deposit | \
                     self.confirm_deposit | \
                     self.save_all | \
                     self.recalc_investor_balance


            if isinstance(result, Right):
                print(f'Transaction {event.txn_hash} successfully processed')
            else:
                transaction.set_rollback(True)

            return result
