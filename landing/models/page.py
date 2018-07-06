from django.db import models
from feincms.module.page.models import Page
from django.template.loader import render_to_string


Page.register_templates({
    'title': 'Standard template',
    'path': 'news.html',
    'regions': (
        ('header', 'Header'),
        ('content', 'Content'),
        ('footer', 'Footer')
    ),
})


class NewsPageContent(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField()
    picture = models.ImageField(upload_to='imgs/news')

    class Meta:
        abstract = True

    def render(self, **kwargs):
        return render_to_string(
            'news_content.html',
            dict(news=self, lines=self.text.splitlines())
        )

Page.create_content_type(NewsPageContent)
