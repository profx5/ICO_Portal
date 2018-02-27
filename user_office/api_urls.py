from django.urls import path
from rest_framework import routers

from .views.api import get_me, get_ico_phase_stats, get_available_currencies, \
    get_account, process_transaction, get_deposits

router = routers.SimpleRouter()

api_urlpatterns = [
    path('getMe/', get_me),
    path('getICOPhaseStats/', get_ico_phase_stats),
    path('getAvailableCurrencies/', get_available_currencies),
    path('getAccount/', get_account),
    path('processTransaction/', process_transaction),
    path('getDeposits/', get_deposits)
]
