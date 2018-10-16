from decimal import Decimal
from oslash import Right

from blockchain.currencies.base_settings import BaseSettings


class Settings(BaseSettings):
    tasks = True

    @property
    def exchange_rate(self):
        return Decimal(self.rate_usdc) / 100

    def get_pay_address(self, _):
        return Right(self.address)
