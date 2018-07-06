from django.db import models

from landing.models.page import Page
from landing.models.base import Ordered



class News(Ordered):
    title = models.CharField(max_length=100)
    background_photo = models.ImageField(upload_to='imgs/news/')
    logo_svg = models.ImageField(upload_to='imgs/logos/')
    url = models.CharField(max_length=300, blank=True, null=True)
    native_news = models.ForeignKey(Page, on_delete=models.CASCADE, blank=True, null=True)


    class Meta:
        verbose_name = 'News'
        verbose_name_plural = 'News'
        ordering = ['order']

    def __str__(self):
        return self.title


class Milestone(Ordered):
    period = models.CharField(max_length=100)
    time_to_begin = models.CharField(max_length=100)
    description = models.TextField()
    reached = models.BooleanField(default=False)

    def __str__(self):
        return self.period


class Document(Ordered):
    title = models.CharField(max_length=100)
    doc = models.FileField(upload_to='docs/about/')

    def __str__(self):
        return self.title
