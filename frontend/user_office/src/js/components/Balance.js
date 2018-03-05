import React from 'react';

const Balance = ({
    currentAmount
}) => (
    <div className="Header_balance col-md-3">
        <h3 className="Header_head">On-Chain balance</h3>
        <p className="Header_text Header_text-big">{currentAmount}</p>
        <button className="btn btn-primary">CONNECT WALLET</button>
    </div>
)

export default Balance
