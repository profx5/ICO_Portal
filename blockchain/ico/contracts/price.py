from ico_portal.utils.singleton import SingletonType
from oslash import Right, Left


CONTRACT_ABI = '''[
    {
        "constant": true,
        "inputs": [
            {
                "name": "addr",
                "type": "address"
            },
            {
                "name": "roleName",
                "type": "string"
            }
        ],
        "name": "checkRole",
        "outputs": [],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "addr",
                "type": "address"
            },
            {
                "name": "roleName",
                "type": "string"
            }
        ],
        "name": "hasRole",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "addr",
                "type": "address"
            },
            {
                "name": "roleName",
                "type": "string"
            }
        ],
        "name": "adminRemoveRole",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_priceUSDcETH",
                "type": "uint256"
            }
        ],
        "name": "setPrice",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "addr",
                "type": "address"
            },
            {
                "name": "roleName",
                "type": "string"
            }
        ],
        "name": "adminAddRole",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "ROLE_ADMIN",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "priceUSDcETH",
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
        "inputs": [
            {
                "name": "_initialPrice",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "PriceUpdate",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "addr",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "roleName",
                "type": "string"
            }
        ],
        "name": "RoleAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "addr",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "roleName",
                "type": "string"
            }
        ],
        "name": "RoleRemoved",
        "type": "event"
    }
]'''


class PriceContract(object, metaclass=SingletonType):
    @classmethod
    def init(cls, web3, contract_address, sender_address):
        cls.web3 = web3
        cls.contract = web3.eth.contract(abi=CONTRACT_ABI,
                                         address=contract_address)
        cls.sender_address = sender_address

    def get_price_USDc_ETH(self):
        return Right(self.contract.functions.priceUSDcETH().call({
            'from': self.sender_address
        }))
