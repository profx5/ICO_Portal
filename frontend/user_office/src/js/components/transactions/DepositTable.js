import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components';
import moment from "moment";
import {media} from 'js/services/media';

import * as UIActions from 'js/actions/UIActions';

import TransactionRow from 'js/components/transactions/stateless/TransactionRow';


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
        const {openedTransaction, tokenPrice} = this.props;

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
                    bonus_percent={item.getIn(['payment', '0', 'bonus_percent'])}
                    tokenPrice={tokenPrice}>
                </TransactionRow>
            )
        })
    }

    render() {
        const {deposits} = this.props;
        return (
            <Wrapper>
                <Table>
                    <HeadRow>
                        <th></th>
                        <th>Time</th>
                        <th>Transaction</th>
                        <th></th>
                        <th>Amount</th>
                        <th>USD value</th>
                        <th>OGD Tokens</th>
                    </HeadRow>
                    {deposits.size ?
                        this.renderRows(deposits) :
                            <tr>
                                <td colSpan="6" className="Table_text">You have no transactions yet</td>
                            </tr>
                    }
                </Table>
            </Wrapper>
        )
    }
}


const mapStateToProps = ({deposits, UI, Invest}) => ({
    deposits: deposits.get('results'),
    currentPage: deposits.get('current_page'),
    openedTransaction: UI.get('openedTransaction'),
    tokenPrice: Invest.get('tokenPrice')
});

const mapDispatchToProps = (dispatch) => ({
    openTransaction(id) {
        dispatch(UIActions.openTransaction(id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DepositTable)

const Wrapper = styled.div`
    @media (max-width: 1275px) {
        overflow-x: scroll;
        width: calc(100vw - 180px);
    }
    ${media.xs} {
        width: calc(100vw - 28px);
    }
`;

const Table = styled.table`
    width: 100%;
    border-radius: 6px;
    background-color: #ffffff;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    padding-top: 50px;
    margin-top: 30px;
    ${media.xs} {
        min-width: 1030px;
        margin-top: 15px;
        padding-top: 20px;
    }
    .Table_text {
        font-size: 16px;
        flex-basis: 100%;
        background: rgb(246, 246, 246);
        padding: 10px;
        font-weight: 400;
        ${media.xs} {
            font-size: 14px;
        }
    }
`;

const HeadRow = styled.tr`
    flex-basis: 100%;
    margin-bottom: 23px;
    ${media.xs} {
        flex-wrap: nowrap;
        white-space: nowrap;
    }
    th {
        font-size: 16px;
        font-weight: 500;
        color: rgba(10, 10, 10, .4);
        padding-bottom: 23px;
        white-space: nowrap;
        ${media.xs} {
            padding-bottom: 15px;
        }
    }
    th:nth-of-type(1) {
        ${media.smPlus} {
            display: none;
        }
        ${media.xs} {
            min-width: 15px;
        }
    }
    th:nth-of-type(2) {
        width: 17%;
        padding-left: 40px;
        ${media.xs} {
            padding-left: 0;
            position: relative;
            left: -26px;
        }
    }
    th:nth-of-type(3) {
        width: 29%;
        ${media.xs} {
            padding-left: 3.7%;
        }
    }
    th:nth-of-type(4) {
        ${media.xs} {
            display: none;
        }
    }
    th:nth-of-type(2), th:nth-of-type(3) {
        ${media.xs} {
            text-align: left;
        }
    }
`;
