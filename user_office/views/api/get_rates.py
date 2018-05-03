from rest_framework.generics import ListAPIView
from rest_framework.serializers import ModelSerializer

from user_office.models import ExchangeRate


class ExchangeRatesSerializer(ModelSerializer):
    class Meta:
        model = ExchangeRate
        fields = ('currency', 'rate',)


class GetRates(ListAPIView):
    """
    Return currency rates
    """
    serializer_class = ExchangeRatesSerializer

    def get_queryset(self):
        return ExchangeRate.objects.all()
