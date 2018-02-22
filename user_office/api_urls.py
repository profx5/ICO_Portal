from django.urls import path
from rest_framework import routers

from .views.api import get_me

router = routers.SimpleRouter()

api_urlpatterns = [
    path('getMe/', get_me)
]
