import React, {Component} from 'react'
import {connect} from 'react-redux'
import {DepositsActions} from '../actions/DepositsActions'


class DepositTable extends Component {
    _renderTable = (deposits) => {
        return deposits.map( (item, idx) => {
            return (
                <tr key={idx} className={item.get('state') === 'PREPARED' ? 'prepared' : ''}>
                    <td>{item.get('amount')}</td>
                    <td>{item.get('amount_wo_bonus')}</td>
                    <td>{item.getIn(['mint', 'txn_hash'])}</td>
                    <td>{item.get('charged_at')}</td>
                </tr>
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
                <p>Page {currentPage} of {pages}</p>
                {currentPage < pages && <a href="#" onClick={nextPage}>Next</a>}
                {currentPage >= pages && <a href="#" onClick={prevPage}>Prev</a>}
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
