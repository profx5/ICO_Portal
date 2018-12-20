from blockchain.web3 import get_web3
from blockchain.ico.contracts.base import BaseContract


class TokensMediator(BaseContract):
    compiled_file_path = '{BASE_DIR}/solidity-contracts/contracts/TokensMediator.json'

    @classmethod
    def init(cls, settings):
        cls._settings = settings
        cls.endpoint_address = settings['endpoint_address']

    def __init__(self, contract_address):
        self.contract_address = contract_address

    @classmethod
    def deploy_for_investor(cls, investor_address):
        gas = 500000
        web3 = get_web3()

        compiled = cls.get_compiled()

        contract = web3.eth.contract(abi=compiled['abi'], bytecode=compiled['bin'])
        txn_data = contract.constructor(investor_address, cls.endpoint_address).buildTransaction({
            'gas': gas
        })

        txn_data['to'] = None

        return txn_data
