import factory
from factory import fuzzy
from datetime import timedelta, date

from ico_portal.utils.datetime import datetime
from user_office.models.kyc import KYC_DOC_TYPE_CHOICES


class FuzzyHash(fuzzy.FuzzyText):
    def __init__(self, *args, **kwargs):
        kwargs['prefix'] = '0x'
        kwargs['length'] = kwargs['length'] - 2
        kwargs['chars'] = '1234567890abcdef'

        super().__init__(*args, **kwargs)


UTCNow = factory.LazyFunction(datetime.utcnow)

CurrencyFuzzy = fuzzy.FuzzyChoice(['ETH', 'LTC', 'BTC'])


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
    account_to = FuzzyHash(length=42)
    account_from = FuzzyHash(length=42)

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

    amount = fuzzy.FuzzyDecimal(low=0, high=10000)

    transfer = factory.SubFactory(TransferFactory)
    investor = factory.SubFactory(InvestorFactory)

    state = 'ACTUAL'

    direction = 'IN'


class CurrentPhaseFactory(factory.DjangoModelFactory):
    class Meta:
        model = 'user_office.Phase'

    name = 'Current phase'
    begin_date = factory.LazyFunction(lambda: datetime.utcnow() - timedelta(days=10))
    end_date = factory.LazyFunction(lambda: datetime.utcnow() + timedelta(days=10))
    bonus_percents = fuzzy.FuzzyInteger(low=0, high=100)


class ExchangeRateFactory(factory.DjangoModelFactory):
    class Meta:
        model = 'user_office.ExchangeRate'

    currency = CurrencyFuzzy
    rate = fuzzy.FuzzyDecimal(low=0, high=10000, precision=5)
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

    state = 'APPROVED'

    firstname = fuzzy.FuzzyText(length=10)
    midname = fuzzy.FuzzyText(length=10)
    surname = fuzzy.FuzzyText(length=10)

    country = fuzzy.FuzzyText(length=10)
    birthdate = fuzzy.FuzzyDate(start_date=date(1970, 1, 1))

    document_no = fuzzy.FuzzyInteger(low=0)
    document_type = fuzzy.FuzzyChoice(c[0] for c in KYC_DOC_TYPE_CHOICES)
    photo = factory.django.ImageField(color='blue')
    selfie = factory.django.ImageField(color='green')

    approve_txn_hash = FuzzyHash(length=70)


class ICO_InfoFacotry(factory.DjangoModelFactory):
    class Meta:
        model = 'user_office.ICO_Info'

    created_at = UTCNow
    total_supply = fuzzy.FuzzyInteger(low=0)
