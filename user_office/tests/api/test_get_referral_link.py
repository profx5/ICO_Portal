from .base import APITestCase


class GetReferralLinkTestCase(APITestCase):
    def test_successful_request(self):
        response = self.client.get('/api/getReferralLink/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data,
                         {'link': 'http://localhost:8000/signup/?refid={}' \
                          .format(self.get_investor().referral_id)})
