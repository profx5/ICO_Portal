from oslash import Left, Right
from django.db import DatabaseError

from user_office.models import Mint, Deposit
from blockchain.currencies.ethereum.settings import Settings
from blockchain.currencies.ethereum.services import CalcTokensAmount

class PrepareDeposit:
    def create_mint(self, args):
        mint = Mint(currency='ETH',
                    txn_hash=args['txn_hash'],
                    value=args['value'],
                    account_to=Settings().token_address,
                    account_from=args['investor'].eth_account,
                    state='WAIT')

        try:
            mint.save()

            return Right(dict(args, mint=mint))
        except (DatabaseError, ValueError) as e:
            return Left(f'Error while saving mint {e}')

    def calc_amount(self, args):
        return CalcTokensAmount()(args['value']) | (lambda r: \
            Right(dict(args, amount=r[0], amount_wo_bonus=r[1])))

    def create_deposit(self, args):
        deposit = Deposit(investor=args['investor'],
                          amount=args['amount'],
                          amount_wo_bonus=args['amount_wo_bonus'],
                          mint=args['mint'])

        try:
            deposit.save()

            return Right(dict(args, deposit=deposit))
        except (DatabaseError, ValueError) as e:
            return Left(f'Error while saving mint {e}')

    def __call__(self, investor, value, txn_hash):
        args = {'value': value,
                'txn_hash': txn_hash,
                'investor': investor}

        return self.create_mint(args) | \
            self.calc_amount | \
            self.create_deposit
