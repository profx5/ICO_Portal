from django.db import DatabaseError
from web3 import Web3

from user_office.models import Payment
from ico_portal.utils.service_object import ServiceObject, service_call


class ProcessPurchase(ServiceObject):
    @service_call
    def __call__(self, tokens_move, event):
        if tokens_move.payment.exists():
            payment = tokens_move.payment.first()

            payment.bonus_percent = event.bonus_percent
            payment.bonus_ids = event.bonus_ids
        else:
            payment = Payment(currency='ETH',
                              payer_account=event.investor,
                              amount=Web3.fromWei(event.value, 'ether'),
                              amounti=event.value,
                              txn_id=event.txn_hash,
                              tokens_move=tokens_move,
                              usdc_value=event.value_in_cents,
                              rate_usdc=event.eth_price_in_cents,
                              bonus_percent=event.bonus_percent,
                              bonus_ids=event.bonus_ids)

        try:
            payment.save()

            return self.success(payment=payment)
        except DatabaseError as e:
            return self.fail(e)
