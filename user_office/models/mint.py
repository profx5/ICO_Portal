from django.db import models
from datetime import datetime

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
    value = models.PositiveIntegerField()
    txn_date = models.DateTimeField(blank=True, null=True)
    state = models.CharField(max_length=10, choices=MINT_STATE_CHOICES,
                             default='WAIT')
    block_hash = models.CharField(max_length=100)
    block_number = models.PositiveIntegerField()

    objects = models.Manager()

    class Meta:
        ordering = ['id']
        db_table = 'mint_log'

    @property
    def confirmed(self):
        return self.state == 'CONFIRMED'

    def confirm(self, date=datetime.now()):
        self.state = 'CONFIRMED'
        self.confirme_data = date
