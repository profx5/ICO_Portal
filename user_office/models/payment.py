from django.db import models

from ico_portal.utils.datetime import datetime
from .fields import CurrencyField


class Payment(models.Model):
    id = models.AutoField(primary_key=True)
    currency = CurrencyField()

    payer_account = models.CharField(max_length=50)

    amount = models.DecimalField(max_digits=65, decimal_places=18)
    amounti = models.DecimalField(max_digits=65, decimal_places=0)

    external_id = models.CharField(max_length=100, null=True, blank=True)

    txn_id = models.CharField(max_length=100)
    received_at = models.DateTimeField(default=datetime.utcnow)

    tokens_move = models.ForeignKey('TokensMove', on_delete=models.DO_NOTHING,
                                    related_name='payment')
    usdc_value = models.DecimalField(max_digits=65, decimal_places=0, default=0)
    rate_usdc = models.DecimalField(max_digits=65, decimal_places=0, default=0)
    bonus_percent = models.IntegerField(null=True, blank=True)
    bonus_ids = models.IntegerField(null=True, blank=True)

    objects = models.Manager()

    class Meta:
        ordering = ['received_at']
        db_table = 'payments'

    def __str__(self):
        return f'Payment {self.id}'
