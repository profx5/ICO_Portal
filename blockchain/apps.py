from django.apps import AppConfig
from django.conf import settings

from .ico.contracts import CrowdsaleContract, TokenContract
from .currencies import Currencies


class BlockchainConfig(AppConfig):
    name = 'blockchain'

    def ready(self):
        self.init_contracts()
        self.init_currencies()
        self.discover_tasks()

    def init_contracts(self):
        CrowdsaleContract.init(contract_address=settings.CROWDSALE_CONTRACT['address'])
        TokenContract.init(contract_address=settings.TOKEN_CONTRACT['address'])

    def init_currencies(self):
        Currencies.init(settings.CURRENCIES)

    def discover_tasks(self):
        from ico_portal.celery import app

        app.autodiscover_tasks(['blockchain.ico',], force=True)
