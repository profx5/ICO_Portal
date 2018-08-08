from django.contrib.auth.views import PasswordResetView as PasswordResetViewBase, \
    PasswordResetDoneView as PasswordResetDoneViewBase, \
    PasswordResetConfirmView as PasswordResetConfirmViewBase, \
    PasswordResetCompleteView as PasswordResetCompleteViewBase
from django.conf import settings


class PasswordResetView(PasswordResetViewBase):
    html_email_template_name = 'authentication/password_reset_email.html'
    email_template_name = 'authentication/password_reset_email.html'
    subject_template_name = 'authentication/password_reset_subject.txt'
    template_name = 'authentication/password_reset_form.html'

    extra_context = {'domain': settings.HOST}


class PasswordResetDoneView(PasswordResetDoneViewBase):
    template_name = 'authentication/password_reset_done.html'


class PasswordResetConfirmView(PasswordResetConfirmViewBase):
    template_name = 'authentication/password_reset_confirm.html'


class PasswordResetCompleteView(PasswordResetCompleteViewBase):
    template_name = 'authentication/password_reset_complete.html'
