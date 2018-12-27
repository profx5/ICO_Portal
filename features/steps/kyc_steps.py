from behave import use_step_matcher, when, then

from features.steps.helpers import get_element, ac_click


@when('I set PEP field to "{value}"')
def step_impl(context, value):
    assert value in ["Yes", "No"]

    element = get_element(context.browser, f'//p[contains(text(), "Are you a")]/..//label[@for="radio-{value}"]')

    ac_click(context.browser, element)
