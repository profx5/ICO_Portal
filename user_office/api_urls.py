from django.urls import path
from rest_framework.routers import SimpleRouter, Route

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
    path('getICOInfo/', get_ico_info),
    # path('getAvailableCurrencies/', get_available_currencies),
    # path('getAccount/', get_account),
    path('getDeposits/', get_deposits),
    path('setEthAccount/', set_eth_account),
    path('prepareDeposit/', prepare_deposit),
    path('getReferralLink/', get_referral_link),
    path('getPhase/', get_phase)
]

api_urlpatterns += router.urls
