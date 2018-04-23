import React from 'react';
import Button from './Button'
import Title from './Title'

const Balance = ({currentAmount, investClick}) => (
    <div className="Header_balance col-md-3">
        <Title type='h3' text='On-Chain balance'/>
        <p className="Header_text Header_text-big">{currentAmount}</p>
        <Button primary={true} text='INVEST' onClick={investClick}/>
    </div>
)

export default Balance
