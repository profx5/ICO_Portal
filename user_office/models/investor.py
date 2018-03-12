from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.db.models import Sum

from .account import Account
from .deposit import Deposit
from .common import EthAddressField


class NoAuthData(Exception):
    pass


class InvestorManager(models.Manager):
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

    USERNAME_FIELD = 'eth_account'

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
