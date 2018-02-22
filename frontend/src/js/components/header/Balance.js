import React from 'react';


export default class Balance extends React.Component {
    constructor(props) {
        super(props);

    }

    render () {
        return (
            <div className="Header_balance col-md-3">
                <h3 className="Header_head">On-Chain balance</h3>
                <p className="Header_text Header_text-big">{this.props.currentAmount}</p>
                <button className="btn btn-primary">CONNECT WALLET</button>
            </div>
        );
    }
}