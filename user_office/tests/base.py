from django.test import TestCase
from rest_framework.test import APIClient

from ico_portal.utils.datetime import datetime
from user_office.models import Investor
from blockchain.tests.base import BlockChainTestCase


class APITestCase(TestCase):
    email = 'gordon@example.com'
    password = 'q123'
    eth_account = '0x73015966604928A312F79F7E69291a656Cb88602'
    tokens_amount = 1231

    setup_login = True

    maxDiff = None

    def setUp(self):
        investor = Investor.objects.create(id=1,
                                           email=self.email,
                                           eth_account=self.eth_account,
                                           tokens_amount=self.tokens_amount,
                                           is_active=True)
        investor.set_password(self.password)
        investor.save()

        self._investor_id = investor.id

        self.client = APIClient()

        if self.setup_login:
            self.client.login(email=self.email, password=self.password)

    def get_investor(self):
        return Investor.objects.get(id=self._investor_id)

    def tearDown(self):
        datetime.stubed_now = None
        datetime.stubed_utcnow = None

    def stub_datetime_now(self, dt):
        datetime.stubed_now = dt

    def stub_datetime_utcnow(self, dt):
        datetime.stubed_utcnow = dt


class EthTesterAPITestCase(APITestCase, BlockChainTestCase):
    setup_eth_tester = True
    setup_contracts = ['price_oracle', 'token', 'crowdsale']

    def setUp(self):
        BlockChainTestCase.setUp(self)
        APITestCase.setUp(self)
