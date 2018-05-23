from .get_me import GetMeView
from .get_ico_info import GetICOInfo
from .get_available_currencies import GetAvailableCurrencies
from .get_account import GetAccount
from .get_tokens_moves import GetTokensMoves
from .kyc import KYCViewSet
from .set_eth_account import SetETHAccount
from .prepare_tokens_move import PrepareTokensMove
from .get_referral_link import GetReferralLinkView
from .get_phases import GetPhases

get_me = GetMeView.as_view()
get_ico_info = GetICOInfo.as_view()
get_available_currencies = GetAvailableCurrencies.as_view()
get_account = GetAccount.as_view()
get_tokens_moves = GetTokensMoves.as_view()
set_eth_account = SetETHAccount.as_view()
prepare_tokens_move = PrepareTokensMove.as_view()
get_referral_link = GetReferralLinkView.as_view()
get_phases = GetPhases.as_view()
