from django.test import TestCase
from rest_framework.test import APIClient

from user_office.datetime import datetime
from user_office.models import Investor


class APITestCase(TestCase):
    username = 'gordon'
    password = 'q123'
    eth_account = '0x73015966604928A312F79F7E69291a656Cb88602'
    tokens_amount = 1231.22

    setup_login = True

    def setUp(self):
        self.investor = Investor.objects.create(username=self.username,
                                                eth_account=self.eth_account,
                                                tokens_amount=self.tokens_amount)
        self.investor.set_password(self.password)
        self.investor.save()

        self.client = APIClient()

        if self.setup_login:
            self.client.login(username=self.username, passwd=self.password)

    def tearDown(self):
        datetime.stubed_now = None
        datetime.stubed_utcnow = None

    def stub_datetime_now(self, dt):
        datetime.stubed_now = dt

    def stub_datetime_utcnow(self, dt):
        datetime.stubed_utcnow = dt
