from django.db.models import Max
from django.conf import settings
from django.db import DatabaseError
from requests.exceptions import ConnectionError
from datetime import timedelta
from decimal import Decimal, ROUND_HALF_UP
from attrdict import AttrDict

from ico_portal.utils.datetime import datetime
from user_office.models import Transaction
from blockchain.web3 import get_web3
from ico_portal.utils.service_object import ServiceObject, service_call, transactional


class _Base(ServiceObject):
    @property
    def web3(self):
        return get_web3()

    def get_gas_price(self, context):
        return self.success(gas_price=12000000000)  # 12 GWei

    def sign_transaction(self, context):
        try:
            signed = self.web3.eth.account.signTransaction(context.txn_data, settings.ETH_ACCOUNT['private_key'])

            return self.success(signed=AttrDict(signed))  # eth_account.datastructures.AttributeDict doesnt support recursive deepcopy
        except (TypeError, ValueError) as e:
            return self.fail(e)

    def send_transaction(self, context):
        try:
            self.web3.eth.sendRawTransaction(context.signed.rawTransaction)

            return self.success()
        except (ConnectionError, ValueError) as e:
            return self.fail(e)


class SendPreparedTxns(_Base):
    def get_nonce(self, context):
        aggregated = Transaction.objects.all().aggregate(Max('nonce'))

        if aggregated['nonce__max'] is not None:
            nonce = aggregated['nonce__max'] + 1
        else:
            nonce = self.web3.eth.getTransactionCount(settings.ETH_ACCOUNT['address'])

        return self.success(nonce=nonce)

    def build_txn_data(self, context):
        txn_object = context.txn_object

        txn_data = {
            'to': txn_object.to_account,
            'from': settings.ETH_ACCOUNT['address'],
            'gas': txn_object.gas,
            'gasPrice': context.gas_price,
            'nonce': context.nonce,
            'data': txn_object.data,
            'value': int(txn_object.value)
        }

        return self.success(txn_data=txn_data)

    def save_txn_object(self, context):
        txn_object = context.txn_object

        try:
            txn_object.nonce = context.nonce
            txn_object.from_account = settings.ETH_ACCOUNT['address']
            txn_object.gas_price = context.gas_price
            txn_object.txn_hash = context.signed.hash.hex()
            txn_object.state = 'SENT'

            txn_object.save()

            return self.success(txn_object=txn_object)
        except DatabaseError as e:
            return self.fail(e)

    def return_result(self, context):
        return self.success(result=f'Sent new transaction with txn_hash={context.txn_object.txn_hash}')

    @transactional
    def send_prepared_transaction(self, txn_object):
        return self.success(txn_object=txn_object) | \
            self.get_nonce | \
            self.get_gas_price | \
            self.build_txn_data | \
            self.sign_transaction | \
            self.save_txn_object | \
            self.send_transaction | \
            self.return_result

    def __call__(self):
        transactions = Transaction.objects.filter(state='PREPARED')

        if transactions.count() > 0:
            self.logger.debug(f'Sending prepared transactions: {transactions}')

            return list(map(self.send_prepared_transaction, transactions))
        else:
            return []


class ResendTransaction(_Base):
    @property
    def gas_price_factor(self):
        return Decimal(settings.RESEND_GAS_PRICE_FACTOR)

    def calc_new_gas_price(self, context):
        old_gas_price = context.txn_object.gas_price

        new_gas_price = int((old_gas_price * self.gas_price_factor)
                            .quantize(Decimal('1.'), rounding=ROUND_HALF_UP))

        return self.success(gas_price=new_gas_price)

    def build_txn_data(self, context):
        txn_object = context.txn_object

        new_txn_data = {
            'to': txn_object.to_account,
            'from': txn_object.from_account,
            'gas': txn_object.gas,
            'gasPrice': context.gas_price,
            'nonce': txn_object.nonce,
            'data': txn_object.data,
            'value': int(txn_object.value),
        }

        return self.success(txn_data=new_txn_data)

    def save_txn_object(self, context):
        old_txn = context.txn_object

        new_txn = Transaction(
            data=old_txn.data,
            nonce=old_txn.nonce,
            value=old_txn.value,
            from_account=old_txn.from_account,
            to_account=old_txn.to_account,
            gas=old_txn.gas,
            gas_price=context.gas_price,
            txn_hash=context.signed.hash.hex(),
            txn_id=old_txn.txn_id
        )

        try:
            new_txn.save()

            return self.success(new_txn=new_txn)
        except DatabaseError as e:
            return self.fail(e)

    def return_result(self, context):
        return self.success(result=f'Sent new transaction with txn_hash={context.txn_object.txn_hash} and gas_price={context.gas_price}')

    def __call__(self, txn_object):
        return self.success(txn_object=txn_object) | \
            self.calc_new_gas_price | \
            self.build_txn_data | \
            self.sign_transaction | \
            self.save_txn_object | \
            self.send_transaction | \
            self.return_result


class TrackTransactions(_Base):
    @property
    def _resend_timedelta(self):
        return timedelta(seconds=settings.TXN_TRACKER_RESEND_SECONDS)

    def _get_mined_transaction(self, txn_id):
        return Transaction.objects.filter(txn_id=txn_id, state='MINED').first()

    def _get_transaction(self, txn_hash):
        return self.web3.eth.getTransaction(txn_hash)

    def failed_due_mined(self, txn_object, mined):
        fail_reason = f'Other transaction with txn_hash={mined.txn_hash} already mined'

        txn_object.state = 'FAILED'
        txn_object.fail_reason = fail_reason

        try:
            txn_object.save()

            return self.success(txn_object=txn_object, result=fail_reason)
        except DatabaseError as e:
            return self.fail(e)

    def mark_as_mined(self, txn_object, txn_data):
        txn_object.state = 'MINED'
        txn_object.block_number = txn_data.blockNumber

        try:
            txn_object.save()

            return self.success(txn_object=txn_object,
                                result=f'Mined with block_number={txn_data.blockNumber}')
        except DatabaseError as e:
            return self.fail(e)

    def nothing_to_do(self, txn_object):
        return self.success(txn_object=txn_object, result='Transaction not mined')

    @service_call
    @transactional
    def track_transaction(self, txn_object):
        self._update_context(txn_object=txn_object)

        mined_transaction = self._get_mined_transaction(txn_object.txn_id)

        if mined_transaction:
            return self.failed_due_mined(txn_object, mined_transaction)

        txn_data = self._get_transaction(txn_object.txn_hash)

        if txn_data.blockNumber is None:
            if datetime.utcnow() - txn_object.created_at > self._resend_timedelta:
                return ResendTransaction()(txn_object)
            else:
                return self.nothing_to_do(txn_object)
        else:
            return self.mark_as_mined(txn_object, txn_data)

    def __call__(self):
        transactions = Transaction.objects.filter(state='SENT').order_by('nonce', 'txn_hash')

        if transactions.count() > 0:
            self.logger.debug(f'Tracking transactions: {transactions}')

            return list(map(self.track_transaction, transactions))
        else:
            return []
