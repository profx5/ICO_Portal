from django.db import models

from ico_portal.utils.datetime import datetime
from .fields import CurrencyField


class ExchangeRate(models.Model):
    id = models.AutoField(primary_key=True)
    currency = CurrencyField()
    creation_date = models.DateTimeField(default=datetime.utcnow)
    rate = models.DecimalField(max_digits=32, decimal_places=5)
    timestamp = models.PositiveIntegerField()

    objects = models.Manager()

    class Meta:
        ordering = ['creation_date']
        db_table = 'exchange_rates'

    def __str__(self):
        return f'Exchange rate for {self.currency} {self.rate} USD'
