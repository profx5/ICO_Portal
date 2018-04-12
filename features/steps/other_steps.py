from helpers import *
from behave import *


use_step_matcher('parse')

@then('I take screenshot')
def step_impl(context):
    take_screenshot(context.browser)

@when('I start debug')
def step_impl(context):
    import ipdb;ipdb.set_trace()

@then('I start debug')
def step_impl(context):
    import ipdb;ipdb.set_trace()

@then('I should be logged in')
def step_impl(context):
    context.test.assertTrue(is_logged_in(context.browser))

@then('I should be logged out')
def step_impl(context):
    context.test.assertFalse(is_logged_in(context.browser))

@when('Admin approve KYC for user "{email}"')
def step_impl(context, email):
    approve_kyc(email)
