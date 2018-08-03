from django.db import models

from .fields import DocFileField


KYC_STATE_CHOICES = (('WAITING', 'Waiting for approval'),
                     ('DECLINED', 'Declined'),
                     ('APPROVED', 'Approved'))

KYC_TYPE_CHOICES = (('NATURAL', 'Natural Person'),
                    ('LEGAL', 'Legal Person'))


def kyc_photo_path(prefix, instance, filename):
    return f'kyc/{instance.investor.id}/{prefix}/{filename}'


class KYC(models.Model):
    id = models.AutoField(primary_key=True)
    investor = models.OneToOneField('Investor', on_delete=models.CASCADE,
                                    related_name='kyc')
    state = models.CharField(max_length=10, choices=KYC_STATE_CHOICES,
                             default='WAITING')
    type = models.CharField(max_length=10, choices=KYC_TYPE_CHOICES)

    decline_reason = models.TextField(blank=True, null=True)
    approve_txn_id = models.UUIDField(blank=True, null=True)

    ticket = models.ForeignKey('helpdesk.Ticket', on_delete=models.SET_NULL,
                               null=True, blank=True, related_name='kyc')

    # natural person
    firstname = models.CharField('First Name', max_length=30, null=True, blank=True)
    lastname = models.CharField('Last Name', max_length=30, null=True, blank=True)

    place_of_birth = models.CharField('Place of birth', max_length=50, null=True, blank=True)
    birthdate = models.DateField('Date of birth', null=True, blank=True)

    personal_id = models.CharField('Personal identification code', max_length=50, null=True, blank=True)

    place_of_residence = models.CharField('Place of residence', max_length=100, null=True, blank=True)
    profession = models.CharField('Profession of field of activity', max_length=30, null=True, blank=True)

    # legal person
    business_name = models.CharField('Business name', max_length=30, null=True, blank=True)
    registration_number = models.CharField('Registration number', max_length=50, null=True, blank=True)
    registration_date = models.DateField('Date of registration', null=True, blank=True)

    director_firstname = models.CharField('First name of director', max_length=30, null=True, blank=True)
    director_lastname = models.CharField('Last Name of director', max_length=30, null=True, blank=True)

    address = models.CharField('Address', max_length=50, null=True, blank=True)
    field_of_activity = models.CharField('Field of activity', max_length=50, null=True, blank=True)

    beneficial_fullname = models.CharField('Beneficial fullname', max_length=60, null=True, blank=True)
    beneficial_personal_id = models.CharField('Beneficial personal identification code', max_length=50, null=True, blank=True)
    beneficial_birthdate = models.DateField('Beneficial date of birth', null=True, blank=True)
    beneficial_place_of_birth = models.CharField('Beneficial place of birth', max_length=50, null=True, blank=True)
    beneficial_place_of_residence = models.CharField('Beneficial place of residence', max_length=100, null=True, blank=True)

    is_pep = models.NullBooleanField('Politically exposed person (PEP)')

    # both
    phone_number = models.CharField('Phone number', max_length=50, null=True, blank=True)
    email = models.EmailField('Email', null=True, blank=True)

    objects = models.Manager()

    class Meta:
        ordering = ['id']
        db_table = 'kyc'

        verbose_name = 'KYC'
        verbose_name_plural = 'KYCs'

    def __str__(self):
        return f'KYC of {self.investor.email}'

    @property
    def approved(self):
        return self.state == 'APPROVED'

    @property
    def waiting(self):
        return self.state == 'WAITING'

    @property
    def declined(self):
        return self.state == 'DECLINED'


KYC_ATTACHMENT_TYPE_CHOICES = (('basis_doc', 'Basis for representation'),
                               ('id_document_photo', 'Copy of identification document'),
                               ('bill_photo', 'Utility bill'))


def kyc_attachment_path(instance, filename):
    return f'kyc/{instance.kyc.investor.id}/{instance.type}/{filename}'


class KYCAttachment(models.Model):
    kyc = models.ForeignKey(KYC, on_delete=models.CASCADE, related_name='attachments')

    type = models.CharField(max_length=30, choices=KYC_ATTACHMENT_TYPE_CHOICES)

    file = DocFileField()
    filename = models.CharField('Filename', max_length=1000)
    mime_type = models.CharField('MIME Type', max_length=255)
    size = models.IntegerField('Size', help_text='Size of this file in bytes')

    objects = models.Manager()

    def __str__(self):
        return f'KYC of {self.kyc.investor.email} {self.type} {self.filename}'

    class Meta:
        ordering = ['id']
        db_table = 'kyc_attachments'
