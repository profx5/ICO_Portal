import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux'

import Balance from '../components/Balance'
import Bounty from '../components/Bounty';
import Lang from '../components/Lang';
import AccountInfo from '../components/AccountInfo';

//containers
import DepositTable from './DepositTable'

class Header extends React.Component {
    constructor(props) {
        super(props);

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
        };

    }

    render () {

        const {
            tokensAmount,
            userId,
        } = this.props

        return (
            <header className="Header container col-md-10">
                <div className="Header_row row h-100">
                    <Balance currentAmount={tokensAmount}/>
                    <Bounty/>
                    <Lang/>
                    <AccountInfo accountId={userId}/>
                </div>
                <DepositTable />
            </header>
        );
    }
}

const mapStateToProps = ({user, ICOPhases}) => ({
    tokensAmount: user.tokens_amount,
    userId: user.eth_account,
    currentTokenPrice: ICOPhases.token_price,
    currencyFrom: ICOPhases.currency_from,
    currencyTo: ICOPhases.currency_to,
    bonus_percents: ICOPhases.bonus_percents,
    endDate: ICOPhases.end_date,
    name: ICOPhases.name,
})

export default connect(mapStateToProps)(Header)
