import os
import hashlib
from django.db import models
from django.core.validators import FileExtensionValidator
from web3 import Web3


class ETHAddressField(models.CharField):
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
        kwargs['max_length'] = 10

        super().__init__(*args, **kwargs)


def hashed_upload_to(instance, filename):
    block_size = 65536
    sha256 = hashlib.sha256()
    extension = os.path.splitext(filename)[1][1:].lower()

    f = instance.file

    f.open()

    for block in iter(lambda: f.read(block_size), b''):
        sha256.update(block)

    return '%s.%s' % (sha256.hexdigest(), extension)


class DocFileField(models.FileField):
    allowed_extensions = ['png', 'jpg', 'jpeg', 'pdf', 'doc', 'docx', 'zip']

    def __init__(self, *args, **kwargs):
        if 'allowed_extensions' in kwargs:
            allowed_extensions = kwargs['allowed_extensions']
        else:
            allowed_extensions = self.allowed_extensions

        kwargs['validators'] = [FileExtensionValidator(allowed_extensions=allowed_extensions)]
        kwargs['upload_to'] = hashed_upload_to

        super().__init__(*args, **kwargs)

    def pre_save(self, model_instance, add):
        value = super().pre_save(model_instance, add)

        self.run_validators(value)

        return value
