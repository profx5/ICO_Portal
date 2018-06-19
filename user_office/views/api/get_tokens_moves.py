from .auth import KYCAndLoginPermission
from rest_framework.generics import ListAPIView
from rest_framework.serializers import ModelSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from user_office.models import TokensMove, Transfer, Payment


class TransferSerializer(ModelSerializer):
    class Meta:
        model = Transfer
        fields = ('txn_hash', 'state', 'block_number')


class PaymentSerializer(ModelSerializer):
    class Meta:
        model = Payment
        fields = ('currency', 'payer_account', 'amount', 'amounti', 'txn_id',
                  'received_at')

class TokensMoveSerializer(ModelSerializer):
    transfer = TransferSerializer()
    payment = PaymentSerializer(many=True)

    class Meta:
        model = TokensMove
        fields = ('amount', 'created_at', 'actualized_at', 'state',
                  'transfer', 'direction', 'payment')


class TokensMovesPagination(PageNumberPagination):
    page_size = 50

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'results': data
        })


class GetTokensMoves(ListAPIView):
    """
    Return list of tokens moves
    """

    serializer_class = TokensMoveSerializer
    permission_classes = (KYCAndLoginPermission,)
    pagination_class = TokensMovesPagination

    def get_queryset(self):
        user = self.request.user

        return TokensMove.objects.filter(investor=user).order_by('-created_at')
