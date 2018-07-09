from django.db import DatabaseError

from ico_portal.utils.service_object import ServiceObject, service_call
from user_office.models import Transaction


class CreateTransaction(ServiceObject):
    @service_call
    def __call__(self, transaction_data):
        txn = Transaction(data=transaction_data['data'],
                          value=transaction_data['value'],
                          to_account=transaction_data['to'],
                          gas=transaction_data['gas'],
                          state='PREPARED')

        try:
            txn.save()

            return self.success(txn=txn)
        except DatabaseError as e:
            return self.fail(e)
