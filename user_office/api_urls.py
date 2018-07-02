from django.urls import path
from rest_framework.routers import SimpleRouter, Route, DefaultRouter

from .views import api as api_views


api_urlpatterns = [
    path('getMe/', api_views.get_me),
    path('getICOInfo/', api_views.get_ico_info),
    path('getAvailableCurrencies/', api_views.get_available_currencies),
    path('getAccount/', api_views.get_account),
    path('getTokensMoves/', api_views.get_tokens_moves),
    path('setEthAccount/', api_views.set_eth_account),
    path('prepareTokensMove/', api_views.prepare_tokens_move),
    path('getReferralLink/', api_views.get_referral_link),
    path('getPhases/', api_views.get_phases),
    path('changePassword/', api_views.change_password),
    path('changeEmail/', api_views.change_email)
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


router = DefaultRouter()
router.register(r'tickets', api_views.TicketViewSet, base_name='tickets')
router.register(r'kyc', api_views.KYCViewSet, base_name='kyc')

api_urlpatterns += router.urls
