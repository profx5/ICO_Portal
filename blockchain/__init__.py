from django.conf import settings
from web3 import Web3, HTTPProvider
from web3.middleware import geth_poa_middleware

from .ico.contracts import CrowdsaleContract, \
    TokenContract, PriceContract
from .currencies import Currencies

def init_contracts():
    web3 = Web3(HTTPProvider(settings.WEB3_RPC_URL))
    web3.middleware_stack.inject(geth_poa_middleware, layer=0)

    CrowdsaleContract.init(web3=web3,
                           contract_address=settings.CROWDSALE_CONTRACT['address'],
                           sender_address=settings.CROWDSALE_CONTRACT['sender'])
    TokenContract.init(web3=web3,
                       contract_address=settings.TOKEN_CONTRACT['address'],
                       sender_address=settings.TOKEN_CONTRACT['sender'])
    PriceContract.init(web3=web3,
                       contract_address=settings.PRICE_CONTRACT['address'],
                       sender_address=settings.TOKEN_CONTRACT['sender'])

def init_currencies():
    Currencies.init(settings.CURRENCIES)

    return Currencies
