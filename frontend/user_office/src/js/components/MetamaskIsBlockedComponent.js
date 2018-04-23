import React from 'react'
import AddOwnEthereumAccount from './AddOwnEthereumAccount'
import Button from './Button'

const MetamaskIsBlockedComponent = ({
    ethereum_address,
    handleChange,
    onGenerateAccount
}) => (
    <header>
        <div className='overlay-wrapper in-middle'>
            <div className='modal-for-banner'>
                Please unblock your or set your own ethereum account or add your own account
                <AddOwnEthereumAccount
                    ethereum_address={ethereum_address}
                    handleChange={handleChange}
                />
                <Button
                    text='Generate new acount'
                    info={true}
                    onClick={onGenerateAccount}
                />
            </div>
            <button className='btn btn-primary' onClick={() => {
                window.location.reload()
            }}>
                refresh
            </button>
        </div>
    </header>
)

export default MetamaskIsBlockedComponent
