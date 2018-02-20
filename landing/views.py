from django.shortcuts import render

from .models import Milestone


def main(request):
    milestones = Milestone.objects.all()

    return render(request, 'main.html', {'milestones': milestones})
