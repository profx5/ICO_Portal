import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import * as InvestActions from '../actions/InvestActions'

import Balance from '../components/Balance'
import AccountInfo from '../components/AccountInfo'
import KYCWidget from '../components/KYCWidget'

import Invest from './Invest'
import DepositTable from './DepositTable'
import BountiesBalance from './BountiesBalance'
import PhaseStats from './PhaseStats'
import KYC from './KYC'
import Account from './Account'
import ReferralLink from './ReferralLink'

class Header extends React.Component {
    render () {
        const {
            email,
            tokensAmount,
            kycRequired,
            showInvestForm,
            kyc,
            KYCStatus,
            accountApproved
        } = this.props;

        const showKYCWidget = KYCStatus === 'WAITING'

        return (
            <HeaderBlock>
                {kycRequired &&
                 <div>
                     <KYC />
                 </div>
                }
                <HeaderUserBlock>
                    <Balance
                        currentAmount={tokensAmount}
                        investClick={showInvestForm}
                    />
                    <AccountInfo
                        email={email}
                    />
  {/*                  <Account />*/}
{/*                    <Account />
                    <ReferralLink />
                    <BountiesBalance />
                    <PhaseStats />
                    <Invest />*/}
                </HeaderUserBlock>
{/*                <DepositTable />
                {showKYCWidget && <KYCWidget kyc={kyc} status={KYCStatus}/>}*/}
            </HeaderBlock>
        )
    }
}

const mapStateToProps = ({user, ICOPhaseStats, KYC, Invest}) => ({
    email: user.get('email'),
    tokensAmount: user.get('tokens_amount'),
    kycRequired: user.get('kyc_required'),
    kyc: KYC.get('kyc'),
    KYCStatus: KYC.get('status'),
    userId: user.get('eth_account'),
    showInvestForm: Invest.get('showInvestForm'),
    accountApproved: user.get('setAccountSubmitting')
})

const mapDispatchToProps = (dispatch) => ({
    showInvestForm() {
        dispatch(InvestActions.showForm())
    },
    hideInvestForm() {
        dispatch(InvestActions.hideForm())
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
`;

const HeaderUserBlock = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`