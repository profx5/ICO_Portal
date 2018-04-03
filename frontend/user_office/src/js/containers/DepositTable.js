import React, {Component} from 'react'
import {connect} from 'react-redux'


class DepositTable extends Component {
    _renderTable = (deposits) => {
        return deposits.map( (item, idx) => {
            return (
                <tr key={idx} className={item.get('state') === 'PREPARED' ? 'prepared' : ''}>
                    <td>{item.get('amount')}</td>
                    <td>{item.get('amount_wo_bonus')}</td>
                    <td>{item.getIn(['mint', 'tnx_hash'])}</td>
                    <td>{item.get('charged_at')}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">amount</th>
                            <th scope="col">amount_wo_bonus</th>
                            <th scope="col">txn_hash</th>
                            <th scope="col">charged_at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this._renderTable(this.props.deposits)}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = ({deposits}) => ({
    deposits: deposits.get('list')
})

export default connect(mapStateToProps)(DepositTable)
