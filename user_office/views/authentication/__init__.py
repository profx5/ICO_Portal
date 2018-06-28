from .login import LoginView
from .signup import SignUpView
from .logout import logout
from .password_reset import PasswordResetView, PasswordResetDoneView, \
    PasswordResetConfirmView, PasswordResetCompleteView

login = LoginView.as_view()
signup = SignUpView.as_view()
password_reset_form = PasswordResetView.as_view()
password_reset_done = PasswordResetDoneView.as_view()
password_reset_confirm = PasswordResetConfirmView.as_view()
password_reset_complete = PasswordResetCompleteView.as_view()
