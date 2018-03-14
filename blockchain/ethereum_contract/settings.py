from web3 import Web3, HTTPProvider


CONTRACT_ABI = '''[
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "investmentThresholds",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Deposit",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "investor",
                "type": "address"
            },
            {
                "name": "thresholds",
                "type": "uint256"
            }
        ],
        "name": "setInvestmentThreshold",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    }
]'''

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
    def config(cls, key):
        return cls._config[key]

    @classmethod
    def init(cls, config):
        cls._config = config
        cls.init_web3()
        cls.init_contract()

    @classmethod
    def init_web3(cls):
        cls.web3 = Web3(HTTPProvider(cls.config('rpc_url')))

    @classmethod
    def init_contract(cls):
        web3 = cls.web3
        cls.contract = web3.eth.contract(abi=CONTRACT_ABI,
                                         address=cls.config('contract_address'))

    @classmethod
    def init_events_filter(cls):
        cls.events_filter = cls.contract.eventFilter(EVENT_NAME)

    @classmethod
    def get_events_filter(cls):
        if cls.events_filter is None:
            cls.init_events_filter()

        return cls.events_filter
