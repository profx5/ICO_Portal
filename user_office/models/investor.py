from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.db.models import Sum
from django.conf import settings
from django.contrib.auth.models import BaseUserManager
from eth_utils.address import is_hex_address
from django.utils.crypto import get_random_string
from functools import partial

from blockchain.ethereum_contract.settings import Settings
from .deposit import Deposit
from .fields import EthAddressField, TokenField
from user_office.datetime import datetime


class InvestorManager(BaseUserManager):
    def create_user(self, *args, **kwargs):
        email = kwargs['email']

        password = self.make_random_password()

        investor = self.model(email=email, is_active=True)
        investor.set_password(password)

        investor.save()

        return investor


class Investor(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True, null=True)
    eth_account = EthAddressField(verbose_name='ethereum account address',
                                  null=True,
                                  blank=True,
                                  unique=True)
    tokens_amount = TokenField(default=0)
    date_joined = models.DateTimeField(default=datetime.utcnow)
    referral_id = models.CharField(max_length=16,
                                   unique=True,
                                   default=partial(get_random_string, 16))
    referrer = models.ForeignKey('Investor',
                                 blank=True,
                                 null=True,
                                 on_delete=models.SET_NULL)
    is_active = models.BooleanField(default=False)

    objects = InvestorManager()

    USERNAME_FIELD = 'email'
    is_staff = False

    class Meta:
        ordering = ['id']
        db_table = 'investors'

    def has_module_perms(self, *arg, **kwargs):
        return False

    def recalc_balance(self):
        self.tokens_amount = Deposit.objects.filter(investor=self,
                                                    state='CONFIRMED') \
                                            .aggregate(amount=Sum('amount'))['amount']

    @property
    def passed_kyc(self):
        return hasattr(self, 'kyc') and self.kyc.approved

    @property
    def kyc_required(self):
        return settings.KYC_ENABLED and not self.passed_kyc

    @property
    def investment_threshold(self):
        if self.kyc_required:
            return Settings.config('pre_kyc_threshold')
        else:
            return Settings.config('post_kyc_threshold')

    @property
    def eth_account_filled(self):
        return len(self.eth_account) == 42 and is_hex_address(self.eth_account)
