import math
from oslash import Left, Right
from web3 import Web3
from eth_account import Account
from django.conf import settings

from ico_portal.utils.datetime import datetime
from user_office.models import Investor


TOKEN_PERIOD = settings.METAMASK_LOGIN_TOKEN_PERIOD


class GetMMToken:
    def round_timestamp(self, args):
        timestamp = args['timestamp']

        rounded = math.ceil(timestamp / TOKEN_PERIOD) * TOKEN_PERIOD

        return Right(dict(args, rounded_ts=rounded))

    def get_secret_key(self, args):
        return Right(dict(args, secret_key=settings.SECRET_KEY))

    def return_hash(self, args):
        text = '%s,%s' % (args['rounded_ts'], args['secret_key'])
        hashed = Web3.sha3(text=text).hex()

        return Right(hashed)

    def __call__(self, timestamp=None):
        if timestamp is None:
            timestamp = round(datetime.utcnow().timestamp())

        return Right({'timestamp': timestamp}) | \
            self.round_timestamp | \
            self.get_secret_key | \
            self.return_hash


class CheckMMSignature:
    def _check_signature(self, timestamp):
        token = GetMMToken()(timestamp).value
        recovered_accout = Account.recoverHash(message_hash=token,
                                               signature=self.signature)

        return recovered_accout == self.account

    def check_current_period(self):
        timestamp = round(datetime.utcnow().timestamp())

        return self._check_signature(timestamp)

    def check_prev_period(self):
        timestamp = round(datetime.utcnow().timestamp()) - TOKEN_PERIOD

        return self._check_signature(timestamp)

    def __call__(self, account, signature):
        self.account = Web3.toChecksumAddress(account)
        self.signature = signature

        result = self.check_current_period()

        if result is True:
            return result
        else:
            return self.check_prev_period()
