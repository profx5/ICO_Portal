from .auth import KYCAndLoginPermission
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response

from blockchain.ethereum_contract.settings import Settings


class GetICOInfo(RetrieveAPIView):
    """
    Return ico info
    """
    permission_classes = (KYCAndLoginPermission,)

    def retrieve(self, request, *args, **kwargs):
        return Response(Settings.ico_info)
