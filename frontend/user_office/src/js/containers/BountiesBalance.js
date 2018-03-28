import React from 'react'
import {connect} from 'react-redux'

const BountiesBalance = ({currency, balance, nextStage}) => (
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
            <b>next stage: </b>
            {nextStage || 'null'}
        </div>
    </div>
)

const mapStateToProps = ({bountiesBalance}) => ({
    currency: bountiesBalance.get('currency'),
    balance: bountiesBalance.get('balance'),
    nextStage: bountiesBalance.get('nextStage'),
})

export default connect(mapStateToProps)(BountiesBalance)
