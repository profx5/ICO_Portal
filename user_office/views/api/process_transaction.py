from rest_framework.views import APIView
from rest_framework.response import Response

from user_office.services.process_transaction import Processor


from datetime import datetime


class ProcessTransaction(APIView):
    """
    DONT USE
    """

    def post(self, request, *args, **kwargs):
        currency = request.data['currency_code']
        processor = Processor(currency)

        result = processor(txn_id=request.data['txn_id'],
                           timestamp=datetime.strptime(request.data['txn_date'], '%Y-%m-%dT%H:%M:%S'),
                           acc_from=request.data['acc_from'],
                           acc_to=request.data['acc_to'],
                           value=int(request.data['value']),
                           confirms=request.data['confirms'])

        return Response({'success': result})
