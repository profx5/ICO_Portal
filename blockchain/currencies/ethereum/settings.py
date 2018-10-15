from oslash import Right
from django.conf import settings

from blockchain.currencies.base_settings import BaseSettings


class Settings(BaseSettings):
    def get_pay_address(self, investor):
        return Right(settings.CROWDSALE_CONTRACT)
