from django.db import models
from user_office.datetime import datetime


DEPOSIT_STATE_CHOICES = [
    ('CONFIRMED', 'Confirmed'),
    ('PREPARED', 'Prepared')
]


class Deposit(models.Model):
    id = models.AutoField(primary_key=True)
    investor = models.ForeignKey('Investor', related_name='deposits',
                                 on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=32, decimal_places=8)
    amount_wo_bonus = models.DecimalField(max_digits=32, decimal_places=8)
    created_at = models.DateTimeField(default=datetime.utcnow)
    charged_at = models.DateTimeField(blank=True, null=True)
    mint = models.OneToOneField('Mint', on_delete=models.SET_NULL,
                                related_name='deposit', blank=True, null=True)
    state = models.CharField(max_length=10, choices=DEPOSIT_STATE_CHOICES,
                             default='PREPARED')

    objects = models.Manager()

    class Meta:
        ordering = ['id']
        db_table = 'deposits'

    def __str__(self):
        return f'Deposit {self.id}'

    @property
    def confirmed(self):
        return self.state == 'CONFIRMED'

    def confirm(self, date=None):
        if date is None:
            date = datetime.utcnow()

        self.state = 'CONFIRMED'
        self.charged_at = date
