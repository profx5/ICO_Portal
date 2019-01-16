from selenium.webdriver import Chrome
from steps import helpers
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.chrome.options import Options


BEHAVE_DEBUG_ON_ERROR = False


def setup_debug_on_error(userdata):
    global BEHAVE_DEBUG_ON_ERROR
    BEHAVE_DEBUG_ON_ERROR = userdata.getbool("BEHAVE_DEBUG_ON_ERROR")


def get_chrome_options(userdata):
    chrome_options = Options()

    chrome_options.add_argument('--disable-web-security')

    if userdata.getbool("SELENIUM_CHROME_HEADLESS"):
        chrome_options.set_headless()

    return chrome_options


def before_all(context):
    setup_debug_on_error(context.config.userdata)

    desired = DesiredCapabilities.CHROME
    desired['loggingPrefs'] = {'browser': 'ALL'}

    options = get_chrome_options(context.config.userdata)

    context.browser = Chrome(desired_capabilities=desired,
                             options=options)


def after_all(context):
    context.browser.quit()
    context.browser = None


def after_step(context, step):
    if step.status == "failed":
        helpers.take_screenshot(context.browser, step)

        if BEHAVE_DEBUG_ON_ERROR:
            import ipdb; ipdb.post_mortem(step.exc_traceback)
