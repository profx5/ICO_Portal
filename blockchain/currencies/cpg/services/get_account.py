import requests
from django.db import DatabaseError
from urllib.parse import urljoin

from ico_portal.utils.service_object import ServiceObject, service_call
from user_office.models import Account


class GetAccount(ServiceObject):
    def find_account(self, investor, currency_code):
        existing_account = investor.accounts.get_queryset().filter(currency=currency_code)

        if existing_account.exists():
            return existing_account.first()

    def get_cpg_account(self, context):
        response = requests.post(
            urljoin(context.settings.cpg_url, '/api/get_account/'),
            data={'notify_url': context.settings.ipn_url},
            headers={'CPG_API_KEY': context.settings.api_key}
        )

        return self.success(response=response.json())

    def check_response(self, context):
        response = context.response

        if response['success'] and response.get('account')is not None:
            return self.success(address=response['account'])
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
                self.get_cpg_account | \
                self.check_response | \
                self.save_account
