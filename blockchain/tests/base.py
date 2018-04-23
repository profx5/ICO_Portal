from django.test import TestCase
from datetime import timedelta
from decimal import Decimal
from django.conf import settings
from web3 import Web3, HTTPProvider

from ico_portal.utils.datetime import datetime
from user_office.models import Investor, Phase, ExchangeRate


class BlockChainTestCase(TestCase):
    def stub_datetime_now(self, dt):
        datetime.stubed_now = dt

    def stub_datetime_utcnow(self, dt):
        datetime.stubed_utcnow = dt

    def init_web3(self):
        self.web3 = Web3(HTTPProvider(settings.WEB3_RPC_URL))
