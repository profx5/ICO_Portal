from oslash import Left, Right
from django.db.models import Max
from django.conf import settings
from django.db import DatabaseError, transaction
from requests.exceptions import ConnectionError
from datetime import timedelta
from decimal import Decimal, ROUND_HALF_UP

from ico_portal.utils.datetime import datetime
from user_office.models import Transaction
from blockchain.web3 import get_web3


class _Base:
    @property
    def web3(self):
        return get_web3()

    def get_gas_price(self, args):
        return Right(dict(args, gas_price=5000000000)) # 5 GWei

    def sign_transaction(self, args):
        try:
            signed = self.web3.eth.account.signTransaction(args['txn_data'], settings.ETH_ACCOUNT['private_key'])

            return Right(dict(args, signed=signed))
        except (TypeError, ValueError) as e:
            return Left(f'Error while signing transaction, {e}')

    def send_transaction(self, args):
        try:
            self.web3.eth.sendRawTransaction(args['signed'].rawTransaction)

            return Right(args)
        except (ConnectionError, ValueError) as e:
            return Left(f'Got error while sending transaction, {e}')


class SendPreparedTxns(_Base):
    def get_nonce(self, args):
        aggregated = Transaction.objects.all().aggregate(Max('nonce'))

        if aggregated['nonce__max'] is not None:
            return Right(dict(args, nonce=aggregated['nonce__max'] + 1))
        else:
            nonce = self.web3.eth.getTransactionCount(settings.ETH_ACCOUNT['address'])

            return Right(dict(args, nonce=nonce))

    def build_txn_data(self, args):
        txn_object = args['txn_object']

        txn_data = {
            'to': txn_object.to_account,
            'from': settings.ETH_ACCOUNT['address'],
            'gas': txn_object.gas,
            'gasPrice': args['gas_price'],
            'nonce': args['nonce'],
            'data': txn_object.data,
            'value': int(txn_object.value)
        }

        return Right(dict(args, txn_data=txn_data))

    def save_txn_object(self, args):
        txn_object = args['txn_object']

        try:
            txn_object.nonce = args['nonce']
            txn_object.from_account = settings.ETH_ACCOUNT['address']
            txn_object.gas_price = args['gas_price']
            txn_object.txn_hash = args['signed'].hash.hex()
            txn_object.state = 'SENT'

            txn_object.save()

            return Right(args)
        except DatabaseError as e:
            return Left(F'Error while saving Transaction, {e}')

    def return_result(self, args):
        txn_object = args['txn_object']

        return Right({'txn_object': txn_object,
                      'result': f'Sent new transaction with txn_hash={txn_object.txn_hash}'})

    def send_prepared_transaction(self, txn_object):
        with transaction.atomic():
            result = Right({'txn_object': txn_object}) | \
                     self.get_nonce | \
                     self.get_gas_price | \
                     self.build_txn_data | \
                     self.sign_transaction | \
                     self.save_txn_object | \
                     self.send_transaction | \
                     self.return_result

            if isinstance(result, Left):
                transaction.set_rollback(True)

            return result

    def __call__(self):
        transactions = Transaction.objects.filter(state='PREPARED')

        return list(map(self.send_prepared_transaction, transactions))


class ResendTransaction(_Base):
    @property
    def gas_price_factor(self):
        return Decimal(settings.RESEND_GAS_PRICE_FACTOR)

    def calc_new_gas_price(self, args):
        old_gas_price = args['txn_object'].gas_price

        new_gas_price = int((old_gas_price * self.gas_price_factor) \
                            .quantize(Decimal('1.'), rounding=ROUND_HALF_UP))


        return Right(dict(args, gas_price=new_gas_price))

    def build_txn_data(self, args):
        txn_object = args['txn_object']

        new_txn_data = {
            'to': txn_object.to_account,
            'from': txn_object.from_account,
            'gas': txn_object.gas,
            'gasPrice': args['gas_price'],
            'nonce': txn_object.nonce,
            'data': txn_object.data,
            'value': int(txn_object.value),
        }

        return Right(dict(args, txn_data=new_txn_data))

    def save_txn_object(self, args):
        old_txn = args['txn_object']

        new_txn = Transaction(
            data=old_txn.data,
            nonce=old_txn.nonce,
            value=old_txn.value,
            from_account=old_txn.from_account,
            to_account=old_txn.to_account,
            gas=old_txn.gas,
            gas_price=args['gas_price'],
            txn_hash=args['signed'].hash.hex(),
            txn_id=old_txn.txn_id
        )

        try:
            new_txn.save()

            return Right(dict(args, new_txn=new_txn))
        except DatabaseError as e:
            return Left(F'Error while saving Transaction, {e}')

    def return_result(self, args):
        txn_hash = args['new_txn'].txn_hash
        gas_price = args['gas_price']

        return Right({'txn_object': args['txn_object'],
                      'result': f'Sent new transaction with txn_hash={txn_hash} and gas_price={gas_price}'})

    def __call__(self, txn_object):
        return Right({'txn_object': txn_object}) | \
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

            return Right({'txn_object': txn_object, 'result': fail_reason})
        except DatabaseError as e:
            return Left('Error while saving transaction, {e}')

    def mark_as_mined(self, txn_object, txn_data):
        txn_object.state = 'MINED'
        txn_object.block_number = txn_data.blockNumber

        try:
            txn_object.save()

            return Right({'txn_object': txn_object,
                          'result': f'Mined with block_number={txn_data.blockNumber}'})
        except DatabaseError as e:
            return Left('Error while saving transaction, {e}')

    def nothing_to_do(self, txn_object):
        return Right({'txn_object': txn_object, 'result': 'Transaction not mined'})

    def track_transaction(self, txn_object):
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

    def safe_track_transaction(self, txn_object):
        with transaction.atomic():
            result = self.track_transaction(txn_object)

            if isinstance(result, Left):
                transaction.set_rollback(True)

            return result

    def __call__(self):
        transactions = Transaction.objects.filter(state='SENT').order_by('nonce', 'txn_hash')

        return list(map(self.safe_track_transaction, transactions))
