from django.db import models
from .user import User


class Investor(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    eth_addr = models.CharField(verbose_name='etherium account address',
                                max_length=100,
                                unique=True)
    tokens_amount = models.DecimalField(max_digits=32,
                                        decimal_places=8,
                                        default=0)

    class Meta:
        ordering = ['id']
        db_table = 'investors'
