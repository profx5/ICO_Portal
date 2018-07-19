from django.db import models
from ico_portal.utils.datetime import datetime


class POUpdate(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(default=datetime.utcnow)

    oracle_rate = models.DecimalField(max_digits=65, decimal_places=0)
    actual_rate = models.DecimalField(max_digits=65, decimal_places=0)
    new_rate = models.DecimalField(max_digits=65, decimal_places=0)

    txn_id = models.UUIDField()

    objects = models.Manager()

    class Meta:
        ordering = ['created_at']
        db_table = 'po_update_log'

    def __str__(self):
        return f'POUpdate for date {self.created_at}'
