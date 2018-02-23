from rest_framework.generics import RetrieveAPIView
from rest_framework.serializers import ModelSerializer
from rest_framework.response import Response
from user_office.models import Phase


CURRENCY_FROM = 'USD'
CURRENCY_TO   = 'TKN'
TOKEN_PRICE   = 1


class PhaseSerializer(ModelSerializer):
    class Meta:
        model = Phase
        fields = ('name', 'bonus_percents', 'end_date')


class GetICOPhaseStats(RetrieveAPIView):
    serializer_class = PhaseSerializer

    def retrieve(self, request, *args, **kwargs):
        current_phase = Phase.objects.get_current_phase()

        serialized = self.get_serializer(current_phase)

        return Response(dict(serialized.data, **{'currency_from': CURRENCY_FROM,
                                                 'currency_to': CURRENCY_TO,
                                                 'token_price': TOKEN_PRICE}))
