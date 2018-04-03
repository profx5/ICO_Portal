import React from 'react';
//components
import Button from './Button'
import Title from './Title'

const AccountInfo = ({ ethAccount, children }) => {
    const accountElement = ethAccount ? (<p className="Header_text Header_accountId">{ethAccount}</p>) : children

    return (
        <div className="Header_accountInfo col-md-3">
            <Title text='Your account' type='h3' />
            {accountElement}
            <a href='' className="Header_link">
                <Button text='PROFILE' info={true} />
            </a>

            <a href='/logout/' className="Header_link">
                <Button text='LOG OUT' danger={true} />
            </a>
        </div>
    )
}

export default AccountInfo
