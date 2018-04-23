from django.db import models
from ico_portal.utils.datetime import datetime

from .fields import TokenField, CurrencyField


DEPOSIT_STATE_CHOICES = [
    ('ACTUAL', 'Actual'),
    ('PREPARED', 'Prepared')
]

TOKENS_MOVE_DIRECTIONS = [
    ('IN', 'Incoming'),
    ('OUT', 'Outgoing')
]


class TokensMove(models.Model):
    id = models.AutoField(primary_key=True)
    investor = models.ForeignKey('Investor', related_name='deposits',
                                 on_delete=models.CASCADE)
    amount = TokenField()

    created_at = models.DateTimeField(default=datetime.utcnow)
    actualized_at = models.DateTimeField(blank=True, null=True)

    transfer = models.ForeignKey('Transfer', on_delete=models.DO_NOTHING,
                                 related_name='tokens_moves')

    state = models.CharField(max_length=10, choices=DEPOSIT_STATE_CHOICES,
                             default='PREPARED')
    direction = models.CharField(max_length=3, choices=TOKENS_MOVE_DIRECTIONS)

    objects = models.Manager()

    class Meta:
        ordering = ['id']
        db_table = 'toknes_moves'

    def __str__(self):
        return f'TokensMove {self.id}'

    @property
    def actual(self):
        return self.state == 'ACTUAL'

    def actualize(self, date=None):
        if date is None:
            date = datetime.utcnow()

        self.state = 'ACTUAL'
        self.actualized_at = date
