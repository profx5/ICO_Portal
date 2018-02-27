class BaseCurrency:
    name = ''
    code = ''
    confirmations_required = 0
    token_price = 0

    @classmethod
    def generate_account(cls):
        return NotImplemented
