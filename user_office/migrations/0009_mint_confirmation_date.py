# Generated by Django 2.0.2 on 2018-03-15 20:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_office', '0008_auto_20180315_1520'),
    ]

    operations = [
        migrations.AddField(
            model_name='mint',
            name='confirmation_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
