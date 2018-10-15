from django.apps import AppConfig
from django.conf import settings

from .ico.contracts import CrowdsaleContract, TokenContract, PriceOracle
from .currencies import Currencies


class BlockchainConfig(AppConfig):
    name = 'blockchain'

    def ready(self):
        self.init_contracts()
        self.init_currencies()
        self.discover_tasks()

    def init_contracts(self):
        CrowdsaleContract.init(settings.CROWDSALE_CONTRACT)
        TokenContract.init(settings.TOKEN_CONTRACT)
        PriceOracle.init(settings.PRICE_ORACLE)

    def init_currencies(self):
        Currencies.init(settings.CURRENCIES)

    def discover_tasks(self):
        from ico_portal.celery import app

        app.autodiscover_tasks(['blockchain.ico'], force=True)

        for currency in Currencies._instances:
            if getattr(currency, 'tasks', False):
                app.autodiscover_tasks([f'blockchain.currencies.{currency.module}'], force=True)
