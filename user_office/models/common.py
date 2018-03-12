from django.db import models
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
            return super(UpperCaseCharField, self).pre_save(model_instance, add)
