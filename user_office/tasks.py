from celery import shared_task
from celery.utils.log import get_task_logger
from django.core.mail import send_mail as django_send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings


logger = get_task_logger(__name__)


@shared_task
def send_mail(subject, receiver, template, context):
    html_content = render_to_string(template, context)
    text_content = strip_tags(html_content)

    django_send_mail(
        subject,
        text_content,
        settings.DEFAULT_FROM_EMAIL,
        [receiver],
        html_message=html_content
    )

    logger.info(f'Sent mail to {receiver} with subject {subject}')


@shared_task
def send_support_email(subject, template, context):
    send_mail.apply(subject, settings.SUPPORT_EMAIL, template, context)
