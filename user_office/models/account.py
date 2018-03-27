from django.db import models
from django.db.models import Manager
from blockchain.currencies import Currencies

from .common import EthAddressField


CURRENCY_CHOICES = [(i.code, i.name) for i in Currencies.get_currencies()]


class AccountManager(Manager):
    def create_by_code(self, currency_code, investor):
        currency = get_currency(currency_code)
        address = currency.generate_account()

        return self.model(investor=investor,
                          currency=currency_code,
                          address=address)


class Account(models.Model):
    id = models.AutoField(primary_key=True)
    investor = models.ForeignKey('Investor', on_delete=models.CASCADE,
                                 related_name='pay_accounts')
    currency = models.CharField(max_length=10, choices=CURRENCY_CHOICES)
    address = EthAddressField()

    objects = AccountManager()

    class Meta:
        ordering = ['id']
        db_table = 'accounts'
