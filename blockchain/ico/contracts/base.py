import json
from django.conf import settings
from blockchain.web3 import get_web3
from ico_portal.utils.logger import LoggerMixin


class BaseContract(LoggerMixin):
    @classmethod
    def get_abi(cls):
        return cls.abi

    @classmethod
    def init(cls, settings):
        cls._settings = settings
        cls.contract_address = settings['address']

    @property
    def web3(self):
        return get_web3()

    @property
    def contract(self):
        return self.web3.eth.contract(abi=self.get_abi(),
                                      address=self.contract_address)
