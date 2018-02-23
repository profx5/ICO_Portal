from django.urls import path
from rest_framework import routers

from .views.api import get_me, get_ico_phase_stats

router = routers.SimpleRouter()

api_urlpatterns = [
    path('getMe/', get_me),
    path('getICOPhaseStats/', get_ico_phase_stats)
]
