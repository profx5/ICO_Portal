from oslash import Nothing
from django.db import DatabaseError
from web3 import Web3

from blockchain.ico.contracts import CrowdsaleContract
from user_office.models import Payment
from ico_portal.utils.service_object import ServiceObject, service_call


class ProcessPurchase(ServiceObject):
    @service_call
    def __call__(self, tokens_move):
        txn_hash = tokens_move.transfer.txn_hash

        result = CrowdsaleContract().get_event_from_txn_hash(txn_hash)

        if isinstance(result, Nothing):
            return self.success(payment=None)
        else:
            event = result.value

            payment = Payment(currency='ETH',
                              payer_account=event.investor,
                              amount=Web3.fromWei(event.wei_amount, 'ether'),
                              amounti=event.wei_amount,
                              txn_id=event.txn_hash,
                              tokens_move=tokens_move)

            try:
                payment.save()

                return self.success(payment=payment)
            except DatabaseError as e:
                return self.fail(e)
