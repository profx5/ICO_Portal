from django.db import models

from ico_portal.utils.datetime import datetime


class ICO_Info(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(default=datetime.utcnow)
    total_supply = models.DecimalField(max_digits=65, decimal_places=0)

    objects = models.Manager()

    class Meta:
        ordering = ['created_at']
        db_table = 'ico_info'

    def __str__(self):
        return f'ICO info for date {self.creation_date}'
