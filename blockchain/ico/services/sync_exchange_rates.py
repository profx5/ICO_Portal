import requests
from json import JSONDecodeError
from oslash import Left, Right
from django.db import DatabaseError

from user_office.models import ExchangeRate


class SyncExchangeRates:
    url_pattern = 'https://api.cryptonator.com/api/ticker/%s-usd/'

    def get_rate(self, args):
        url = self.url_pattern % args['currency'].lower()

        response = requests.get(url)

        if response.status_code != 200:
            return Left(f'Invalid response code {response.status_code} from rates api')

        try:
            json = response.json()
        except JSONDecodeError:
            return Left(f'Invalid response from exchange api')

        if not json:
            return Left(f'Invalid response {response.content} from rates api')

        if not json.get('success'):
            return Left(f'Invalid response data {json} from rates api')

        try:
            rate = json['ticker']['price']
            timestamp = json['timestamp']

            return Right(dict(args, rate=rate, timestamp=timestamp))
        except KeyError:
            return Left(f'Invalid response data {json} from rates api')

    def create_object(self, args):
        obj = ExchangeRate(currency=args['currency'].upper(),
                           rate=args['rate'],
                           timestamp=args['timestamp'])

        try:
            obj.save()

            return Right(dict(args, obj=obj))
        except DatabaseError as e:
            return Left(f'Error while saving ExchangeRate object {e}')

    def sync_exchange_rate(self, currency):
        return Right({'currency': currency}) | \
            self.get_rate | \
            self.create_object

    def __call__(self, currencies_list):
        return {c: self.sync_exchange_rate(c) for c in currencies_list}
