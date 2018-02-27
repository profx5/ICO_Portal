from rest_framework.generics import RetrieveAPIView
from rest_framework.serializers import ModelSerializer
from rest_framework.response import Response
from user_office.models import Investor


class InvestorSerializer(ModelSerializer):
    class Meta:
        model = Investor
        fields = ('username', 'eth_account', 'tokens_amount')


class GetMeView(RetrieveAPIView):
    """
    Return information about current user
    """
    serializer_class = InvestorSerializer

    def get_object(self):
        return self.request.user
