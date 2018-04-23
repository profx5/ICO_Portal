from helpers import *


use_step_matcher('parse')

@when('I set "{value}" in field "{field}"')
def step_impl(context, value, field):
    input_field = get_field(context.browser, field)

    input_field.send_keys(value)

@when('I select "{option}" in field "{field}"')
def step_impl(context, option, field):
    select_option(context.browser, field, option)

@when('I press "{name}"')
def step_impl(context, name):
    button = get_element(context.browser, f'//button[contains(text(), "{name}")]', wait_sec=3)

    button.click()

@then('Title should be "{title}"')
def step_impl(context, title):
    context.test.assertEqual(context.browser.title, title)

@when('I choose file "{filename}" in field "{field}"')
def step_impl(context, filename, field):
    input_field = get_field(context.browser, field)

    input_field.send_keys(attached_file_path(filename))

@when('I check checkbox "{label}"')
def step_impl(context, label):
    input_field = get_field(context.browser, label)

    if not input_field.is_selected():
        input_field.click()

@when('I check recaptcha')
def step_impl(context):
    script = "document.getElementsByClassName('g-recaptcha')[0]" \
             ".getElementsByTagName('iframe')[0].contentWindow.document" \
             ".getElementsByClassName('recaptcha-checkbox-checkmark')[0].click()"

    context.browser.execute_script(script)

    context.test.assertTrue(wait_recapthca(context.browser, 5))

@then('I should see address "{address}"')
def step_impl(context, address):
    address_element = get_element(context.browser,
                                "//p[contains(@class, 'Header_accountId')]",
                                wait_sec=3)
    context.test.assertEqual(address_element.text, address)
