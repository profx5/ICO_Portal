from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.db.models import Sum
from django.conf import settings
from django.contrib.auth.models import BaseUserManager

from blockchain.ethereum_contract.settings import Settings
from .account import Account
from .deposit import Deposit
from .common import EthAddressField


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
    eth_account = EthAddressField(verbose_name='etherium account address',
                                  unique=True)
    tokens_amount = models.DecimalField(max_digits=32,
                                        decimal_places=8,
                                        default=0)

    objects = InvestorManager()

    USERNAME_FIELD = 'username'

    is_staff = False

    def has_module_perms(self, *arg, **kwargs):
        return False

    class Meta:
        ordering = ['id']
        db_table = 'investors'

    def get_account(self, currency_code):
        existing = [a for a in self.pay_accounts.all()
                    if a.currency == currency_code]

        if existing:
            return existing[0]

        else:
            account = Account.objects.create_by_code(currency_code, self)

            account.save()

            return account

    def recalc_balance(self):
        self.tokens_amount = Deposit.objects.filter(investor=self).aggregate(amount=Sum('amount'))['amount']

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
