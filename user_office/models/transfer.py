from django.db import models

from ico_portal.utils.datetime import datetime


TRANSFER_STATE_CHOICES = [
    ('ACTUAL', 'Actual'),
    ('PREPARED', 'Prepared')
]


class Transfer(models.Model):
    id = models.AutoField(primary_key=True)

    txn_hash = models.CharField(max_length=100, unique=True,
                                blank=True, null=True)
    mint_txn_id = models.UUIDField(null=True, blank=True)

    to_account = models.CharField(max_length=100, null=True, blank=True)
    from_account = models.CharField(max_length=100, null=True, blank=True)

    amount = models.DecimalField(max_digits=65, decimal_places=0,
                                 null=True, blank=True)

    block_hash = models.CharField(max_length=100, blank=True, null=True)
    block_number = models.PositiveIntegerField(blank=True, null=True)

    created_at = models.DateTimeField(default=datetime.utcnow)
    actualized_at = models.DateTimeField(blank=True, null=True)

    state = models.CharField(max_length=10, choices=TRANSFER_STATE_CHOICES,
                             default='PREPARED')

    objects = models.Manager()

    class Meta:
        ordering = ['id']
        db_table = 'transfers'

    def __str__(self):
        return f'Transfer {self.txn_hash}'

    @property
    def actual(self):
        return self.state == 'ACTUAL'

    def actualize(self, date=None):
        if date is None:
            date = datetime.utcnow()

        self.state = 'ACTUAL'
        self.actualized_at = date
