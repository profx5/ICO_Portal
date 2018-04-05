from user_office.models import Investor

def create_user(username, password):
    investor = Investor(username=username)
    investor.set_password(password)

    investor.save()

def approve_kyc(username):
    investor = Investor.objects.get(username=username)

    investor.kyc.approve(call_contract=False)
    investor.kyc.save()
