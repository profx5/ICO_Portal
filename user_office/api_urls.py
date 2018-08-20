from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import api as api_views
from .routers import SingleObjectRouter


api_urlpatterns = [
    path('getMe/', api_views.get_me),
    path('getICOInfo/', api_views.get_ico_info),
    path('getBonuses/', api_views.get_bonuses),
    path('getAvailableCurrencies/', api_views.get_available_currencies),
    path('getAccount/', api_views.get_account),
    path('getTokensMoves/', api_views.get_tokens_moves),
    path('setEthAccount/', api_views.set_eth_account),
    path('prepareTokensMove/', api_views.prepare_tokens_move),
    path('getReferralInfo/', api_views.get_referral_info),
    path('getPhases/', api_views.get_phases),
    path('changePassword/', api_views.change_password),
    path('changeEmail/', api_views.change_email),
    path('prepareReferralBonuses/', api_views.prepare_referral_bonuses),
]

default_router = DefaultRouter()
default_router.register(r'tickets', api_views.TicketViewSet, base_name='tickets')

single_obj_router = SingleObjectRouter()
single_obj_router.register(r'kyc', api_views.KYCViewSet, base_name='kyc')

api_urlpatterns += default_router.urls
api_urlpatterns += single_obj_router.urls
