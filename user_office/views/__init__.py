from .login import LoginView
from .signup import SignUpView
from .logout import logout
from .user_office import UserOfficeView

login = LoginView.as_view()
signup = SignUpView.as_view()
user_office = UserOfficeView.as_view()
