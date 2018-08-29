from decimal import Decimal

from django.conf import settings
from django.test import override_settings

from user_office.factories import KYCFactory, InvestorFactory, ReferralBonusFactory
from user_office.models import ReferralBonus
from ..base import APITestCase

SINGLE_REFERRAL_AMOUNT_INT = Decimal('1')
SINGLE_REFERRAL_AMOUNT = SINGLE_REFERRAL_AMOUNT_INT * 10 ** settings.TOKEN_DECIMALS


@override_settings(REFERRAL_TOKENS_THRESHOLD=SINGLE_REFERRAL_AMOUNT_INT * 2)
class TestPrepareReferralBonusesAPI(APITestCase):
    setup_login = False

    def test_api(self):
        investor = InvestorFactory(eth_account=None)
        investor.set_password(self.password)
        investor.save()
        self.client.login(email=investor.email, password=self.password)

        response = self.client.post('/api/prepareReferralBonuses/')
        self.assertEqual(response.status_code, 403)

        KYCFactory(investor=investor)
        response = self.client.post('/api/prepareReferralBonuses/')
        self.assertEqual(response.status_code, 403)

        investor.eth_account = InvestorFactory.eth_account.fuzz()
        investor.save()
        response = self.client.post('/api/prepareReferralBonuses/')
        self.assertEqual(response.status_code, 422)

        ReferralBonusFactory(
            beneficiary=investor, amount=SINGLE_REFERRAL_AMOUNT, state=ReferralBonus.State.created)
        response = self.client.post('/api/prepareReferralBonuses/')
        self.assertEqual(response.status_code, 422)

        ReferralBonusFactory(
            beneficiary=investor, amount=SINGLE_REFERRAL_AMOUNT * 2, state=ReferralBonus.State.created)
        self.assertEqual(ReferralBonus.objects.prepared_for_collection().count(), 0)
        self.assertEqual(ReferralBonus.objects.count(), 2)
        response = self.client.post('/api/prepareReferralBonuses/')
        self.assertEqual(response.status_code, 200)

        self.assertEqual(ReferralBonus.objects.prepared_for_collection().count(), 2)
        self.assertEqual(ReferralBonus.objects.count(), 2)

        response = self.client.post('/api/prepareReferralBonuses/')
        self.assertEqual(response.status_code, 422)
