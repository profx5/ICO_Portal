import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import * as InvestActions from '../actions/InvestActions';
import * as UIStateActions from '../actions/UIStateActions';

import Balance from '../components/Balance';
import AccountInfo from '../components/AccountInfo';
import KYCWidget from '../components/KYCWidget';

import Invest from './Invest';
import DepositTable from './DepositTable';
import BountiesBalance from './BountiesBalance';
import PhaseStats from './PhaseStats';
import KYC from './KYC';
import Account from './Account';
import ReferralLink from './ReferralLink';

class Header extends React.Component {

    dropdownClickHandler = () => {
        const {accountDropdownShown, showAccountDropdown, hideAccountDropdown} = this.props;
        if (!accountDropdownShown) {
            showAccountDropdown();
        } else hideAccountDropdown();
    }

    render () {
        const {
            email,
            tokensAmount,
            kycRequired,
            showInvestForm,
            kyc,
            KYCStatus,
            accountApproved,
            accountDropdownShown
        } = this.props;

        const showKYCWidget = KYCStatus === 'WAITING'

        return (
            <HeaderBlock>
                <HeaderUserBlock>
                    <Balance
                        currentAmount={tokensAmount}
                        investClick={showInvestForm}
                    />
                    <AccountInfo
                        email={email}
                        isDropdownOpen={accountDropdownShown}
                        dropdownClickHandler={this.dropdownClickHandler}
                    />
                </HeaderUserBlock>
            </HeaderBlock>
        )
    }
}

const mapStateToProps = ({user, ICOPhaseStats, KYC, Invest, UI}) => ({
    email: user.get('email'),
    tokensAmount: user.get('tokens_amount'),
    kycRequired: user.get('kyc_required'),
    kyc: KYC.get('kyc'),
    KYCStatus: KYC.get('status'),
    userId: user.get('eth_account'),
    showInvestForm: Invest.get('showInvestForm'),
    accountApproved: user.get('setAccountSubmitting'),
    accountDropdownShown: UI.get('accountDropdownShown')
})

const mapDispatchToProps = (dispatch) => ({
    showAccountDropdown() {
        dispatch(UIStateActions.showAccountDropdown())
    },
    hideAccountDropdown() {
        dispatch(UIStateActions.hideAccountDropdown())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)


const HeaderBlock = styled.header`
    height: 100px;
    background: #FAFBFC;
    padding-left: 55px;
    padding-right: 55px;
    flex-basis: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    border-bottom: 1px solid #e7e9ea;
    position: relative;
    z-index: 2;
`;

const HeaderUserBlock = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`