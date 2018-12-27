from behave import use_step_matcher, when, then

from features.steps.helpers import get_element, get_field, select_option, \
    attached_file_path, wait_recapthca, ac_click


use_step_matcher('parse')


@when('I set "{value}" in field "{field}"')
def step_impl(context, value, field):
    input_field = get_field(context.browser, field)

    input_field.send_keys(value)


@when('I clear input in field "{field}"')
def step_impl(context, field):
    input_field = get_field(context.browser, field)

    input_field.clear()


@when('I select "{option}" in field "{field}"')
def step_impl(context, option, field):
    select_option(context.browser, field, option)


@when('I press "{name}"')
def step_impl(context, name):
    element = get_element(context.browser, f'//*[contains(text(), "{name}")]', wait_sec=3)

    ac_click(context.browser, element)


@then('Title should be "{title}"')
def step_impl(context, title):
    context.test.assertEqual(context.browser.title, title)


@when('I choose file "{filename}" in field "{field}"')
def step_impl(context, filename, field):
    input_field = get_field(context.browser, field)

    input_field.send_keys(attached_file_path(filename))


@when('I check checkbox "{label}"')
def step_impl(context, label):
    element = get_field(context.browser, label)

    ac_click(context.browser, element)


@when('I agree to the Terms and Conditions')
def stem_impl(context):
    script = "$(document.getElementsByClassName('Signup_checkboxLabel')).click();"

    return context.browser.execute_script(script)


@when('I check recaptcha')
def step_impl(context):
    script = "document.getElementsByClassName('g-recaptcha')[0]" \
             ".getElementsByTagName('iframe')[0].contentWindow.document" \
             ".getElementsByClassName('recaptcha-checkbox-checkmark')[0].click()"

    context.browser.execute_script(script)

    context.test.assertTrue(wait_recapthca(context.browser, 5))


@when('I close modal window')
def step_impl(context):
    icon = get_element(context.browser, '//img[contains(@src, "icon_close")]')

    ac_click(context.browser, icon)
