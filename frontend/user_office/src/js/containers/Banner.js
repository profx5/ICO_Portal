import React, {Component} from 'react'
import {connect} from 'react-redux'
import {UserActions} from '../actions/UserActions'
import AccountFromMetamask from '../components/AccountFromMetamask'
import MetamaskIsBlockedComponent from '../components/MetamaskIsBlockedComponent'
import HeaderAboutBlocked from '../components/HeaderAboutBlocked'
import utils from '../_utils'

class Banner extends Component {
    state = {
        ethereum_address: ''
    }

    componentDidMount() {
        window.addEventListener('load', this.props.detectMetamaskAccount)
    }
    onGenerateAccount = () => {
        this.props.setGeneretedAccount()
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({[name] : value})
    }

    render() {
        const {
            showOptionsForSettingAccount,
            metamaskIsBlocked,
            metamaskAccount
         } = this.props

        return (
            <div>
                {showOptionsForSettingAccount &&
                    <HeaderAboutBlocked
                        handleChange={this.handleChange}
                        ethereum_address={this.state.ethereum_address}
                        onGenerateAccount={this.onGenerateAccount}
                        render={() => {
                            return (
                                utils.path(window, 'web3') && (
                                    <AccountFromMetamask
                                        metamaskAccount={metamaskAccount}
                                    />
                                )
                            )
                        }}
                    />
                }
                {metamaskIsBlocked &&
                    <MetamaskIsBlockedComponent
                        handleChange={this.handleChange}
                        ethereum_address={this.state.ethereum_address}
                        onGenerateAccount={this.onGenerateAccount}
                    />
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    setGeneretedAccount() {
        dispatch( UserActions.setGeneretedAccount() )
    },
    detectMetamaskAccount() {
        dispatch( UserActions.detectMetamaskAccount() )
    }
})

const mapStaeToProps = ({user, metamask}) => ({
    showOptionsForSettingAccount: metamask.get('showOptionsForSettingAccount'),
    metamaskIsBlocked: metamask.get('metamaskIsBlocked'),
    userEthereumAccount: user.get('eth_account'),
    metamaskAccount: user.get('metamaskAccount')
})

export default connect(mapStaeToProps, mapDispatchToProps)(Banner)
