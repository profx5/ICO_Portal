import {Component} from 'react'
import {connect} from 'react-redux'
import {UserActions} from '../actions/UserActions'

class SetAccount extends Component {
    onAddEthereumAccount = address => e => {
        this.props.setAccountRequest(address)
    }

    render() {
        const { children } = this.props
        const childrenWithProps = children.call(null, this.onAddEthereumAccount)

        return childrenWithProps
    }
}

const mapDispatchToProps = (dispatch) => ({
    setAccountRequest(address) {
        dispatch( UserActions.setAccountRequest(address) )
    }
})

export default connect(null, mapDispatchToProps)(SetAccount)
