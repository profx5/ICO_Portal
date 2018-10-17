from ico_portal.utils.logger import LoggerMixin
from user_office.models import ExchangeRate


class BaseSettings(LoggerMixin):
    def __init__(self, config):
        self._config = config

    def __getattr__(self, key):
        config = self.__getattribute__('_config')

        if key in config:
            return config[key]
        else:
            self.__getattribute__(key)

    def get_pay_address(self, investor):
        raise NotImplementedError

    @property
    def exchange_rate(self):
        obj = ExchangeRate.objects.get_rate_by_currency(self.code)

        if obj:
            return obj.rate
        else:
            self.logger.error(f"Exchange rate for currency {self.code} not found")

            return 0
