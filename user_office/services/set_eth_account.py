from oslash import Left
from eth_utils.address import add_0x_prefix, is_hex_address, to_checksum_address
from django.db import DatabaseError

from user_office.models import TokensMove
from .recalc_balance import RecalcBalance
from ico_portal.utils import is_mixed_case
from ico_portal.utils.service_object import ServiceObject, service_call


class InvalidAddress(Left):
    def bind(self, func):
        return InvalidAddress(self._get_value())


class SetETHAccount(ServiceObject):
    def check_account_filled(self, context):
        if context.investor.eth_account:
            return self.fail('eth_account already filled')
        else:
            return self.success()

    def validate_account(self, context):
        try:
            account = add_0x_prefix(context.account)

            if not is_hex_address(account):
                return self.fail_with(InvalidAddress('Account should be hexadecimal'))

            if account == '0x0000000000000000000000000000000000000000':
                return self.fail_with(InvalidAddress('Invalid account address'))

            if is_mixed_case(account):
                if account == to_checksum_address(account):
                    return self.success(account=account)
                else:
                    return self.fail_with(InvalidAddress('Invalid eip-55 checksum'))
            else:
                account = to_checksum_address(account)

                return self.success(account=account)
        except ValueError as e:
            self.logger.error(f'Error while validating account {context.account}',
                              exc_info=e)

            return self.fail_with(InvalidAddress(''))

    def set_account(self, context):
        try:
            context.investor.eth_account = context.account
            context.investor.save()

            return self.success(investor=context.investor)
        except DatabaseError as e:
            return self.fail(e)

    def recalc_balance(self, context):
        if TokensMove.objects.filter(investor_id=context.account).exists():
            return RecalcBalance()(context.investor) | (lambda _: self.success())
        else:
            return self.success()

    @service_call
    def __call__(self, investor, account):
        return self.success(investor=investor, account=account) | \
            self.check_account_filled | \
            self.validate_account | \
            self.set_account | \
            self.recalc_balance
