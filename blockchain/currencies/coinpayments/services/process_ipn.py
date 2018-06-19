from oslash import Left, Right
from decimal import Decimal
from django.db import transaction, DatabaseError
from coinpayments.api import CoinPaymentsAPI

from blockchain.ico.contracts import TokenContract
from blockchain.ico.services import PrepareTokensMove, CalcTokensAmount, Mint
from user_office.models import Account, Payment


class SkipIPN(Left):
    def bind(self, func):
        return SkipIPN(self._get_value())


class ProcessIPN:
    def __init__(self, settings):
        self.settings = settings

    def _is_signature_valid(self, body, signature):
        api = CoinPaymentsAPI(public_key=None,
                              private_key=self.settings.ipn_secret)

        return api.check_signature(body, signature)

    def check_request(self, args):
        request = args['request']

        body = request.body

        if request.method != 'POST':
            return Left('Invalid request method')

        if request.POST.get('merchant') != self.settings.merchant:
            return Left('Invalid request merchant')

        if request.POST.get('ipn_type') != 'deposit':
            return SkipIPN('Invalid ipn_type')

        status = int(request.POST.get('status'))
        if status < 100 and status != 2:
            return SkipIPN('Invalid status')

        if not self._is_signature_valid(body, request.META['HTTP_HMAC']):
            return  Left('Invalid signature')

        return Right(dict(args, request_data=request.POST))

    def find_payment_by_ipn_id(self, args):
        payments = Payment.objects.filter(external_id=args['request_data']['ipn_id'])

        if payments.exists():
            return SkipIPN('IPN already processed')
        else:
            return Right(args)

    def find_investor(self, args):
        accounts = Account.objects.filter(address=args['request_data']['address'],
                                          currency=self.settings.code)

        if accounts.exists():
            return Right(dict(args, investor=accounts.first().investor))
        else:
            return Left('Account not found')

    def calc_tokens_amount(self, args):
        service = CalcTokensAmount()
        raw_amount = args['request_data']['amount']

        return service(Decimal(raw_amount), self.settings.code) | \
            (lambda result: Right(dict(args,
                                       amount=result[0],
                                       amount_wo_bonus=result[1])))

    def create_transaction(self, args):
        return Mint()(to=args['investor'].eth_account,
                      amount=args['amount']) | \
                      (lambda txn_id: Right(dict(args, mint_txn_id=txn_id)))

    def create_tokens_move(self, args):
        return PrepareTokensMove()(investor=args['investor'],
                                   mint_txn_id=args['mint_txn_id'],
                                   currency=self.settings.code,
                                   amount=args['amount']) | \
                                   (lambda result: Right(dict(args, tokens_move=result['tokens_move'])))

    def create_payment(self, args):
        payment = Payment(currency=self.settings.code,
                          payer_account=args['request_data']['address'],
                          amount=args['request_data']['amount'],
                          amounti=args['request_data']['amounti'],
                          external_id=args['request_data']['ipn_id'],
                          txn_id=args['request_data']['txn_id'],
                          tokens_move=args['tokens_move'])

        try:
            payment.save()

            return Right(dict(args, payment=payment))
        except DatabaseError as e:
            return Left(f'Error while saving Payment {e}')

    def __call__(self, request):
        with transaction.atomic():
            result = Right({'request': request}) | \
                     self.check_request | \
                     self.find_payment_by_ipn_id | \
                     self.find_investor | \
                     self.calc_tokens_amount | \
                     self.create_transaction | \
                     self.create_tokens_move | \
                     self.create_payment

            if isinstance(result, Left):
                transaction.set_rollback(True)

            return result
