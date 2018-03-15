from django.urls import path
from rest_framework.routers import SimpleRouter, Route

from .views.api import get_me
from .views.api import *


class SingleObjectRouter(SimpleRouter):
    routes = [
        Route(
            url=r'^{prefix}{trailing_slash}$',
            mapping={
                'get': 'retrieve',
                'post': 'create',
                'put': 'update'
            },
            name='{basename}-detail',
            initkwargs={'suffix': 'Instance'}
        ),
    ]


router = SingleObjectRouter()
router.register(r'kyc', KYCViewSet, base_name='kyc')


api_urlpatterns = [
    path('getMe/', get_me),
    path('getICOPhaseStats/', get_ico_phase_stats),
    path('getAvailableCurrencies/', get_available_currencies),
    path('getAccount/', get_account),
    path('getDeposits/', get_deposits)
]

api_urlpatterns += router.urls
