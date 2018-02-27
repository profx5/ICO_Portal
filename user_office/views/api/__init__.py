from .get_me import GetMeView
from .get_ico_phase_stats import GetICOPhaseStats
from .get_available_currencies import GetAvailableCurrencies
from .get_account import GetAccount
from .get_deposits import GetDeposits
from .process_transaction import ProcessTransaction

get_me = GetMeView.as_view()
get_ico_phase_stats = GetICOPhaseStats.as_view()
get_available_currencies = GetAvailableCurrencies.as_view()
get_account = GetAccount.as_view()
get_deposits = GetDeposits.as_view()
process_transaction = ProcessTransaction.as_view()
