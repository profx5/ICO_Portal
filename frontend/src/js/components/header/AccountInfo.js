import React from 'react';


export default class AccountInfo extends React.Component {

    render () {
        return (
            <div className="Header_accountInfo col-md-3">
                <h3 className="Header_head">Your account</h3>
                <p className="Header_text Header_accountId">{this.props.accountId}</p>
                <a href="#" className="Header_link">
                    <button className="btn btn-info">PROFILE</button>
                </a>
                <a href="#" className="Header_link">
                    <button className="btn btn-danger">LOG OUT</button>
                </a>
            </div>
        );
    }
}