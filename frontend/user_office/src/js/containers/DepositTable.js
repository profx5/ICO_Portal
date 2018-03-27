import React, {Component} from 'react'
import {connect} from 'react-redux'

class DepositTable extends Component {
    static defultProps = {
        deposits: []
    }

    _renderTable = (deposits) => {
        return deposits.map( (item, idx) => {
            return (
                <tr key={idx} className={item.state === 'PREPARED' ? 'prepared' : ''}>
                    <td>{item.amount}</td>
                    <td>{item.amount_wo_bonus}</td>
                    <td>{item.mint.txn_hash}</td>
                    <td>{item.charged_at}</td>
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

const mapStateToProps = ({
    deposits: {list}
}) => ({
    deposits: [...list]
})

export default connect(mapStateToProps)(DepositTable)
