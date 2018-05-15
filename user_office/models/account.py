from django.db import models
from django.db.models import Manager

from .fields import EthAddressField, CurrencyField


class Account(models.Model):
    id = models.AutoField(primary_key=True)
    investor = models.ForeignKey('Investor', on_delete=models.CASCADE,
                                 related_name='accounts')
    currency = CurrencyField()
    address = models.CharField(max_length=100)

    objects = models.Manager()

    class Meta:
        ordering = ['id']
        db_table = 'accounts'

    def __str__(self):
        return f'Account {self.address} for user {self.investor.email}'
