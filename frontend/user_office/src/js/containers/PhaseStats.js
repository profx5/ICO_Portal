import React from 'react'
import {connect} from 'react-redux'

const PhaseStats = ({
    currentTokenPrice,
    currencyFrom,
    currencyTo,
    bonus_percents,
    endDate,
    name,
}) => (
    <div>
        <div>
            <b>token price: </b>
            {currentTokenPrice}
        </div>
        <div>
            <b>currency from: </b>
            {currencyFrom}
        </div>
        <div>
            <b>currency to: </b>
            {currencyTo}
        </div>
        <div>
            <b>bonus percents: </b>
            {bonus_percents}
        </div>
        <div>
            <b>token price: </b>
            {endDate}
        </div>
        <div>
            <b>name: </b>
            {name}
        </div>
    </div>
)

const mapStateToProps = ({ICOPhaseStats}) => ({
    currentTokenPrice: ICOPhaseStats.get('token_price'),
    currencyFrom: ICOPhaseStats.get('currency_from'),
    currencyTo: ICOPhaseStats.get('currency_to'),
    bonus_percents: ICOPhaseStats.get('bonus_percents'),
    endDate: ICOPhaseStats.get('end_date'),
    name: ICOPhaseStats.get('name'),
})

export default connect(mapStateToProps)(PhaseStats)
