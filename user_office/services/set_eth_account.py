from oslash import Right, Left
from web3 import Web3
from django.db import DatabaseError

from user_office.models import TokensMove
from .recalc_balance import RecalcBalance


class InvalidAddress(Left):
    def bind(self, func):
        return InvalidAddress(self._get_value())


class SetETHAccount:
    def check_account_filled(self, args):
        if args['investor'].eth_account:
            return Left('eth_account already filled')
        else:
            return Right(args)

    def validate_account(self, args):
        invalid_address = InvalidAddress(f"Invalid account address {args['account']}")

        try:
            account = Web3.toChecksumAddress(args['account'])

            if account == '0x0000000000000000000000000000000000000000':
                return invalid_address
            else:
                return Right(dict(args, account=account))
        except ValueError as e:
            return invalid_address

    def set_account(self, args):
        try:
            args['investor'].eth_account = args['account']
            args['investor'].save()

            return Right(args)
        except DatabaseError as e:
            return Left(f'Error while saving investor, {e}')

    def recalc_balance(self, args):
        if TokensMove.objects.filter(investor_id=args['account']).exists():
            return RecalcBalance()(args['investor']) | (lambda _: Right(args))
        else:
            return Right(args)

    def __call__(self, investor, account):
        return Right({'investor': investor,
                      'account': account}) | \
                      self.check_account_filled | \
                      self.validate_account | \
                      self.set_account | \
                      self.recalc_balance
