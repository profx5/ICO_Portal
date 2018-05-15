from django.db import models
from django.conf import settings
from web3 import Web3


class EthAddressField(models.CharField):
    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 42
        super().__init__(*args, **kwargs)

    def pre_save(self, model_instance, add):
        value = getattr(model_instance, self.attname, None)
        if value:
            return Web3.toChecksumAddress(value)
        else:
            return super().pre_save(model_instance, add)


class TokenField(models.DecimalField):
    def __init__(self, *args, **kwargs):
        kwargs['max_digits'] = 65
        kwargs['decimal_places'] = 0

        super().__init__(*args, **kwargs)


class CurrencyField(models.CharField):
    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 5

        super().__init__(*args, **kwargs)
