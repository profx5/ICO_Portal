from .auth import KYCAndLoginPermission
from rest_framework.generics import ListAPIView
from rest_framework.serializers import ModelSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from user_office.models import Deposit, Mint


class DepositsPagination(PageNumberPagination):
    page_size = 50

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'results': data
        })


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
    pagination_class = DepositsPagination

    def get_queryset(self):
        user = self.request.user

        return Deposit.objects.filter(investor=user)
