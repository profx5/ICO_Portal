from django.shortcuts import render

from .models import *


def main(request):
    listed_models = [
        News,
        Milestone,
        Document,
    ]

    context = {}

    for model in listed_models:
        context[model.__name__] = model.objects.all()

    return render(request, 'index.html', context)
