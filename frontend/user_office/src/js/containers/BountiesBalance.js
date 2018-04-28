import React from 'react'
import {connect} from 'react-redux'
//actions
import * as ModalAction from '../actions/ModalWindowAction'
//components
import Button from '../components/Button'

const BountiesBalance = ({
    currentValue,
    thresholdValue,
    canTransfer,
    openModal
}) => (
    <div>
        <div>
            <b>current: </b>
            {currentValue || 'null'}
        </div>
        <div>
            <b>threshold value: </b>
            {thresholdValue || 'null'}
        </div>
        <div>
            <b>transfer allowed: </b>
            {canTransfer || 'null'}
        </div>
        <div>
            <Button text='Transfer' onClick={openModal}/>
        </div>
    </div>
)

const mapStateToProps = ({bountiesBalance}) => ({
    currentValue: bountiesBalance.getIn(['bounties', 'currentValue']),
    thresholdValue: bountiesBalance.getIn(['bounties', 'thresholdValue']),
    canTransfer: bountiesBalance.getIn(['bounties', 'canTransfer']),
})

const mapDispatchToProps = (dispatch) => ({
    openModal() {
        dispatch( ModalAction.openModal() )
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BountiesBalance)
