from .auth import KYCAndLoginPermission
from rest_framework.generics import RetrieveAPIView
from rest_framework import serializers
from rest_framework.response import Response
from user_office.models import Investor


class InvestorSerializer(serializers.ModelSerializer):
    kyc_required = serializers.BooleanField()
    investment_threshold = serializers.IntegerField()

    class Meta:
        model = Investor
        fields = ('email', 'eth_account', 'tokens_amount',
                  'kyc_required', 'investment_threshold')


class GetMeView(RetrieveAPIView):
    """
    Return information about current user
    """
    serializer_class = InvestorSerializer
    permission_classes = (KYCAndLoginPermission,)

    def get_object(self):
        return self.request.user
