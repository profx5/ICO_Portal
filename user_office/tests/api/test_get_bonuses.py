from ..base import APITestCase
from user_office.factories import BonusesFactory


class TestGetBonuses(APITestCase):
    def test_successful_request(self):
        BonusesFactory(id_contract="1234567890", description="Description")
        BonusesFactory(id_contract="1234567892", description="Description2")

        response = self.client.get('/api/getBonuses/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [
            {'description': 'Description', 'id': 1, 'id_contract': '1234567890'},
            {'description': 'Description2', 'id': 2, 'id_contract': '1234567892'}
        ])
