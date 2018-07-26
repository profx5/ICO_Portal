from decimal import Decimal
from oslash import Right
from django.db import DatabaseError

from user_office.models import POUpdate, Transaction, ExchangeRate
from ico_portal.utils.service_object import ServiceObject, service_call, transactional
from .create_transaction import CreateTransaction
from blockchain.ico.contracts import PriceOracle


class TooLowChange(Right):
    def bind(self, func):
        return TooLowChange(self._get_value())


class PendingUpdateExists(Right):
    pass


class UpdatePriceOracle(ServiceObject):
    def find_pending_update(self):
        last_update = POUpdate.objects.last()

        if last_update:
            txn = Transaction.objects.filter(txn_id=last_update.txn_id, state__in=['PREPARED', 'SENT'])

            if txn.exists():
                self._update_context(txn_id=last_update.txn_id, po_update=last_update)

                return PendingUpdateExists(self._context)

        return None

    def get_actual_rate(self, context):
        rate = ExchangeRate.objects.filter(currency='ETH').last()

        if rate:
            return self.success(actual_rate=rate.rate_cents)
        else:
            return self.fail('ExchangeRate object not found')

    def get_oracle_data(self, context):
        rate = context.oracle.get_eth_price_in_cents()
        change_percents = context.oracle.get_allowed_oracle_change_percent()
        sensivity = context.oracle.get_sensivity()

        return self.success(oracle_rate=Decimal(rate),
                            allowed_change=Decimal(change_percents),
                            sensivity=Decimal(sensivity))

    def calc_rate_change(self, context):
        diff = abs(context.actual_rate - context.oracle_rate)

        min_change = context.oracle_rate * context.sensivity / 100
        max_change = context.oracle_rate * context.allowed_change / 100

        if diff < min_change:
            return TooLowChange(self._context)
        elif min_change <= diff <= max_change:
            return self.success(new_rate=context.actual_rate)
        else:
            new_rate = context.oracle_rate + max_change

            return self.success(new_rate=new_rate)

    def create_txn_data(self, context):
        txn_data = context.oracle.set_eth_price_in_cents(context.new_rate)

        return self.success(txn_data=txn_data)

    def create_transaction(self, context):
        return CreateTransaction()(context.txn_data) | \
            (lambda result: self.success(transaction=result.txn))

    def create_po_update(self, context):
        po_update = POUpdate(oracle_rate=context.oracle_rate,
                             actual_rate=context.actual_rate,
                             new_rate=context.new_rate,
                             txn_id=context.transaction.txn_id)

        try:
            po_update.save()

            return self.success(po_update=po_update)
        except DatabaseError as e:
            return self.fail(e)

    @service_call
    @transactional
    def __call__(self):
        result = self.find_pending_update()

        if isinstance(result, PendingUpdateExists):
            return result
        else:
            return self.success(oracle=PriceOracle()) | \
                self.get_actual_rate | \
                self.get_oracle_data | \
                self.calc_rate_change | \
                self.create_txn_data | \
                self.create_transaction | \
                self.create_po_update
