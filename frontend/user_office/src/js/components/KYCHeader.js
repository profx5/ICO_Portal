import React, {Component, Children} from 'react'
import Button from './Button'

class KYCHeader extends Component {

    static defaultProps = {
        messages: {
            waiting: "Your KYC is waiting for approval",
            declined: "Your KYC was declined",
            alert: 'You did not pass KYC confirmation. Your invstment threshold is limited to'
        }
    }

    static Waiting = ({message}) => (
        <div className="alert alert-primary" role="alert">
            <p>{message}</p>
        </div>
    )

    static Declined = ({message}) => (
        <div className="alert alert-danger" role="alert">
            <p>{message}</p>
        </div>
    )

    static Alert = ({onClick, investmentThreshold, alert, message}) => (
        <div className="alert alert-warning" role="alert">
            <p>{message} {investmentThreshold}</p>
            <Button text="Pass KYC" onClick={onClick} success={true}/>
        </div>
    )

    _renderHeaders = (status, alertProps, {waiting, declined, alert}) => {
        if(status === 'WAITING') { return <KYCHeader.Waiting message={waiting}/> }
        else if(status === 'DECLINED') {return <KYCHeader.Declined message={declined}/>}
        else if(status === 'APPROVED') {return }
        return <KYCHeader.Alert {...alertProps} message={alert}/>
    }

    render() {
        const {status, onClick, investmentThreshold, messages, children} = this.props
        const alertProps = {onClick, investmentThreshold}
        return (
            <div className="col-md-12">
                {this._renderHeaders(status, alertProps, messages)}
                {Children.only(children)}
            </div>
        )
    }
}

export default KYCHeader
