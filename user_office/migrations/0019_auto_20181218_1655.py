# Generated by Django 2.0.9 on 2018-12-18 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_office', '0018_kyc_middlename'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='kyc',
            name='approve_txn_id',
        ),
        migrations.AlterField(
            model_name='transaction',
            name='data',
            field=models.CharField(max_length=10000),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='txn_type',
            field=models.CharField(blank=True, choices=[('PASS_KYC', 'pass kyc'), ('CREATE_MEDIATOR', 'create tokens mediator contract')], default=None, max_length=10, null=True),
        ),
    ]
