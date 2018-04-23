import React from 'react'
import {connect} from 'react-redux'
import AccountInfo from '../components/AccountInfo'

const Account = ({
    ethAccount,
}) => {
    const accounts = ethAccount || ''

    return (
        <AccountInfo ethAccount={ accounts }/>
    )
}

const mapStateToProps = ({user}) => ({
    ethAccount: user.get('eth_account'),
})

export default connect(mapStateToProps)(Account)
