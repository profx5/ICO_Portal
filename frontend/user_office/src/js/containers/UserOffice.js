import React, {Component} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import Footer from '../components/Footer'
import Button from '../components/Button'
import Title from '../components/Title'
import Header from './Header'
import Modal from './Modal'
import {UserActions} from '../actions/UserActions'
import {ICOInfoActions} from '../actions/ICOInfoActions'
import {DepositsActions} from '../actions/DepositsActions'
import {BountiesActions} from '../actions/BountiesBalanceActions'
import {PhaseActions} from '../actions/PhaseActions'

class UserOffice extends Component {
    componentDidMount() {
        const {getMe, getPhaseStats, getDeposite, getPhase} = this.props

        compose(getMe, getPhaseStats, getDeposite, getPhase)()
    }

    handleClickForTransferModalWindow = (e) => {
        this.props.postTransferRequest()
    }

    render() {
        const { transfaerAllowed, transferErrorMessage } = this.props

        return (
            <div className="container-fluid relative">
                <div className="row h-100">
                    <Header/>
                </div>
                <div className="row h-25">
                    <Footer/>
                </div>
                <Modal>
                    { (closeModal) => (
                        <div className='confirm-modal in-middle'>
                            <Title
                                text='Do you realy want to confirm that ?'
                                type='h3'
                                center={true}
                            />
                            <Button
                                text='tranfer bonus in tokens'
                                success={true}
                                onClick={ compose(closeModal, this.handleClickForTransferModalWindow ) }
                            />
                            <Button
                                text='Cancel'
                                danger={true}
                                onClick={closeModal}
                            />
                            <Title text={transfaerAllowed ? "transfer is Allowed" : transferErrorMessage} />
                        </div>
                    )}
                </Modal>
                {this.props.children}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMe() {
        dispatch(UserActions.getUserRequest())
    },
    getPhaseStats() {
         dispatch(ICOInfoActions.getICOInfoRequest())
    },
    getDeposite() {
        dispatch(DepositsActions.getDepositsRequest())
    },
    postTransferRequest() {
        dispatch(BountiesActions.postTransferRequest())
    },
    getPhase() {
        dispatch(PhaseActions.getPhaseRequest())
    }
})

const mapStateToProps = ({bountiesBalance}) => ({
    transfaerAllowed: bountiesBalance.getIn(['transfer', 'success']),
    transferErrorMessage: bountiesBalance.getIn(['transfer', 'error'])
})

export default connect(mapStateToProps, mapDispatchToProps)(UserOffice)
