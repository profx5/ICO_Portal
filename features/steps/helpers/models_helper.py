from datetime import datetime, timedelta
from decimal import Decimal

from user_office.models import Investor
from user_office.factories import ExchangeRateFactory, ICO_InfoFactory, PhaseFactory


def create_investor(email, password):
    investor = Investor(email=email, is_active=True)
    investor.set_password(password)

    investor.save()

    return investor


def approve_kyc(email):
    kyc = Investor.objects.get(email=email).kyc

    kyc.state = 'APPROVED'

    kyc.save()


def create_ico_info(total_supply):
    ICO_InfoFactory(total_supply=Decimal(total_supply))


def create_exchange_rate(currency, rate):
    ExchangeRateFactory(currency=currency, rate=rate)


def create_phase(name, bonus, hard_cap=Decimal(100)):
    PhaseFactory(
        name=name,
        begin_date=datetime.today() - timedelta(days=1),
        end_date=datetime.today() + timedelta(days=1),
        bonus_percents=bonus,
        hard_cap=Decimal(120)
    )
