import React from 'react';
import axios from 'axios';

import Balance from './Balance';
import Rate from './Rate';
import Bounty from './Bounty';
import Lang from './Lang';
import AccountInfo from './AccountInfo';

export default class Header extends React.Component {
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

    componentWillMount() {
        axios.get('/api/getMe/').then((response) => {
            let data = response.data;
            this.setState({
                currentAmount: data.tokens_amount,
                accountId: data.eth_account
            });
        });

        axios.get('/api/getICOPhaseStats/').then((response) => {
            let data = response.data;
            this.setState({
                currentTokenPrice: data.current_token_price,
                currencyFrom: data.currency_from,
                currencyTo: data.currency_to,
                bonus_percents: data.bonus_percents,
                endDate: data.end_date,
                name: data.name,
            });
        });

        axios.get('/api/getOffCainBountiesBalance/').then((response) => {
            let data = response.data;
            this.setState({
                currency: data.currency,
                balance: data.balance,
                nextStage: data.next_stage
            });
        });

    }

    render () {
        return (

            <header className="Header container col-md-10">
                <div className="Header_row row h-100">
                    <Balance currentAmount={this.state.currentAmount}/>
                    <Rate/>
                    <Bounty/>
                    <Lang/>
                    <AccountInfo accountId={this.state.accountId}/>
                </div>
            </header>
        );
    }
}
