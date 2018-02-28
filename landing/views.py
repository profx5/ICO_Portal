from django.shortcuts import render

from .models import Milestone


def main(request):
    milestones = Milestone.objects.all()

    return render(request, 'index.html', {'milestones': milestones})
