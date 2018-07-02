import React from 'react'
/* import {tryExtractMetamaskAccount} from '../../web3'*/

export const SetAccountButton = ({onClick}) => (
    <button className="Header_link btn btn-success" onClick={onClick}>Set ETH account</button>
)

export class SetAccountForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            accountValue: '',
            filledWithMetaMask: false
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.metaMaskAccount !== '') {
            this.setState({accountValue: nextProps.metaMaskAccount,
                           filledWithMetaMask: true})
        }
    }

    submitForm = (event) => {
        event.preventDefault()

        this.props.handleSubmit(this.state.accountValue)
    }

    handleChange = (event) => {
        this.setState({accountValue: event.target.value,
                       filledWithMetaMask: false});
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
                                    {this.state.filledWithMetaMask &&
                                     <small id="emailHelp" className="form-text text-muted">This value was filled with Metamask.</small>}
                                </div>
                                <button type="submit" className="btn btn-primary">Set account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
