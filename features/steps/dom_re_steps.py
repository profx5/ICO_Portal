from features.steps.helpers import *

use_step_matcher('re')


@then('I should see "(?P<value>[^\"]*)" in field "(?P<field>[^\"]*)"')
def step_impl(context, value, field):
    input_field = get_field(context.browser, field)

    context.test.assertEqual(input_field.get_attribute('value'), value)


@then('I should see "(?P<text>[^\"]*)"')
def step_impl(context, text):
    element = get_element(context.browser, f'//*[contains(text(), "{text}")]',
                          wait_sec=3, raise_error=False)

    context.test.assertIsNotNone(element, f'Element with text {text} not found')


@then('I should not see (?P<text>"[^\"]*")')
def step_impl(context, text):
    element = is_element_not_exist(context.browser, f'//*[contains(text(), "{text}")]',
                                   wait_sec=3)

    context.test.assertTrue(element, f'Found element with text {text}')
