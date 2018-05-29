from .user_office import UserOfficeView
from .authentication import login, logout, signup
from .change_email import change_email

user_office = UserOfficeView.as_view()
