from django.db import models

from user_office.datetime import datetime
from user_office.models.account import Account, CURRENCY_CHOICES


MINT_STATE_CHOICES = [
    ('CONFIRMED', 'Confirmed'),
    ('WAIT', 'Wait confirmation')
]


class Mint(models.Model):
    id = models.AutoField(primary_key=True)
    currency = models.CharField(max_length=10, choices=CURRENCY_CHOICES)
    txn_hash = models.CharField(max_length=100)
    account_to = models.CharField(max_length=100)
    account_from = models.CharField(max_length=100)
    value = models.CharField(max_length=100)
    txn_date = models.DateTimeField(blank=True, null=True)
    state = models.CharField(max_length=10, choices=MINT_STATE_CHOICES,
                             default='WAIT')
    confirmation_date = models.DateTimeField(null=True, blank=True)
    block_hash = models.CharField(max_length=100, blank=True, null=True)
    block_number = models.PositiveIntegerField(blank=True, null=True)

    objects = models.Manager()

    class Meta:
        ordering = ['id']
        db_table = 'mint_log'
        unique_together = ('currency', 'txn_hash')

    @property
    def confirmed(self):
        return self.state == 'CONFIRMED'

    def confirm(self, date=None):
        if date is None:
            date = datetime.utcnow()

        self.state = 'CONFIRMED'
        self.confirmation_date = date
