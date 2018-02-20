from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models


class NoAuthData(Exception):
    pass


class InvestorManager(models.Manager):
    def _find_by_username(self, username):
        try:
            return self.get_queryset().get(username=username)
        except Investor.DoesNotExist:
            return None

    def _find_by_eth_addr(self, eth_addr):
        try:
            return self.get_queryset().get(eth_addr=eth_addr)
        except Investor.DoesNotExist:
            return None

    def find_for_auth(self, username=None, eht_addr=None):
        if username is None and eth_addr is None:
            raise NoAuthData()

        result = self._find_by_username(username) \
                 or self._find_by_eth_addr(eth_addr)

        if result is None:
            raise Investor.DoesNotExist()
        else:
            return result


class Investor(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100,
                                unique=True)
    eth_addr = models.CharField(verbose_name='etherium account address',
                                max_length=100,
                                unique=True)
    tokens_amount = models.DecimalField(max_digits=32,
                                        decimal_places=8,
                                        default=0)

    objects = InvestorManager()

    USERNAME_FIELD = 'eth_addr'

    is_staff = False

    def has_module_perms(self, *arg, **kwargs):
        return False

    class Meta:
        ordering = ['id']
        db_table = 'investors'
