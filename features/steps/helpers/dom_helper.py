from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


POLL_FREQUENCY = 0.25


def ac_click(driver, element):
    return ActionChains(driver).move_to_element(element).click().perform()


def get_element(driver, selector, raise_error=True, wait_sec=None):
    try:
        if wait_sec:
            return WebDriverWait(driver, wait_sec, POLL_FREQUENCY)\
                .until(EC.presence_of_element_located((By.XPATH, selector)))
        else:
            return driver.find_element_by_xpath(selector)

    except (NoSuchElementException, TimeoutException) as e:
        if raise_error:
            raise e


def get_field(driver, field_spec, option=None, field_type='input'):
    """
    Try to find input by name attribute or
    corresponding label text
    """

    input_field = get_element(
        driver,
        f'//{field_type}[@name="{field_spec}"]',
        wait_sec=3,
        raise_error=False
    )

    if input_field is None:
        label = get_element(
            driver,
            f'//label[contains(text(), "{field_spec}")] | \
            //*[contains(text(), "{field_spec}")]/parent::label',
            raise_error=False
        )

        assert label is not None, f'Field for spec "{field_spec}" not found'

        input_id = label.get_attribute('for')
        input_field = get_element(driver, f'//{field_type}[@id="{input_id}"]')

    return input_field


def select_option(driver, field_spec, option):
    get_field(driver, field_spec, field_type='select').click()


def is_recapthca_sent(driver):
    return driver.execute_script('return grecaptcha.getResponse().length > 0')


def wait_recapthca(driver, wait_sec):
    return WebDriverWait(driver, wait_sec).until(is_recapthca_sent)
