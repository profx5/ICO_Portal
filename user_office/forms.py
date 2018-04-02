from django import forms
from django.contrib.auth.forms import UserCreationForm
from user_office.models import Investor


class SignUpForm(UserCreationForm):
    username = forms.CharField(max_length=30, required=True)
    eth_account = forms.CharField(max_length=42, required=False, empty_value=None)

    class Meta:
        model = Investor
        fields = ('username', 'eth_account', 'password1', 'password2', )
