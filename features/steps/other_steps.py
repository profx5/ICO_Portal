from decimal import Decimal
from behave import use_step_matcher, then, when, given
from time import sleep

from features.steps.helpers import take_screenshot, is_logged_in, approve_kyc, \
    create_exchange_rate, create_ico_info, create_phase, create_investor


use_step_matcher('parse')


@then('I take screenshot')
def step_impl(context):
    take_screenshot(context.browser)


@when('I start debug')
def step_impl(context):
    import ipdb; ipdb.set_trace()


@then('I start debug')
def step_impl(context):
    import ipdb; ipdb.set_trace()


@then('I should be logged in')
def step_impl(context):
    context.test.assertTrue(is_logged_in(context.browser))


@then('I should be logged out')
def step_impl(context):
    context.test.assertFalse(is_logged_in(context.browser))


@when('Admin approve KYC for user "{email}"')
def step_impl(context, email):
    approve_kyc(email)


@when('I wait a little bit')
def step_impl(context):
    sleep(1)


@given('exchange rate for currency "{currency}" with rate "{rate}"')
def step_impl(context, currency, rate):
    create_exchange_rate(currency, rate)


@given('ico info with total supply "{total_supply}"')
def step_impl(context, total_supply):
    create_ico_info(Decimal(total_supply))


@given('phase with name "{name}" and bonus "{bonus}%"')
def step_impl(context, name, bonus):
    create_phase(name, bonus)


@given('investor {email}/{password}')
def step_impl(context, email, password):
    context.investor = create_investor(email, password)


@given('investor has eth account "{address}"')
def step_impl(context, address):
    context.investor.eth_account = address
    context.investor.save()
