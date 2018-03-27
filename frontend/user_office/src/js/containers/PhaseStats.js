import React from 'react'
import {connect} from 'react-redux'

const PhaseStats = ({
    phaseName,
    discountPercent,
    endTime
}) => {
    const endIn = new Date(endTime * 1000).toDateString()

    return (
        <div>
            <div><b>Current ico phase</b></div>
            <div>
                <b>Name: </b>
                {phaseName}
            </div>
            <div>
                <b>Discount: </b>
                {discountPercent}%
            </div>
            <div>
                <b>End date: </b>
                {endIn}
            </div>
        </div>
    )
}

const mapStateToProps = ({ICOInfo}) => ({
    phaseName: ICOInfo.currentPhase.name,
    discountPercent: ICOInfo.currentPhase.discountPercent,
    endTime: ICOInfo.currentPhase.endTime,
})

export default connect(mapStateToProps)(PhaseStats)
