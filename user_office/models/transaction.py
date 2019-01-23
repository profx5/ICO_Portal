import uuid
from django.db import models

from ico_portal.utils.datetime import datetime


TRANSACTION_STATE_CHOICES = (('SENT', 'Sent'),
                             ('MINED', 'Mined'),
                             ('PREPARED', 'Prepared'),
                             ('FAILED', 'Failed'))

TRANSACTION_TYPE_CHOICES = (
    ('PASS_KYC', 'pass kyc'),
    ('CREATE_PROXY', 'create tokens mediator contract'),
)


class Transaction(models.Model):
    id = models.AutoField(primary_key=True)

    data = models.CharField(max_length=10000)
    nonce = models.IntegerField(blank=True, null=True)
    value = models.DecimalField(max_digits=50, decimal_places=0, default=0)

    from_account = models.CharField(max_length=42, blank=True, null=True)
    to_account = models.CharField(max_length=42, blank=True, null=True)

    gas = models.IntegerField()
    gas_price = models.DecimalField(max_digits=50, decimal_places=0,
                                    blank=True, null=True)

    txn_hash = models.CharField(max_length=100, blank=True, null=True, unique=True)

    block_number = models.IntegerField(blank=True, null=True)

    state = models.CharField(max_length=10, choices=TRANSACTION_STATE_CHOICES, default='PREPARED')
    fail_reason = models.CharField(max_length=500, blank=True, null=True)

    created_at = models.DateTimeField(default=datetime.utcnow)
    txn_id = models.UUIDField(default=uuid.uuid4)

    txn_type = models.CharField(
        max_length=30,
        blank=True,
        null=True,
        choices=TRANSACTION_TYPE_CHOICES,
        default=None
    )

    objects = models.Manager()

    class Meta:
        ordering = ['id']
        db_table = 'transactions'

    def __str__(self):
        return f'Transaction {self.id} txn_id={self.txn_id}'
