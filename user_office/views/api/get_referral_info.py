from django.db.models import Sum, Q
from django.db.models.functions import Coalesce
from rest_framework.fields import SerializerMethodField
from rest_framework.generics import ListAPIView
from rest_framework.serializers import ModelSerializer

from user_office.helpers import get_referral_tokens_treshold
from user_office.models import Investor, ReferralBonus, Payment
from .auth import KYCAndLoginPermission
from rest_framework.response import Response
from django.urls import reverse
from django.conf import settings


class InvestorSerializer(ModelSerializer):
    state = SerializerMethodField('get_investor_state')

    class Meta:
        model = Investor
        fields = ('date_joined', 'state', )

    def get_investor_state(self, obj):
        if obj.kyc_required:
            return 'Awaiting KYC'
        elif Payment.objects.filter(payer_account=obj.eth_account).exists():
            return 'Completed'
        else:
            return 'Pending'


class GetReferralInfoView(ListAPIView):
    """
    Return referral info
    """
    permission_classes = (KYCAndLoginPermission, )
    serializer_class = InvestorSerializer

    def get_queryset(self):
        return Investor.objects.filter(referrer=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        referrals = self.get_serializer(queryset, many=True).data

        link = '{}{}?refid={}'.format(settings.HOST, reverse('signup'), request.user.referral_id)
        amounts = ReferralBonus.objects.filter(beneficiary=request.user).aggregate(
            created=Coalesce(Sum('amount', filter=Q(state=ReferralBonus.State.created)), 0),
            pending=Coalesce(Sum('amount', filter=Q(state=ReferralBonus.State.prepared)), 0),
            accrued=Coalesce(Sum('amount', filter=Q(state=ReferralBonus.State.accrued)), 0))
        threshold = get_referral_tokens_treshold()
        is_possible_to_collect = \
            not request.user.kyc_required and request.user.eth_account_filled and amounts['created'] >= threshold

        return Response(data={
            'link': link,
            'referrals': referrals,
            'amounts': amounts,
            'is_possible_to_collect': is_possible_to_collect,
            'invitation_text': settings.REFERRAL_INVITATION_TEXT,
        })
