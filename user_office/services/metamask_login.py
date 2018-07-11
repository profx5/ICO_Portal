import math
from web3 import Web3
from eth_account import Account
from django.conf import settings

from ico_portal.utils.datetime import datetime
from ico_portal.utils.service_object import service_call, ServiceObject


TOKEN_PERIOD = settings.METAMASK_LOGIN_TOKEN_PERIOD


class GetMMToken(ServiceObject):
    def round_timestamp(self, context):
        timestamp = context.timestamp

        rounded = math.ceil(timestamp / TOKEN_PERIOD) * TOKEN_PERIOD

        return self.success(rounded_ts=rounded)

    def get_secret_key(self, context):
        return self.success(secret_key=settings.SECRET_KEY)

    def return_token(self, context):
        text = '%s,%s' % (context.rounded_ts, context.secret_key)
        hashed = Web3.sha3(text=text).hex()

        return self.success(token=hashed)

    @service_call
    def __call__(self, timestamp=None):
        if timestamp is None:
            timestamp = round(datetime.utcnow().timestamp())

        return self.success(timestamp=timestamp) | \
            self.round_timestamp | \
            self.get_secret_key | \
            self.return_token


class CheckMMSignature(ServiceObject):
    def _check_signature(self, timestamp):
        token = GetMMToken()(timestamp).value.token
        recovered_accout = Account.recoverHash(message_hash=token,
                                               signature=self.signature)

        return recovered_accout == self.account

    def check_current_period(self):
        timestamp = round(datetime.utcnow().timestamp())

        return self._check_signature(timestamp)

    def check_prev_period(self):
        timestamp = round(datetime.utcnow().timestamp()) - TOKEN_PERIOD

        return self._check_signature(timestamp)

    @service_call
    def __call__(self, account, signature):
        self.account = Web3.toChecksumAddress(account)
        self.signature = signature

        result = self.check_current_period()

        if result is True:
            return result
        else:
            return self.check_prev_period()
