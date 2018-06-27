from functools import partial
from django.db import models


KYC_STATE_CHOICES = (('WAITING', 'Waiting for approval'),
                     ('DECLINED', 'Declined'),
                     ('APPROVED', 'Approved'))

GENDER_CHOICES = (('M', 'Male'),
                  ('F', 'Female'),
                  ('O', 'Other'))


def kyc_photo_path(prefix, instance, filename):
    return f'kyc/{instance.investor.id}/{prefix}/{filename}'


class KYC(models.Model):
    id = models.AutoField(primary_key=True)
    investor = models.OneToOneField('Investor', on_delete=models.CASCADE,
                                    related_name='kyc')
    state = models.CharField(max_length=10, choices=KYC_STATE_CHOICES,
                             default='WAITING')

    user_photo = models.ImageField(upload_to=partial(kyc_photo_path, 'selfie'))
    firstname = models.CharField(max_length=30)
    midname = models.CharField(max_length=30, blank=True, null=True)
    surname = models.CharField(max_length=30)

    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    birthdate = models.DateField()

    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    registration_address = models.CharField(max_length=500)
    postcode = models.CharField(max_length=10)

    document_type = models.CharField(max_length=50)
    document_no = models.CharField(max_length=50)
    document_country = models.CharField(max_length=50)
    document_date = models.DateField()
    document_photo = models.ImageField(upload_to=partial(kyc_photo_path, 'photo'))


    decline_reason = models.TextField(blank=True, null=True)
    approve_txn_id = models.UUIDField(blank=True, null=True)

    ticket = models.ForeignKey('helpdesk.Ticket', on_delete=models.SET_NULL,
                               null=True, blank=True, related_name='kyc')

    class Meta:
        ordering = ['id']
        db_table = 'kyc'

        verbose_name = 'KYC'
        verbose_name_plural = 'KYCs'

    def __str__(self):
        return f'KYC for {self.firstname} {self.midname} {self.surname}'

    @property
    def approved(self):
        return self.state == 'APPROVED'

    @property
    def waiting(self):
        return self.state == 'WAITING'
