import React from 'react'
import Button from './Button'
import SetAccount from '../containers/SetAccount'

const AddOwnEthereumAccount = ({
    handleChange,
    ethereum_address
}) => (
    <SetAccount>
        { saveAccount => (
            <div className="input-group">
                <Button
                    onClick={saveAccount(ethereum_address)}
                    primary={true}
                    text="Add own Ethereum account"
                />
                <input
                    type='text'
                    className="form-control"
                    name='ethereum_address'
                    onChange={handleChange}
                    value={ethereum_address}
                    placeholder='0x........'
                />
            </div>
        )}
    </SetAccount>
)

export default AddOwnEthereumAccount
