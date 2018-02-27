from django.db import models


class Deposit(models.Model):
    id = models.AutoField(primary_key=True)
    investor = models.ForeignKey('Investor', related_name='deposits',
                                 on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=32, decimal_places=8)
    amount_wo_bonus = models.DecimalField(max_digits=32, decimal_places=8)
    charged_at = models.DateTimeField()
    mint = models.OneToOneField('Mint', on_delete=models.SET_NULL,
                                related_name='deposit', blank=True, null=True)

    objects = models.Manager()

    class Meta:
        ordering = ['id']
        db_table = 'deposits'
