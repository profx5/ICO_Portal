from .auth import KYCAndLoginPermission
from rest_framework.generics import RetrieveAPIView
from rest_framework.serializers import ModelSerializer, BooleanField
from rest_framework.response import Response
from user_office.models import Investor


class InvestorSerializer(ModelSerializer):
    passed_kys = BooleanField()

    class Meta:
        model = Investor
        fields = ('username', 'eth_account', 'tokens_amount', 'passed_kys')


class GetMeView(RetrieveAPIView):
    """
    Return information about current user
    """
    serializer_class = InvestorSerializer
    permission_classes = (KYCAndLoginPermission,)

    def get_object(self):
        return self.request.user
