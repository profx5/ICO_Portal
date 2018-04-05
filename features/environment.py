from selenium.webdriver import Chrome
from steps import helpers
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

BEHAVE_DEBUG_ON_ERROR = False

def setup_debug_on_error(userdata):
    global BEHAVE_DEBUG_ON_ERROR
    BEHAVE_DEBUG_ON_ERROR = userdata.getbool("BEHAVE_DEBUG_ON_ERROR")

def before_all(context):
    setup_debug_on_error(context.config.userdata)
    desired = DesiredCapabilities.CHROME
    desired['loggingPrefs'] = {'browser':'ALL'}
    context.browser = Chrome(desired_capabilities=desired)

def after_all(context):
    context.browser.quit()
    context.browser = None

def after_step(context, step):
    if step.status == "failed":
        helpers.take_screenshot(context.browser, step)

        if BEHAVE_DEBUG_ON_ERROR:
            import ipdb;ipdb.post_mortem(step.exc_traceback)
