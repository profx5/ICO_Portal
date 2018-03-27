import React from 'react'
import {connect} from 'react-redux'
//components
import AccountInfo from '../components/AccountInfo'
import {SetAccountButton, SetAccountForm} from '../components/SetAccount'
//actions
import {
    setAccountRequest, 
    hideSetAccountForm,
    showSetAccountForm
} from '../actions/UserActions.js'

class Account extends React.Component{
    render() {
        const {
            ethAccount,
            showSetAccountForm,
            showForm,
            hideForm,
            setAccount
        } = this.props

        if (ethAccount){
            return (
                <AccountInfo ethAccount={ethAccount} />
            )
        } else {
            return (
                <AccountInfo>
                    <SetAccountButton onClick={showForm}/>
                    {showSetAccountForm &&
                     <SetAccountForm closeModal={hideForm} handleSubmit={setAccount} />}
                </AccountInfo>
            )
        }
    }
}

const mapStateToProps = ({user}) => ({
    ethAccount: user.get('eth_account'),
    showSetAccountForm: user.get('showSetAccountForm')
})

const mapDispatchToProps = (dispatch) => ({
    showForm() {
        dispatch(showSetAccountForm())
    },
    hideForm() {
        dispatch(hideSetAccountForm())
    },
    setAccount(data) {
        dispatch(setAccountRequest(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)
