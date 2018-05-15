import React from 'react'
import {connect} from 'react-redux'
import AccountInfo from '../components/AccountInfo'
import {SetAccountButton, SetAccountForm} from '../components/SetAccount'
//actions
import * as UserActions from '../actions/UserActions.js'

const Account = ({
    ethAccount,
}) => {
    const accounts = ethAccount || ''

        if (ethAccount){
            return (
                <AccountInfo />
            )
        } else {
            return (
                <AccountInfo>
                    <SetAccountButton onClick={showForm} />
                    {showSetAccountForm &&
                     <SetAccountForm closeModal={hideForm} handleSubmit={setAccount} metaMaskAccount={metaMaskAccount} />}
                </AccountInfo>
            )
        }
    }
}

const mapStateToProps = ({user}) => ({
    ethAccount: user.get('eth_account'),
})

export default connect(mapStateToProps)(Account)
