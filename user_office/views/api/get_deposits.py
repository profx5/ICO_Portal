from .auth import KYCAndLoginPermission
from rest_framework.generics import ListAPIView
from rest_framework.serializers import ModelSerializer
from user_office.models import Deposit, Mint


class MintSerializer(ModelSerializer):
    class Meta:
        model = Mint
        fields = ('txn_hash',)


class DepositSerializer(ModelSerializer):
    mint = MintSerializer(many=False, read_only=True)

    class Meta:
        model = Deposit
        fields = ('amount', 'amount_wo_bonus', 'charged_at', 'state', 'mint')


class GetDeposits(ListAPIView):
    """
    Return list of deposits
    """

    serializer_class = DepositSerializer
    permission_classes = (KYCAndLoginPermission,)

    def get_queryset(self):
        user = self.request.user

        return Deposit.objects.filter(investor=user)
