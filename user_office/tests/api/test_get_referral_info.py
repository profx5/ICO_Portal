from decimal import Decimal

from django.conf import settings
from django.test import override_settings
from django.urls import reverse

from user_office.factories import ReferralBonusFactory, InvestorFactory, KYCFactory, PaymentFactory
from user_office.models import ReferralBonus
from ..base import APITestCase

INVITATION_TEXT = 'Some marketing text'


class TestGetReferralInfo(APITestCase):
    setup_login = False

    def assert_referral_info(self, referral_id, amounts, referrals, is_possible_to_collect):
        response = self.client.get('/api/getReferralInfo/')

        amounts_dict = dict(created=0, accrued=0, pending=0)
        amounts_dict.update(**amounts)

        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(
            response.data,
            {
                'link': f'{settings.HOST}{reverse("signup")}?refid={referral_id}',
                'amounts': amounts_dict,
                'referrals': referrals,
                'is_possible_to_collect': is_possible_to_collect,
                'invitation_text': INVITATION_TEXT
            })

    @override_settings(
        REFERRAL_TOKENS_THRESHOLD=Decimal(500) / 10 ** settings.TOKEN_DECIMALS,
        REFERRAL_INVITATION_TEXT=INVITATION_TEXT
    )
    def test_successful_request(self):
        investor = InvestorFactory(eth_account=None)
        investor.set_password(self.password)
        investor.save()
        self.client.login(email=investor.email, password=self.password)

        self.assert_referral_info(
            referral_id=investor.referral_id,
            amounts={},
            referrals=[],
            is_possible_to_collect=False)

        for state, number in [
            (ReferralBonus.State.created, 2), (ReferralBonus.State.prepared, 4), (ReferralBonus.State.accrued, 3)
        ]:
            for _ in range(number):
                ReferralBonusFactory(
                    beneficiary=investor, amount=Decimal('200'), state=state)
        amounts = {'created': Decimal('400'), 'pending': Decimal('800'), 'accrued': Decimal('600')}
        self.assert_referral_info(
            referral_id=investor.referral_id,
            amounts=amounts,
            referrals=[],
            is_possible_to_collect=False)

        referral_new = InvestorFactory(referrer=investor)
        referral_approved_kyc = InvestorFactory(referrer=investor)
        KYCFactory(investor=referral_approved_kyc)
        referral_has_transactions = InvestorFactory(referrer=investor)
        KYCFactory(investor=referral_has_transactions)
        PaymentFactory(payer_account=referral_has_transactions.eth_account)
        referrals = [
            {
                'date_joined': referral_new.date_joined.isoformat(),
                'state': 'Awaiting KYC',
            },
            {
                'date_joined': referral_approved_kyc.date_joined.isoformat(),
                'state': 'Pending',
            },
            {
                'date_joined': referral_has_transactions.date_joined.isoformat(),
                'state': 'Completed',
            },
        ]
        self.assert_referral_info(
            referral_id=investor.referral_id,
            amounts=amounts,
            referrals=referrals,
            is_possible_to_collect=False)

        ReferralBonusFactory(beneficiary=investor, amount=Decimal('100'), state=ReferralBonus.State.created)
        amounts['created'] = Decimal('500')
        self.assert_referral_info(
            referral_id=investor.referral_id,
            amounts=amounts,
            referrals=referrals,
            is_possible_to_collect=False)

        investor.eth_account = InvestorFactory.eth_account.fuzz()
        investor.save()
        self.assert_referral_info(
            referral_id=investor.referral_id,
            amounts=amounts,
            referrals=referrals,
            is_possible_to_collect=False)

        KYCFactory(investor=investor)
        self.assert_referral_info(
            referral_id=investor.referral_id,
            amounts=amounts,
            referrals=referrals,
            is_possible_to_collect=True)

        ReferralBonus.objects.filter(state=ReferralBonus.State.created).update(state=ReferralBonus.State.prepared)
        amounts['pending'] += amounts['created']
        amounts['created'] = Decimal('0')
        self.assert_referral_info(
            referral_id=investor.referral_id,
            amounts=amounts,
            referrals=referrals,
            is_possible_to_collect=False)
