import React from 'react';
import {connect} from 'react-redux'
//components
import Balance from '../components/Balance'
import Lang from '../components/Lang';
import KYCwidget from '../components/KYCwidget'
//containers
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
            kyc,
            KYCstatus
        } = this.props

        const isKycExist = kyc.size > 0;

        return (
            <header className="Header container col-md-10">
                {kycRequired &&
                 <div className="row h-5">
                    {/* {!KYCstatus && <KYC />} */}
                    <KYC />
                 </div>
                }
                <div className="Header_row row h-100">
                    <Balance currentAmount={tokensAmount}/>
                    <BountiesBalance />
                    <PhaseStats />
                    <Account />
                </div>
                <DepositTable />
                {/* {KYCstatus && <KYCwidget kyc={kyc} status={KYCstatus}/>} */}
                <KYCwidget kyc={kyc} status={KYCstatus}/>
            </header>
        )
    }
}

const mapStateToProps = ({user, ICOPhaseStats, KYC}) => ({
    tokensAmount: user.get('tokens_amount'),
    kycRequired: user.get('kyc_required'),
    kyc: KYC.get('kyc'),
    KYCstatus: KYC.get('status')
})

export default connect(mapStateToProps)(Header)
