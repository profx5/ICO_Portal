import React from 'react';
import {connect} from 'react-redux'
import InvestActions from '../actions/InvestActions'
//components
import Balance from '../components/Balance'
import Lang from '../components/Lang';
//containers
import Invest from './Invest'
import KYCwidget from '../components/KYCwidget'
import DepositTable from './DepositTable'
import BountiesBalance from './BountiesBalance'
import PhaseStats from './PhaseStats'
import KYC from './KYC'
import Account from './Account'

class Header extends React.Component {
    render () {
        const {
            tokensAmount,
            kycRequired,
            showInvestForm,
            kyc,
            KYCstatus
        } = this.props

        const isKycExist = kyc.size > 0;

        return (
            <header className="Header container col-md-10">
                {kycRequired &&
                 <div className="row h-5">
                    <KYC />
                 </div>
                }
                <div className="Header_row row h-100">
                    <Balance currentAmount={tokensAmount} investClick={showInvestForm}/>
                    <BountiesBalance />
                    <PhaseStats />
                    <Account />
                    <Invest />
                </div>
                <DepositTable />
                <KYCwidget kyc={kyc} status={KYCstatus}/>
            </header>
        )
    }
}

const mapStateToProps = ({user, ICOPhaseStats, KYC, Invest}) => ({
    tokensAmount: user.get('tokens_amount'),
    kycRequired: user.get('kyc_required'),
    kyc: KYC.get('kyc'),
    KYCstatus: KYC.get('status'),
    userId: user.get('eth_account'),
    showInvestForm: Invest.get('showInvestForm')
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
