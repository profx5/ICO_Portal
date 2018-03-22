import React from 'react'
import {connect} from 'react-redux'
//components
import AccountInfo from '../components/AccountInfo'
import {SetAccountButton, SetAccountForm} from '../components/SetAccount'
//actions
import UserActions from '../actions/UserActions.js'

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
    ethAccount: user.eth_account,
    showSetAccountForm: user.showSetAccountForm
})

const mapDispatchToProps = (dispatch) => ({
    showForm() {
        dispatch(UserActions.showSetAccountForm())
    },
    hideForm() {
        dispatch(UserActions.hideSetAccountForm())
    },
    setAccount(data) {
        dispatch(UserActions.setAccount(data)).then(() => dispatch(UserActions.getUser()))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)
