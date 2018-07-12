from django.db import DatabaseError

from ico_portal.utils.service_object import ServiceObject, service_call
from coinpayments.api import CoinPaymentsAPI
from user_office.models import Account


class GetAccount(ServiceObject):
    def find_account(self, investor, currency_code):
        existing_account = investor.accounts.get_queryset().filter(currency=currency_code)

        if existing_account.exists():
            return existing_account.first()

    def get_coinpayments_account(self, context):
        api = CoinPaymentsAPI(public_key=context.settings.public_key,
                              private_key=context.settings.private_key)

        response = api.get_callback_address(currency=context.settings.code,
                                            ipn_url=context.settings.ipn_url)

        return self.success(response=response)

    def check_response(self, context):
        response = context.response

        if response['error'] == 'ok' and \
           response.get('result', {}).get('address') is not None:
            return self.success(address=response['result']['address'])
        else:
            return self.fail(f'Invalid coinpayments api response: {response}')

    def save_account(self, context):
        account = Account(investor=context.investor,
                          currency=context.settings.code,
                          address=context.address)

        try:
            account.save()

            return self.success(account=account)
        except DatabaseError as e:
            return self.fail(e)

    @service_call
    def __call__(self, investor, settings):
        account = self.find_account(investor, settings.code)

        if account:
            return self.success(account=account)
        else:
            return self.success(investor=investor, settings=settings) | \
                self.get_coinpayments_account | \
                self.check_response | \
                self.save_account
