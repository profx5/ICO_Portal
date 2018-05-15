from django.apps import AppConfig
from django.conf import settings
from web3 import Web3, HTTPProvider
from web3.middleware import geth_poa_middleware

from .ico.contracts import CrowdsaleContract, TokenContract
from .currencies import Currencies


class BlockchainConfig(AppConfig):
    name = 'blockchain'

    def ready(self):
        self.init_contracts()
        self.init_currencies()
        self.discover_tasks()

    def init_contracts(self):
        web3 = Web3(HTTPProvider(settings.WEB3_RPC_URL))
        web3.middleware_stack.inject(geth_poa_middleware, layer=0)

        CrowdsaleContract.init(web3=web3,
                               contract_address=settings.CROWDSALE_CONTRACT['address'],
                               account=settings.TOKEN_CONTRACT['account'])
        TokenContract.init(web3=web3,
                           contract_address=settings.TOKEN_CONTRACT['address'],
                           account=settings.TOKEN_CONTRACT['account'])

    def init_currencies(self):
        Currencies.init(settings.CURRENCIES)

    def discover_tasks(self):
        from ico_portal.celery import app
        app.autodiscover_tasks(['blockchain.ico',], force=True)
