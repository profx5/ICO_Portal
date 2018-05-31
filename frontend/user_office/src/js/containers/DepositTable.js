import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components';
import moment from 'moment';

import * as DepositsActions from '../actions/DepositsActions'


class DepositTable extends Component {
    
    _renderTable = (deposits) => {
        return deposits.map( (item, index) => {
            if (index === 3) return;
            return (
                <TableBodyRow key={index} className={item.getIn(['transfer', 'state']) === 'ACTUAL' ? 'prepared' : ''}>
                    <TableCell>{item.get('amount')}</TableCell>
                    <TableCell>{item.getIn(['transfer', 'txn_hash'])}</TableCell>
                    <TableCell>{moment(item.get('created_at')).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
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
    currentPage: deposits.get('current_page')
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(DepositTable)


const Table = styled.table`
    border-collapse: separate;
    width: 100%;
    border-spacing: 0 5px;
`;

const TableBodyRow = styled.tr`
    height: 45px;
    background: rgba(227,223,223,.3);
    &.prepared td {
        background: rgba(184,241,229,.6);
    }
`;

const TableHead = styled.th`
    color: #0a0a0a;
    font-size: 15px;
    text-align: left;
    font-weight: 600;
    padding-left: 24px;
    padding-bottom: 18px;
    white-space: nowrap;
    &:last-of-type {
        width: 260px;
    }
`;

const TableCell = styled.td`
    color: #0a0a0a;
    padding-left: 24px;
    &:nth-of-type(2) {
        word-break: break-all;
    }
`;
