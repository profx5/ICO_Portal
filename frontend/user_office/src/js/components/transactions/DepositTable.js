import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components';
import moment from "moment";

import * as UIActions from './../../actions/UIActions';

import TransactionRow from './components/TransactionRow';


class DepositTable extends Component {

    componentWillUnmount() {
        this.props.openTransaction(null);
    }

    onIconClickHandler = (id) => {
        const {openedTransaction, openTransaction} = this.props;
        if (openedTransaction === id) openTransaction(null);
            else openTransaction(id);
    }

    renderRows = (transactions) => {
        const {openedTransaction} = this.props;

        return transactions.map((item, index) => {
            return (
                <TransactionRow
                    key={index}
                    id={index}
                    openedTransaction={openedTransaction}
                    onIconClickHandler={this.onIconClickHandler.bind(this, index)}
                    state={item.getIn(['transfer', 'state'])}
                    date={moment(item.get('created_at')).format('YYYY-MM-DD')}
                    time={moment(item.get('created_at')).format('HH:mm:ss')}
                    transferTxnHash={item.getIn(['transfer', 'txn_hash'])}
                    paymentTxnId={item.getIn(['payment', '0', 'txn_id'])}
                    amount={parseFloat(item.getIn(['payment', '0', 'amount'])).toFixed(2)}
                    currency={item.getIn(['payment', '0', 'currency'])}
                    usdc_value={parseFloat(item.getIn(['payment', '0', 'usdc_value']) / 100).toFixed(2)}
                    tokens={parseFloat(item.get('amount') / 10 ** 18).toFixed(2)}
                    rate_usdc={item.getIn(['payment', '0', 'rate_usdc'])}
                    bonus_percent={item.getIn(['payment', '0', 'bonus_percent'])}>
                </TransactionRow>
            )
        })
    }

    render() {
        const {deposits} = this.props;
        return (
            <Table>
                    <Row>
                        <div>Time</div>
                        <div>Transaction</div>
                        <div>Amount</div>
                        <div>USD value</div>
                        <div>OGD Tokens</div>
                    </Row>
                    {deposits.size ?
                        this.renderRows(deposits) :
                        <div className="Table_text">You have no transactions yet</div>
                    }
            </Table>
        )
    }
}


const mapStateToProps = ({deposits, UI}) => ({
    deposits: deposits.get('results'),
    currentPage: deposits.get('current_page'),
    openedTransaction: UI.get('openedTransaction')
});

const mapDispatchToProps = (dispatch) => ({
    openTransaction(id) {
        dispatch(UIActions.openTransaction(id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DepositTable)

const Table = styled.div`
    display: flex;
    flex-flow: row wrap;
    border-radius: 6px;
    background-color: #ffffff;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    padding-top: 42.2px;
    margin-top: 30px;
    .Table_text {
        font-size: 16px;
        flex-basis: 100%;
        background: rgb(246, 246, 246);
        padding: 10px;
        font-weight: 400;
    }
`;

const Row = styled.div`
    flex-basis: 100%;
    display: flex;
    margin-bottom: 23px;
    div {
        font-size: 16px;
        color: rgba(10, 10, 10, .4);
        text-align: center;
    }
    div:nth-of-type(1) {
        flex-basis: 20%;
    }
    div:nth-of-type(2) {
        flex-basis: 35%;
    }
    div:nth-of-type(3) {
        flex-basis: 15%;
    }
    div:nth-of-type(4) {
        flex-basis: 15%;
    }
    div:nth-of-type(5) {
        flex-basis: 15%;
        text-align: right;
        padding-right: 40px;
    }
`;
