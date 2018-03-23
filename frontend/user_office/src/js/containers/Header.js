import React from 'react';
import {connect} from 'react-redux'
//components
import Balance from '../components/Balance'
import Bounty from '../components/Bounty';
import Lang from '../components/Lang';
import KYCwidget from '../components/KYCwidget'
//containers
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
            accountId: '',
            currentTokenPrice: '',
            currencyFrom: '',
            currencyTo: '',
            bonus_percents: '',
            endDate: '',
            name: '',
            currency: '',
            balance: '',
            nextStage: ''
        }

    }

    render () {
        const {
            tokensAmount,
            userId,
            kycRequired,
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
                    <Balance currentAmount={tokensAmount}/>
                    <BountiesBalance />
                    <Bounty/>
                    <PhaseStats />
                    <Account />
                </div>
                <DepositTable />
                {KYCstatus && <KYCwidget {...kyc} status={KYCstatus}/>}
            </header>
        )
    }
}

const mapStateToProps = ({user, ICOPhaseStats, KYC: {kyc, status}}) => ({
    tokensAmount: user.tokens_amount,
    userId: user.eth_account,
    kycRequired: user.kyc_required,
    currentTokenPrice: ICOPhaseStats.token_price,
    currencyFrom: ICOPhaseStats.currency_from,
    currencyTo: ICOPhaseStats.currency_to,
    bonus_percents: ICOPhaseStats.bonus_percents,
    endDate: ICOPhaseStats.end_date,
    name: ICOPhaseStats.name,
    kyc,
    KYCstatus: status
})

export default connect(mapStateToProps)(Header)
