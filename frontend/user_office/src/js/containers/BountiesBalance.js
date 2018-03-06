import React from 'react'
import {connect} from 'react-redux'

const BountiesBalance = ({
    currency,
    balance,
    next_stage
}) => (
    <div>
        <div>
            <b>currency: </b>
            {currency || 'null'}
        </div>
        <div>
            <b>balance: </b>
            {balance || 'null'}
        </div>
        <div>
            <b>next_stage: </b>
            {next_stage || 'null'}
        </div>
    </div>
)

const mapStateToProps = ({
    bountiesBalance: { currency, balance, next_stage }
}) => ({ currency, balance, next_stage })

export default connect(mapStateToProps)(BountiesBalance)
