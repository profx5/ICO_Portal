from .get_me import GetMeView
from .get_ico_info import GetICOInfo
#from .get_available_currencies import GetAvailableCurrencies
#from .get_account import GetAccount
from .get_deposits import GetDeposits
from .kyc import KYCViewSet
from .set_eth_account import SetEthAccount
from .prepare_deposit import PrepareDeposit
from .get_referral_link import GetReferralLinkView

get_me = GetMeView.as_view()
get_ico_info = GetICOInfo.as_view()
# get_available_currencies = GetAvailableCurrencies.as_view()
# get_account = GetAccount.as_view()
get_deposits = GetDeposits.as_view()
set_eth_account = SetEthAccount.as_view()
prepare_deposit= PrepareDeposit.as_view()
get_referral_link = GetReferralLinkView.as_view()
