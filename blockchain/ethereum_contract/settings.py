from web3 import Web3, HTTPProvider


CONTRACT_ABI = '[ { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_from", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Deposit", "type": "event" } ]'
EVENT_NAME = 'Deposit'


class Settings:
    _config = {}
    web3 = None
    contract = None
    events_filter = None

    def __init__(self):
        pass


    def __getattr__(self, key):
        if key in self.__class__._config:
            return self.__class__._config[key]
        else:
            self.__getattribute__(key)

    @classmethod
    def init(cls, config):
        cls._config = config
        cls.init_web3()

    @classmethod
    def init_web3(cls):
        cls.web3 = Web3(HTTPProvider(cls._config['rpc_url']))

    @classmethod
    def init_events_filter(cls):
        web3 = cls.web3

        cls.contract = web3.eth.contract(abi=CONTRACT_ABI,
                                         address=cls._config['contract_address'])
        cls.events_filter = cls.contract.eventFilter(EVENT_NAME)

    @classmethod
    def get_events_filter(cls):
        if cls.events_filter is None:
            cls.init_events_filter()

        return cls.events_filter
