from ico_portal.utils.singleton import SingletonType
from oslash import Right, Left


CONTRACT_ABI = '''[
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "investor",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "weiAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "tokens",
                "type": "uint256"
            }
        ],
        "name": "TokensPurchased",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_investor",
                "type": "address"
            }
        ],
        "name": "passKYC",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "investor",
                "type": "address"
            }
        ],
        "name": "KYCPassed",
        "type": "event"
    },
    {
        "inputs": [
            {
                "name": "_wallet",
                "type": "address"
            },
            {
                "name": "_token",
                "type": "address"
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
                "indexed": true,
                "name": "investor",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "weiAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "tokens",
                "type": "uint256"
            }
        ],
        "name": "FundsReleased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "investor",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "weiAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "tokens",
                "type": "uint256"
            }
        ],
        "name": "FundsHold",
        "type": "event"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_weiAmount",
                "type": "uint256"
            }
        ],
        "name": "calculateTokens",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "investors",
        "outputs": [
            {
                "name": "weiDeposited",
                "type": "uint256"
            },
            {
                "name": "tokensToMint",
                "type": "uint256"
            },
            {
                "name": "passedKYC",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "token",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "wallet",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]'''


class CrowdsaleContract(object, metaclass=SingletonType):
    @classmethod
    def init(cls, web3, contract_address, sender_address):
        cls.web3 = web3
        cls.contract = web3.eth.contract(abi=CONTRACT_ABI,
                                         address=contract_address)
        cls.sender_address = sender_address

    def pass_kyc(self, address):
        gas = 100000
        try:
            return Right(self.contract.functions.passKYC(address).transact({
                'gas': gas,
                'from': self.sender_address
            }).hex())
        except Exception as e:
            return Left(f'Erroro while trying call `passKYC` method {e}')
