from helpers import *
from behave import *


use_step_matcher('parse')

@given('investor {email}/{password}')
def step_impl(context, email, password):
    create_user(email, password)

@given('logged in as {email}/{password}')
def step_impl(context, email, password):
    context.browser.delete_all_cookies()

    context.browser.get(context.get_url('/login/'))

    form = context.browser.find_element_by_tag_name('form')

    form.find_element_by_id('email').send_keys(email)
    form.find_element_by_id('password').send_keys(password)

    form.submit()

    context.test.assertTrue(is_logged_in(context.browser))

@when('I visit "{url}"')
def step_impl(context, url):
    full_path = context.get_url(url)

    context.browser.get(full_path)

@when('I refresh page')
def step_impl(context):
    context.browser.refresh()
