from django.db import DatabaseError
from decimal import Decimal

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
    def __init__(self, settings):
        self.settings = settings

    def check_duplicate(self, context):
        payment = Payment.objects.filter(currency=self.settings.code,
                                         txn_id=context.event.txn_hash)

        if payment.exists():
            return self.fail(f'Payment with txn_id={context.event.txn_hash} is already processed')
        else:
            return self.success()

    def find_investor(self, context):
        investor = Investor.objects.filter(eth_account=context.event.from_account).first()

        if investor:
            return self.success(investor=investor)
        else:
            return self.fail(f'Investor with {context.event.from_account} address not found!')

    def calc_usd_value(self, context):
        amounti = Decimal(context.event.amount)

        amount = amounti / 10 ** self.settings.contract['decimals']
        rate_usdc = self.settings.rate_usdc

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
                                   currency=self.settings.code) | \
                                   (lambda result: self.success(tokens_move=result.tokens_move))

    def create_payment(self, context):
        payment = Payment(currency=self.settings.code,
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
            self.check_duplicate | \
            self.find_investor | \
            self.calc_usd_value | \
            self.create_transaction | \
            self.create_tokens_move | \
            self.create_payment
