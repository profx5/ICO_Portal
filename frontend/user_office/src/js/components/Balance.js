import React from 'react';

const Balance = ({currentAmount, investClick}) => (
    <div className="Header_balance col-md-3">
        <h3 className="Header_head">On-Chain balance</h3>
        <p className="Header_text Header_text-big">{currentAmount}</p>
        <button className="btn btn-primary" onClick={investClick}>INVEST</button>
    </div>
)

export default Balance
