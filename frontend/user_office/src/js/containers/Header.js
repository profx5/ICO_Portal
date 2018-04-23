import React from 'react';
import {connect} from 'react-redux'
import InvestActions from '../actions/InvestActions'
import Balance from '../components/Balance'
import Title from '../components/Title'
import Invest from './Invest'
import KYCWidget from '../components/KYCWidget'
import DepositTable from './DepositTable'
import BountiesBalance from './BountiesBalance'
import PhaseStats from './PhaseStats'
import KYC from './KYC'
import Account from './Account'
import ReferralLink from './ReferralLink'

class Header extends React.Component {
    render () {
        const {
            tokensAmount,
            kycRequired,
            showInvestForm,
            kyc,
            KYCStatus,
            privateKey
        } = this.props

        const showKYCwidget = KYCStatus === 'WAITING'

        return (
            <header className="Header container col-md-10">
                {kycRequired &&
                 <div className="row h-5">
                     <KYC />
                 </div>
                }
                <div className="Header_row row h-100">
                    <Balance
                        currentAmount={tokensAmount}
                        investClick={showInvestForm}
                    />
                    <ReferralLink />
                    <BountiesBalance />
                    <PhaseStats />
                    <Account />
                    <Invest />
                </div>
                {privateKey && <Title text={`Private key — ${privateKey}`} type='h2'/>}
                <DepositTable />
                {showKYCwidget && <KYCWidget kyc={kyc} status={KYCStatus}/>}
            </header>
        )
    }
}

const mapStateToProps = ({user, ICOPhaseStats, KYC, Invest}) => ({
    tokensAmount: user.get('tokens_amount'),
    kycRequired: user.get('kyc_required'),
    kyc: KYC.get('kyc'),
    KYCStatus: KYC.get('status'),
    userId: user.get('eth_account'),
    showInvestForm: Invest.get('showInvestForm'),
    privateKey: user.getIn(['security', 'privateKey'])
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
