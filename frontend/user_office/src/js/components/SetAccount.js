import React from 'react'

function tryExtractMetamaskAccount() {
    if (typeof window.web3 !== 'undefined') {
        return [window.web3.eth.defaultAccount, true]
    } else {
        return ['', false]
    }
}

export const SetAccountButton = ({onClick}) => (
    <button className="Header_link btn btn-success" onClick={onClick}>Set ETH account</button>
)

export class SetAccountForm extends React.Component {
    constructor(props) {
        super(props)

        const [metaMaskAccount, filled] = tryExtractMetamaskAccount()

        this.state = {
            accountValue : metaMaskAccount,
            filledWithMetamask: filled
        }

        this.submitForm = this.submitForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    submitForm(event) {
        event.preventDefault()

        this.props.handleSubmit(this.state.accountValue)
    }

    handleChange(event) {
        this.setState({accountValue: event.target.value,
                       filledWithMetamask: false});
    }

    render() {
        return(
            <div className="modal" id="SetAccountForm" tabIndex="-1" style={{display: 'block'}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={this.submitForm}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Set ETH account</h5>
                                <button type="button" className="close" onClick={this.props.closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="account">Account</label>
                                    <input type="text" value={this.state.accountValue} className="form-control" id="account" onChange={this.handleChange} />
                                    {this.state.filledWithMetamask &&
                                     <small id="emailHelp" className="form-text text-muted">This value is filled with Metamask.</small>}
                                </div>
                                <button type="submit" className="btn btn-primary">Submit KYC</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
