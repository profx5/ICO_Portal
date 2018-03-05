import React from 'react'
import {connect} from 'react-redux'

const PhasesStats = ({
    currentTokenPrice,
    currencyFrom,
    currencyTo,
    bonus_percents,
    endDate,
    name,
}) => (
    <div>
        <div>
            <b>token_price: </b>
            {currentTokenPrice}
        </div>
        <div>
            <b>currency_from: </b>
            {currencyFrom}
        </div>
        <div>
            <b>currency_to: </b>
            {currencyTo}
        </div>
        <div>
            <b>bonus_percents: </b>
            {bonus_percents}
        </div>
        <div>
            <b>token_price: </b>
            {endDate}
        </div>
        <div>
            <b>name: </b>
            {name}
        </div>
    </div>
)

const mapStateToProps = ({ICOPhases}) => ({
    currentTokenPrice: ICOPhases.token_price,
    currencyFrom: ICOPhases.currency_from,
    currencyTo: ICOPhases.currency_to,
    bonus_percents: ICOPhases.bonus_percents,
    endDate: ICOPhases.end_date,
    name: ICOPhases.name,
})

export default connect(mapStateToProps)(PhasesStats)
