from django.conf import settings
from django.db import DatabaseError

from user_office.models import (
    Investor,
    Payment
)
from ico_portal.utils.service_object import (
    ServiceObject,
    service_call,
    transactional
)
from blockchain.ico.services import (
    BuyTokens,
    PrepareTokensMove
)


class ProcessDAITransfer(ServiceObject):
    def find_investor(self, context):
        investor = Investor.objects.filter(eth_account=context.event.from_account).first()

        if investor:
            return self.success(investor=investor)
        else:
            return self.fail(f'Investor with {context.event.from_account} address not found!')

    def calc_usd_value(self, context):
        amount = context.event.amount
        amounti = amount * 10 ** 18
        rate_usdc = settings.CURRENCIES['DAI']['rate_usdc']

        usdc_value = amount * rate_usdc

        return self.success(
            usdc_value=usdc_value,
            rate_usdc=rate_usdc,
            amount=amount,
            amounti=amounti
        )

    def create_transaction(self, context):
        return BuyTokens()(to=context.investor.eth_account,
                           usdc_value=context.usdc_value) | \
                           (lambda result: self.success(buy_txn_id=result.transaction.txn_id))

    def create_tokens_move(self, context):
        return PrepareTokensMove()(investor=context.investor,
                                   buy_txn_id=context.buy_txn_id,
                                   currency='DAI') | \
                                   (lambda result: self.success(tokens_move=result.tokens_move))

    def create_payment(self, context):
        payment = Payment(currency='DAI',
                          amount=context.amount,
                          amounti=context.amounti,
                          txn_id=context.event.txn_hash,
                          tokens_move=context.tokens_move,
                          usdc_value=context.usdc_value,
                          rate_usdc=context.rate_usdc,
                          external_id=context.event.txn_hash)

        try:
            payment.save()

            return self.success(payment=payment)
        except DatabaseError as e:
            return self.fail(e)

    @service_call
    @transactional
    def __call__(self, event):
        return self.success(event=event) | \
            self.find_investor | \
            self.calc_usd_value | \
            self.create_transaction | \
            self.create_tokens_move | \
            self.create_payment
