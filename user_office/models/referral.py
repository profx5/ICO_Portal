from django.db import models

from ico_portal.utils.datetime import datetime
from user_office.models.fields import TokenField


class ReferralBonus(models.Model):
    class State:
        created = 'created'
        accrued = 'accrued'

        choices = (
            (created, created.capitalize()),
            (accrued, accrued.capitalize()),
        )

    beneficiary = models.ForeignKey(
        'Investor',
        on_delete=models.CASCADE,
        related_name='referral_bonuses')
    amount = TokenField()
    is_from_referrer = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=datetime.utcnow)
    created_from = models.ForeignKey(
        'Payment', on_delete=models.CASCADE,
        related_name='referral_bonuses')
    accrued_in = models.ForeignKey(
        'TokensMove',
        null=True, blank=True,
        on_delete=models.CASCADE,
        related_name='referral_bonuses')
    state = models.CharField(
        max_length=10,
        choices=State.choices,
        default=State.created)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f'Referral bonus {self.id} to {self.beneficiary}'
