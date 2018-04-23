from datetime import datetime, timedelta

from user_office.models import Investor, ICO_Info, Phase
from user_office.services import ApproveKYC

def create_investor(email, password):
    investor = Investor(email=email, is_active=True)
    investor.set_password(password)

    investor.save()

    return investor

def approve_kyc(email):
    kyc = Investor.objects.get(email=email).kyc

    service = ApproveKYC(call_contract=False)

    service(kyc)

def create_ico_info(usd_per_eth, total_supply=0):
    ico_info = ICO_Info(usd_c_per_eth=usd_per_eth,
                        total_supply=total_supply)

    ico_info.save()

def create_phase(name, bonus):
    phase = Phase(name=name,
                  begin_date=datetime.today() - timedelta(days=1),
                  end_date=datetime.today() + timedelta(days=1),
                  bonus_percents=bonus)

    phase.save()
