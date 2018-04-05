from helpers import *


use_step_matcher('parse')

@when('I set "{value}" in field "{field}"')
def step_impl(context, value, field):
    input_field = get_input_field(context.browser, field)

    input_field.send_keys(value)

@when('I press "{name}"')
def step_impl(context, name):
    button = get_element(context.browser, f'//button[contains(text(), "{name}")]', wait_sec=3)

    button.click()

@then('Title should be "{title}"')
def step_impl(context, title):
    context.test.assertEqual(context.browser.title, title)

@when('I choose file "{filename}" in field "{field}"')
def step_impl(context, filename, field):
    input_field = get_input_field(context.browser, field)

    input_field.send_keys(helpers.attached_file_path(filename))

@when('I check checkbox "{label}"')
def step_impl(context, label):
    input_field = get_input_field(context.browser, label)

    if not input_field.is_selected():
        input_field.click()
