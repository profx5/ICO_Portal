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
            currentAmount: 0,
            accountId: 'none'
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
