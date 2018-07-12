from oslash import Left
from decimal import Decimal
from django.db import DatabaseError
from coinpayments.api import CoinPaymentsAPI

from blockchain.ico.services import PrepareTokensMove, CalcTokensAmount, Mint
from user_office.models import Account, Payment
from ico_portal.utils.service_object import ServiceObject, service_call, transactional


class SkipIPN(Left):
    def bind(self, func):
        return SkipIPN(self._get_value())


class ProcessIPN(ServiceObject):
    def __init__(self, settings):
        self.settings = settings

    def _is_signature_valid(self, body, signature):
        api = CoinPaymentsAPI(public_key=None,
                              private_key=self.settings.ipn_secret)

        return api.check_signature(body, signature)

    def check_request(self, context):
        request = context.request
        body = request.body

        if request.method != 'POST':
            return self.fail('Invalid request method')

        if request.POST.get('merchant') != self.settings.merchant:
            return self.fail('Invalid request merchant')

        if request.POST.get('ipn_type') != 'deposit':
            return self.fail_with(SkipIPN('Invalid ipn_type'))

        status = int(request.POST.get('status'))
        if status < 100 and status != 2:
            return self.fail_with(SkipIPN('Invalid status'))

        if not self._is_signature_valid(body, request.META['HTTP_HMAC']):
            return self.fail('Invalid signature')

        return self.success()

    def find_payment_by_ipn_id(self, context):
        payments = Payment.objects.filter(external_id=context.request.POST.get('ipn_id'))

        if payments.exists():
            return self.fail_with(SkipIPN('IPN already processed'))
        else:
            return self.success()

    def find_investor(self, context):
        accounts = Account.objects.filter(address=context.request.POST.get('address'),
                                          currency=self.settings.code)

        if accounts.exists():
            return self.success(investor=accounts.first().investor)
        else:
            return self.fail('Account not found')

    def calc_tokens_amount(self, context):
        raw_amount = context.request.POST.get('amount')

        return CalcTokensAmount()(Decimal(raw_amount), self.settings.code) | \
            (lambda result: self.success(amount=result.amount, amount_wo_bonus=result.amount_wo_bonus))

    def create_transaction(self, context):
        return Mint()(to=context.investor.eth_account,
                      amount=context.amount) | \
                      (lambda result: self.success(mint_txn_id=result.transaction.txn_id))

    def create_tokens_move(self, context):
        return PrepareTokensMove()(investor=context.investor,
                                   mint_txn_id=context.mint_txn_id,
                                   currency=self.settings.code,
                                   amount=context.amount) | \
                                   (lambda result: self.success(tokens_move=result.tokens_move))

    def create_payment(self, context):
        payment = Payment(currency=self.settings.code,
                          payer_account=context.request.POST.get('address'),
                          amount=context.request.POST.get('amount'),
                          amounti=context.request.POST.get('amounti'),
                          external_id=context.request.POST.get('ipn_id'),
                          txn_id=context.request.POST.get('txn_id'),
                          tokens_move=context.tokens_move)

        try:
            payment.save()

            return self.success(payment=payment)
        except DatabaseError as e:
            return self.fail(e)

    @service_call
    @transactional
    def __call__(self, request):
        return self.success(request=request) | \
            self.check_request | \
            self.find_payment_by_ipn_id | \
            self.find_investor | \
            self.calc_tokens_amount | \
            self.create_transaction | \
            self.create_tokens_move | \
            self.create_payment
