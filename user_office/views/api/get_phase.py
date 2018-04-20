from .auth import KYCAndLoginPermission
from rest_framework.generics import RetrieveAPIView
from rest_framework.serializers import ModelSerializer

from user_office.models import Phase


class PhaseSerializer(ModelSerializer):
    class Meta:
        model = Phase
        fields = ('name', 'begin_date', 'end_date', 'bonus_percents')


class GetPhase(RetrieveAPIView):
    """
    Return current phase
    """
    serializer_class = PhaseSerializer
    permission_classes = (KYCAndLoginPermission,)

    def get_object(self):
        return Phase.objects.get_phase()
