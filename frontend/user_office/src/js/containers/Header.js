import React from 'react';
import {connect} from 'react-redux'
import InvestActions from '../actions/InvestActions'
//components
import Balance from '../components/Balance'
import Bounty from '../components/Bounty';
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
    constructor(props) {
        super(props)

        this.state = {
            currentAmount: '',
            accountId: ''
        }
    }

    render () {
        const {
            tokensAmount,
            userId,
            kycRequired,
            showInvestForm,
            kyc,
            KYCstatus
        } = this.props
        const isKycExist = Object.keys(kyc).length > 0;
        return (
            <header className="Header container col-md-10">
                {kycRequired &&
                 <div className="row h-5">
                    {!KYCstatus && <KYC />}
                 </div>
                }
                <div className="Header_row row h-100">
                    <Balance currentAmount={tokensAmount} investClick={showInvestForm}/>
                    <BountiesBalance />
                    <Bounty/>
                    <PhaseStats />
                    <Account />
                    <Invest />
                </div>
                <DepositTable />
                {KYCstatus && <KYCwidget {...kyc} status={KYCstatus}/>}
            </header>
        )
    }
}

const mapStateToProps = ({user, Invest, KYC: {kyc, status}}) => ({
    tokensAmount: user.tokens_amount,
    userId: user.eth_account,
    kycRequired: user.kyc_required,
    showInvestForm: Invest.showInvestForm,
    kyc,
    KYCstatus: status
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
