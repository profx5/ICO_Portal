from django.db import models
from django.db.models.query import QuerySet
from django.db.models.manager import BaseManager
from django.db.models import Q
from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.exceptions import ValidationError

from user_office.datetime import datetime


class PhaseDateIntersection(Exception):
    pass


class PhaseQuerySet(QuerySet):
    def get_overlaping_phases(self, begin_date, end_date, exclude_id=None):
        overlaps = self.exclude(id=exclude_id).filter(
            Q(begin_date__gte=begin_date, begin_date__lte=end_date) |
            Q(end_date__gte=begin_date, end_date__lte=end_date))

        if overlaps:
            return [o.name for o in overlaps]

    def get_phase(self, date=None):
        if date is None:
            date = datetime.utcnow()

        phases = self.filter(begin_date__lte=date, end_date__gte=date)

        if len(phases) == 1:
            return phases[0]
        elif len(phases) == 0:
            return None
        else:
            raise PhaseDateIntersection()


class Phase(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=500)
    begin_date = models.DateTimeField()
    end_date = models.DateTimeField()
    bonus_percents = models.IntegerField(
        validators=[MinValueValidator(1),MaxValueValidator(100)])

    objects = BaseManager.from_queryset(PhaseQuerySet)()

    def clean(self):
        if self.begin_date >= self.end_date:
            raise ValidationError('Begin date should be bigger then end date')

        overlaps = Phase.objects.get_overlaping_phases(self.begin_date, self.end_date, self.id)

        if overlaps:
            raise ValidationError('Phase %s overlaps phase %s' %
                                  (self.name, ' and '.join(overlaps)))


    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['begin_date']
        db_table = 'phases'
