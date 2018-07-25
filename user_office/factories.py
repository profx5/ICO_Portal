import factory
from factory import fuzzy
from datetime import timedelta, date
from uuid import uuid4

from ico_portal.utils.datetime import datetime


class FuzzyHash(fuzzy.FuzzyText):
    def __init__(self, *args, **kwargs):
        kwargs['prefix'] = '0x'
        kwargs['length'] = kwargs['length'] - 2
        kwargs['chars'] = '1234567890abcdef'

        super().__init__(*args, **kwargs)


UTCNow = factory.LazyFunction(datetime.utcnow)
CurrencyFuzzy = fuzzy.FuzzyChoice(['ETH', 'LTC', 'BTC'])
AmountFuzzy = fuzzy.FuzzyDecimal(low=0, high=10000000, precision=0)
UUID = factory.LazyFunction(uuid4)


class InvestorFactory(factory.DjangoModelFactory):
    class Meta:
        model = 'user_office.Investor'

    email = fuzzy.FuzzyText(length=5, suffix='@ongrid.pro')
    is_active = True
    eth_account = FuzzyHash(length=42)


class TransferFactory(factory.DjangoModelFactory):
    class Meta:
        model = 'user_office.Transfer'

    txn_hash = FuzzyHash(length=70)
    to_account = FuzzyHash(length=42)
    from_account = FuzzyHash(length=42)

    block_hash = FuzzyHash(length=66)
    block_number = fuzzy.FuzzyInteger(low=0)

    created_at = UTCNow
    actualized_at = UTCNow

    state = 'ACTUAL'


class TokensMoveFactory(factory.DjangoModelFactory):
    class Meta:
        model = 'user_office.TokensMove'

    created_at = UTCNow
    actualized_at = UTCNow

    amount = AmountFuzzy

    transfer = factory.SubFactory(TransferFactory)
    investor = factory.SubFactory(InvestorFactory)

    state = 'ACTUAL'

    direction = 'IN'


class PhaseFactory(factory.DjangoModelFactory):
    class Meta:
        model = 'user_office.Phase'

    name = 'Current phase'
    begin_date = factory.LazyFunction(lambda: datetime.utcnow() - timedelta(days=10))
    end_date = factory.LazyFunction(lambda: datetime.utcnow() + timedelta(days=10))
    bonus_percents = fuzzy.FuzzyInteger(low=0, high=100)
    hard_cap = fuzzy.FuzzyInteger(low=0)


class ExchangeRateFactory(factory.DjangoModelFactory):
    class Meta:
        model = 'user_office.ExchangeRate'

    currency = CurrencyFuzzy
    rate = fuzzy.FuzzyDecimal(low=0, high=10000, precision=5)
    rate_cents = factory.LazyAttribute(lambda o: o.rate * 100)
    timestamp = factory.LazyFunction(lambda: int(datetime.utcnow().timestamp()))


class AccountFactory(factory.DjangoModelFactory):
    class Meta:
        model = 'user_office.Account'

    investor = factory.SubFactory(InvestorFactory)
    currency = CurrencyFuzzy
    address = fuzzy.FuzzyText(length=20)


class PaymentFactory(factory.DjangoModelFactory):
    class Meta:
        model = 'user_office.Payment'

    currency = CurrencyFuzzy

    payer_account = fuzzy.FuzzyText(length=20)

    amount = fuzzy.FuzzyDecimal(low=0, high=1000000)
    amounti = fuzzy.FuzzyDecimal(low=0, high=1000000)

    external_id = fuzzy.FuzzyText(length=20)
    txn_id = FuzzyHash(length=40)

    tokens_move = factory.SubFactory(TokensMoveFactory)


class KYCFactory(factory.DjangoModelFactory):
    class Meta:
        model = 'user_office.KYC'

    investor = factory.SubFactory(InvestorFactory)
    approve_txn_id = UUID

    state = 'APPROVED'
    type = 'NATURAL'

    firstname = fuzzy.FuzzyText(length=10)
    lastname = fuzzy.FuzzyText(length=10)

    place_of_birth = fuzzy.FuzzyText(length=10)
    birthdate = fuzzy.FuzzyDate(start_date=date(1970, 1, 1))

    personal_id = fuzzy.FuzzyText(length=10)
    phone_number = fuzzy.FuzzyInteger(low=1, high=10000000)
    email = fuzzy.FuzzyText(length=5, suffix='@ongrid.pro')

    place_of_residence = fuzzy.FuzzyText(length=10)
    profession = fuzzy.FuzzyText(length=10)

    approve_txn_id = UUID


class ICO_InfoFacotry(factory.DjangoModelFactory):
    class Meta:
        model = 'user_office.ICO_Info'

    created_at = UTCNow
    total_supply = fuzzy.FuzzyInteger(low=0)


class TransactionFactory(factory.DjangoModelFactory):
    class Meta:
        model = 'user_office.Transaction'

    data = fuzzy.FuzzyText(length=10)

    gas = fuzzy.FuzzyInteger(low=21000)
    txn_hash = FuzzyHash(length=42)

    state = 'SENT'

    created_at = UTCNow
    txn_id = UUID
