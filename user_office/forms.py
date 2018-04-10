from django import forms
from django.contrib.auth.forms import UserCreationForm
from user_office.models import Investor


class SignUpForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = Investor
        fields = ('email', 'password1', 'password2', )
