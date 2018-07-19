from .base import BaseContract


class PriceOracle(BaseContract):
    compiled_file_path = '{BASE_DIR}/solidity-contracts/contracts/PriceOracle.json'

    def get_eth_price_in_cents(self):
        return self.contract.functions.ethPriceInCents().call()

    def get_allowed_oracle_change_percent(self):
        return self.contract.functions.allowedOracleChangePercent().call()

    def get_sensivity(self):
        return self._settings['sensivity']

    def set_eth_price_in_cents(self, price):
        price = int(price)

        gas = 50000

        return self.contract.functions.setEthPrice(price).buildTransaction({
            'gas': gas
        })
