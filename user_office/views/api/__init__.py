from .get_me import GetMeView
from .get_ico_phase_stats import GetICOPhaseStats

get_me = GetMeView.as_view()
get_ico_phase_stats = GetICOPhaseStats.as_view()
