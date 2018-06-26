from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.conf import settings
from django.contrib.auth.models import BaseUserManager
from eth_utils.address import is_hex_address
from django.utils.crypto import get_random_string
from functools import partial

from .fields import ETHAddressField, TokenField
from ico_portal.utils.datetime import datetime


class InvestorManager(BaseUserManager):
    def create_user(self, *args, **kwargs):
        email = kwargs['email']

        if not email:
            raise ValueError('Users must have an email address')

        password = kwargs.get('password', self.make_random_password())

        investor = self.model(email=email)
        investor.set_password(password)

        investor.save()

        return investor

    def create_superuser(self, email, password):
        user = self.create_user(email=email, password=password)

        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class Investor(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True, null=True)

    eth_account = ETHAddressField(verbose_name='ethereum account address',
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

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = InvestorManager()

    USERNAME_FIELD = 'email'

    class Meta:
        ordering = ['id']
        db_table = 'investors'

    @property
    def passed_kyc(self):
        return hasattr(self, 'kyc') and self.kyc.approved

    @property
    def kyc_required(self):
        return settings.KYC_ENABLED and not self.passed_kyc

    @property
    def investment_threshold(self):
        if self.kyc_required:
            return settings.THRESHOLDS['pre_kyc']
        else:
            return settings.THRESHOLDS['post_kyc']

    @property
    def eth_account_filled(self):
        return len(self.eth_account) == 42 and is_hex_address(self.eth_account)

    @property
    def is_superuser(self):
        return self.is_admin

    def has_perm(self, perm, obj=None):
        return self.is_active and self.is_superuser

    def has_perms(self, perm_list, obj=None):
        return all(self.has_perm(perm, obj) for perm in perm_list)

    def has_module_perms(self, app_label):
        return self.is_active and self.is_superuser

    def get_full_name(self):
        return self.email
