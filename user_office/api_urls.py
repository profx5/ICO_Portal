from django.urls import path
from rest_framework.routers import SimpleRouter, Route

from .views import api


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
router.register(r'kyc', api.KYCViewSet, base_name='kyc')


api_urlpatterns = [
    path('getMe/', api.get_me),
    path('getICOPhaseStats/', api.get_ico_phase_stats),
    path('getAvailableCurrencies/', api.get_available_currencies),
    path('getAccount/', api.get_account),
    path('getDeposits/', api.get_deposits)
]

api_urlpatterns += router.urls
