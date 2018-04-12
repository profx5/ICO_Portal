from user_office.models import Investor

def create_user(email, password):
    investor = Investor(email=email, is_active=True)
    investor.set_password(password)

    investor.save()

def approve_kyc(email):
    investor = Investor.objects.get(email=email)

    investor.kyc.approve(call_contract=False)
    investor.kyc.save()
