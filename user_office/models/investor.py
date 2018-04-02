from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.db.models import Sum
from django.conf import settings
from django.contrib.auth.models import BaseUserManager
from eth_utils.address import is_hex_address
from django.utils.crypto import get_random_string
from functools import partial

from blockchain.ethereum_contract.settings import Settings
from .account import Account
from .deposit import Deposit
from .common import EthAddressField
from user_office.datetime import datetime


class NoAuthData(Exception):
    pass


class InvestorManager(BaseUserManager):
    def _find_by_username(self, username):
        try:
            return self.get_queryset().get(username=username)
        except Investor.DoesNotExist:
            return None

    def _find_by_eth_account(self, eth_account):
        try:
            return self.get_queryset().get(eth_account=eth_account)
        except Investor.DoesNotExist:
            return None

    def find_for_auth(self, username=None, eth_account=None):
        if username is None and eth_account is None:
            raise NoAuthData()

        result = self._find_by_username(username) \
                 or self._find_by_eth_account(eth_account)

        if result is None:
            raise Investor.DoesNotExist()
        else:
            return result

    def create_user(self, *args, **kwargs):
        username = kwargs['username']
        password = self.make_random_password()

        investor = self.model(username=username)
        investor.set_password(password)

        investor.save()

        return investor


class Investor(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100,
                                unique=True)
    eth_account = EthAddressField(verbose_name='ethereum account address',
                                  null=True,
                                  blank=True,
                                  unique=True)
    tokens_amount = models.DecimalField(max_digits=32,
                                        decimal_places=8,
                                        default=0)
    date_joined = models.DateTimeField(default=datetime.utcnow)
    referral_id = models.CharField(max_length=16,
                                   unique=True,
                                   default=partial(get_random_string, 16))
    referrer = models.ForeignKey('Investor',
                                 blank=True,
                                 null=True,
                                 on_delete=models.SET_NULL)

    objects = InvestorManager()

    USERNAME_FIELD = 'username'
    is_staff = False

    class Meta:
        ordering = ['id']
        db_table = 'investors'

    def has_module_perms(self, *arg, **kwargs):
        return False

    def recalc_balance(self):
        self.tokens_amount = Deposit.objects.filter(investor=self,
                                                    state='CONFIRMED') \
                                            .aggregate(amount=Sum('amount'))['amount']

    @property
    def passed_kyc(self):
        return hasattr(self, 'kyc') and self.kyc.approved

    @property
    def kyc_required(self):
        return settings.KYC_ENABLED and not self.passed_kyc

    @property
    def investment_threshold(self):
        if self.kyc_required:
            return Settings.config('pre_kyc_threshold')
        else:
            return Settings.config('post_kyc_threshold')

    @property
    def eth_account_filled(self):
        return len(self.eth_account) == 42 and is_hex_address(self.eth_account)
