from behave import *
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def get_element(driver, selector, raise_error=True, wait_sec=None):
    try:
        if wait_sec:
            return WebDriverWait(driver, wait_sec).until(
                EC.presence_of_element_located((By.XPATH, selector)))
        else:
            return driver.find_element_by_xpath(selector)
    except (NoSuchElementException, TimeoutException) as e:
        if raise_error:
            raise e
        else:
            return None

def is_element_not_exist(driver, selector, wait_sec=0):
    try:
        return WebDriverWait(driver, wait_sec).until(
            EC.invisibility_of_element_located((By.XPATH, selector)))
    except TimeoutException:
        return False

def get_input_field(driver, field_spec):
    """
    Try to find input by name attribute or
    corresponding label text
    """

    input_field = get_element(driver, f'//input[@name="{field_spec}"]', raise_error=False)

    if not input_field:
        label = get_element(driver,
                            f'//label[contains(text(), "{field_spec}")]|//*[contains(text(), "{field_spec}")]/parent::label')
        input_id = label.get_attribute('for')

        input_field = get_element(driver, f'//input[@id="{input_id}"]')

    return input_field

def is_recapthca_sent(driver):
    return driver.execute_script('return grecaptcha.getResponse().length > 0')

def wait_recapthca(driver, wait_sec):
    return WebDriverWait(driver, wait_sec).until(is_recapthca_sent)
