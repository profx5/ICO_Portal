from .auth import KYCAndLoginPermission
from rest_framework.generics import ListAPIView
from rest_framework.serializers import ModelSerializer

from user_office.models import Phase


class PhaseSerializer(ModelSerializer):
    class Meta:
        model = Phase
        fields = ('name', 'begin_date', 'end_date', 'bonus_percents', 'hard_cap', 'current')


class GetPhases(ListAPIView):
    """
    Return ICO phases
    """
    serializer_class = PhaseSerializer
    permission_classes = (KYCAndLoginPermission,)

    def get_queryset(self):
        return Phase.objects.all()
