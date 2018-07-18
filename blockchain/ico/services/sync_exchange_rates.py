import requests
from json import JSONDecodeError
from django.db import DatabaseError
from decimal import Decimal, ROUND_HALF_UP

from user_office.models import ExchangeRate
from ico_portal.utils.service_object import ServiceObject, service_call


class SyncExchangeRates(ServiceObject):
    url_pattern = 'https://api.cryptonator.com/api/ticker/%s-usd/'

    def get_rate(self, context):
        url = self.url_pattern % context.currency.lower()

        response = requests.get(url)

        if response.status_code != 200:
            return self.fail(f'Invalid response code {response.status_code} from rates api')

        try:
            json = response.json()
        except JSONDecodeError:
            return self.fail(f'Invalid response from exchange api')

        if not json:
            return self.fail(f'Invalid response {response.content} from rates api')

        if not json.get('success'):
            return self.fail(f'Invalid response data {json} from rates api')

        try:
            rate = Decimal(json['ticker']['price']).quantize(Decimal('1.00'), rounding=ROUND_HALF_UP)
            timestamp = json['timestamp']
            rate_cents = rate * 100

            return self.success(rate=rate, timestamp=timestamp, rate_cents=rate_cents)
        except KeyError:
            return self.fail(f'Invalid response data {json} from rates api')

    def create_object(self, context):
        obj = ExchangeRate(currency=context.currency.upper(),
                           rate=context.rate,
                           rate_cents=context.rate_cents,
                           timestamp=context.timestamp)

        try:
            obj.save()

            return self.success(obj=obj)
        except DatabaseError as e:
            return self.fail(e)

    @service_call
    def sync(self, currency):
        return self.success(currency=currency) | \
            self.get_rate | \
            self.create_object

    def __call__(self, currencies_list):
        self.logger.debug(f'Currencies list: {currencies_list}')

        return {c: self.sync(c) for c in currencies_list}
