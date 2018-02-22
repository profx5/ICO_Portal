from .login import LoginView
from .signup import SignUpView
from .logout import logout

login = LoginView.as_view()
signup = SignUpView.as_view()
