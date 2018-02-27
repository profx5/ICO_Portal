from django.db import models
from django.db.models import Manager
from user_office.currencies import get_enabled_currencies, get_currency


CURRENCY_CHOICES = [(c.code, c.name) for c in get_enabled_currencies()]


class AccountManager(Manager):
    def create_by_code(self, currency_code, investor):
        currency = get_currency(currency_code)
        address = currency.generate_account()

        return self.model(investor=investor,
                          currency=currency_code,
                          address=address)


class Account(models.Model):
    id = models.AutoField(primary_key=True)
    investor = models.ForeignKey('Investor', on_delete=models.CASCADE,
                                 related_name='pay_accounts')
    currency = models.CharField(max_length=10, choices=CURRENCY_CHOICES)
    address = models.CharField(max_length=100)

    objects = AccountManager()

    class Meta:
        ordering = ['id']
        db_table = 'accounts'
