from oslash import Right, Left
from eth_utils.address import add_0x_prefix, is_hex_address, to_checksum_address
from django.db import DatabaseError

from user_office.models import TokensMove
from .recalc_balance import RecalcBalance
from ico_portal.utils import is_mixed_case


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
        try:
            account = add_0x_prefix(args['account'])

            if not is_hex_address(account):
                return InvalidAddress('Account should be hexadecimal')

            if account == '0x0000000000000000000000000000000000000000':
                return InvalidAddress('Invalid account address')

            if is_mixed_case(account):
                if account == to_checksum_address(account):
                    return Right(dict(args, account=account))
                else:
                    return InvalidAddress('Invalid eip-55 checksum')
            else:
                account = to_checksum_address(account)

                return Right(dict(args, account=account))
        except ValueError as e:
            return InvalidAddress('')

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
