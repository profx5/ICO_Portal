# flake8: noqa
from .user_office import UserOfficeView
from .authentication import login, logout, signup, password_reset_form, \
    password_reset_done, password_reset_confirm, password_reset_complete
from .change_email import change_email
from .media import serve_media

user_office = UserOfficeView.as_view()
