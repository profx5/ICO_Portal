from rest_framework.generics import ListAPIView
from rest_framework.serializers import ModelSerializer

from user_office.models import Bonus
from .auth import KYCAndLoginPermission


class BonusSerializer(ModelSerializer):
    class Meta:
        model = Bonus
        fields = ('id', 'id_contract', 'description')


class GetBonuses(ListAPIView):

    serializer_class = BonusSerializer
    permission_classes = (KYCAndLoginPermission,)

    def get_queryset(self):
        return Bonus.objects.all()
