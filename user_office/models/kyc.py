from django.db import models

KYC_STATE_CHOICES = (('WAITING', 'Waiting for approval'),
                     ('DECLINED', 'Declined'),
                     ('APPROVED', 'Approved'))

def kyc_photo_path(instance, filename):
    return 'kyc/{0}/{1}'.format(instance.investor.id, filename)


class KYC(models.Model):
    id = models.AutoField(primary_key=True)
    investor = models.OneToOneField('Investor', on_delete=models.CASCADE,
                                    related_name='kyc')
    state = models.CharField(max_length=10, choices=KYC_STATE_CHOICES,
                             default='WAITING')

    firstname = models.CharField(max_length=30)
    midname = models.CharField(max_length=30, blank=True, null=True)
    surname = models.CharField(max_length=30)
    birthdate = models.DateField()

    document_no = models.CharField(max_length=50)
    photo = models.ImageField(upload_to=kyc_photo_path)


    class Meta:
        ordering = ['id']
        db_table = 'kyc'

    @property
    def approved(self):
        return self.state == 'APPROVED'
