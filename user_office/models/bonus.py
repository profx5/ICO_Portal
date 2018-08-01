from django.db import models


class Bonus(models.Model):
    id = models.AutoField(primary_key=True)
    id_contract = models.CharField(max_length=10)
    description = models.TextField()
