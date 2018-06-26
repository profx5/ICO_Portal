from django.urls import path
from rest_framework.routers import SimpleRouter, Route, DefaultRouter

from .views.api import *


api_urlpatterns = [
    path('getMe/', get_me),
    path('getICOInfo/', get_ico_info),
    path('getAvailableCurrencies/', get_available_currencies),
    path('getAccount/', get_account),
    path('getTokensMoves/', get_tokens_moves),
    path('setEthAccount/', set_eth_account),
    path('prepareTokensMove/', prepare_tokens_move),
    path('getReferralLink/', get_referral_link),
    path('getPhases/', get_phases),
    path('changePassword/', change_password),
    path('changeEmail/', change_email)
]


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
            initkwargs={'suffix': 'Instance'},
            detail=True
        ),
    ]

# kyc_router = SingleObjectRouter()
# kyc_router.register(r'kyc', KYCViewSet, base_name='kyc')
# api_urlpatterns += kyc_router.urls

# ticket_router = DefaultRouter()
# ticket_router.register(r'tickets', TicketViewSet, base_name='tickets')
# api_urlpatterns += ticket_router.urls

router = DefaultRouter()
router.register(r'tickets', TicketViewSet, base_name='tickets')
router.register(r'kyc', KYCViewSet, base_name='kyc')

api_urlpatterns += router.urls
