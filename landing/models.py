from django.db import models


# def max_value_default():
#     last_milestone = Milestone.objects.last()

#     return last_milestone.line_no + 1 if last_milestone is not None else 0


# class Milestone(models.Model):
#     id = models.AutoField(primary_key=True)
#     line_no = models.PositiveIntegerField(unique=True, default=max_value_default)
#     label = models.CharField(max_length=100)
#     description = models.CharField(max_length=1000)
#     current = models.BooleanField(default=False)

#     class Meta:
#         ordering = ['line_no']
#         db_table = 'milestones'
