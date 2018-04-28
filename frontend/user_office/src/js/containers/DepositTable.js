import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components';

import * as DepositsActions from '../actions/DepositsActions'


class DepositTable extends Component {
    _renderTable = (deposits) => {
        return deposits.map( (item, index) => {
            if (index === 3) return;
            return (
                <TableBodyRow key={index} className={item.get('state') === 'PREPARED' ? 'prepared' : ''}>
                    <TableCell>{item.get('amount')}</TableCell>
                    <TableCell>{item.get('amount_wo_bonus')}</TableCell>
                    <TableCell>{item.getIn(['mint', 'txn_hash'])}</TableCell>
                    <TableCell>{item.get('charged_at')}</TableCell>
                </TableBodyRow>
            )
        })
    }

    render() {
        const {
            currentPage,
            pages,
            nextPage,
            prevPage
        } = this.props

        return (
            <div>
                <Table className="table">
                    <thead>
                        <tr>
                            <TableHead>Amount</TableHead>
                            <TableHead>Bonus</TableHead>
                            <TableHead>Tx hash</TableHead>
                            <TableHead>Tx time</TableHead>
                        </tr>
                    </thead>
                    <tbody>
                        {this._renderTable(this.props.deposits)}
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = ({deposits}) => ({
    deposits: deposits.get('results'),
    pages: deposits.get('pages'),
    currentPage: deposits.get('current_page')
})

const mapDispatchToProps = (dispatch) => ({
    nextPage() {
        dispatch(DepositsActions.depositsNextPage())
    },
    prevPage() {
        dispatch(DepositsActions.depositsPrevPage())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositTable)






const Table = styled.table`
    border-collapse: separate;
    width: 100%;
    border-spacing: 0 5px;
`;

const TableBodyRow = styled.tr`
    height: 45px;
    background: #e3dfdf;
    &.prepared td {
        background: rgba(184,241,229,.6);
    }
`;

const TableHead = styled.th`
    color: #0a0a0a;
    text-align: left;
    font-weight: 600;
    padding-left: 24px;
    padding-bottom: 25px;
    &:last-of-type {
        width: 260px;
    }
`;

const TableCell = styled.td`
    color: #0a0a0a;
    padding-left: 24px;
`;
