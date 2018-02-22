from .user_office import UserOfficeView
from .authentication import login, logout, signup

user_office = UserOfficeView.as_view()
