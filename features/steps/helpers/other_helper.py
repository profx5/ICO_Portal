import os
from django.conf import settings


screenshots_counter = 0

def take_screenshot(driver, step=None):
    global screenshots_counter

    if step:
        filename = '{}_line_{}.png'.format(step.location.basename(), step.location.line)
    else:
        filename = 'screenshot_{:>03}.png'.format(screenshots_counter)
        screenshots_counter += 1

    path = os.path.join(settings.BASE_DIR, 'test_artifacts', filename)

    driver.save_screenshot(path)

def is_logged_in(driver):
    return driver.get_cookie('sessionid') is not None

def attached_file_path(filename):
    return os.path.join(settings.BASE_DIR, 'features/attached_files/', filename)
