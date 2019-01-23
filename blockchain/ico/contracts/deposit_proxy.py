import json
import os

from blockchain.web3 import get_web3
from blockchain.ico.contracts.base import BaseContract
from ico_portal.utils import memoized_property


class DepositProxy(BaseContract):
    _compiled = None

    @classmethod
    def init(cls, settings):
        cls._settings = settings
        cls.endpoint_address = settings['endpoint_address']

    def __init__(self, contract_address):
        self.contract_address = contract_address

    @classmethod
    def get_compiled(cls):
        if not cls._compiled:
            with open(os.path.join(os.path.dirname(__file__), 'deposit_proxy.json')) as f:
                cls._compiled = json.load(f)

        return cls._compiled

    def get_abi(self):
        return self.get_compiled()['abi']

    @classmethod
    def deploy_for_investor(cls, investor_address):
        gas = 500000
        web3 = get_web3()

        contract = web3.eth.contract(abi=cls.get_compiled()['abi'], bytecode=cls.get_compiled()['bin'])
        txn_data = contract.constructor(investor_address, cls.endpoint_address).buildTransaction({
            'gas': gas
        })

        txn_data['to'] = None

        return txn_data
