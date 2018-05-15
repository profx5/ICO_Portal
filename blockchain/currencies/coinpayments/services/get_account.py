from oslash import Left, Right
from django.db import DatabaseError

from coinpayments.api import CoinPaymentsAPI
from user_office.models import Account


class GetAccount:
    def find_account(self, investor, currency_code):
        existing_account = investor.accounts.get_queryset().filter(currency=currency_code)

        if existing_account.exists():
            return existing_account.first()

    def get_coinpayments_account(self, args):
        settings = args['settings']

        api = CoinPaymentsAPI(public_key=settings.public_key,
                              private_key=settings.private_key)

        response = api.get_callback_address(currency=settings.code,
                                            ipn_url=settings.ipn_url)

        return Right(dict(args, response=response))

    def check_response(self, args):
        response = args['response']

        if response['error'] == 'ok' and \
           response.get('result', {}).get('address') is not None:
            return Right(dict(args, address=response['result']['address']))
        else:
            return Left(f'Invalid coinpayments api response: {response}')

    def save_account(self, args):
        account = Account(investor=args['investor'],
                          currency=args['settings'].code,
                          address=args['address'])

        try:
            account.save()

            return Right(dict(args, account=account))
        except DatabaseError as e:
            return Left(f'Got error while saving account {e}')

    def return_account(self, args):
        return Right(args['account'])

    def __call__(self, investor, settings):
        account = self.find_account(investor, settings.code)

        if account:
            return Right(account)
        else:
            return Right({'investor': investor, 'settings': settings}) | \
                self.get_coinpayments_account | \
                self.check_response | \
                self.save_account | \
                self.return_account
