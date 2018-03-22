import React from 'react';

const AccountInfo = ({ ethAccount, children }) => {
    const accountElement = ethAccount ? (<p className="Header_text Header_accountId">{ethAccount}</p>) : children

    return (
        <div className="Header_accountInfo col-md-3">
            <h3 className="Header_head">Your account</h3>
            {accountElement}
            <a href="#" className="Header_link">
                <button className="btn btn-info">PROFILE</button>
            </a>
            <a href="/logout/" className="Header_link">
                <button className="btn btn-danger">LOG OUT</button>
            </a>
        </div>
    )
}

export default AccountInfo
