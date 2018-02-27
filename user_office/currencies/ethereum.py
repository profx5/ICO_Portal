from .base import BaseCurrency
from decimal import Decimal


class Ethereum(BaseCurrency):
    code = 'ETH'
    name = 'Ethereum'
    token_price = Decimal(1000)

    confirmations_required = 6

    @classmethod
    def generate_account(cls):
        return 'D257294276a423397499a11b590B9414886A8051'
