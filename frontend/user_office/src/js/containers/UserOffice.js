import React, {Component} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
//components
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import Title from '../components/Title'
//containers
import Header from './Header'
import Modal from './Modal'
//actions
import {User} from '../actions/UserActions'
import {ICOInfo} from '../actions/ICOInfoActions'
import {DepositAction} from '../actions/DepositsActions'
import {Bountie} from '../actions/BountiesBalanceActions'

class UserOffice extends Component {
    componentDidMount() {
        const {getMe, getPhaseStats, getDeposite} = this.props

        compose(getMe, getPhaseStats, getDeposite)()
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
                                onClick={this.handleClickForTransferModalWindow}
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
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMe() {
        dispatch( User.getUserRequest() )
    },
    getPhaseStats() {
         dispatch( ICOInfo.getICOInfoRequest() )
    },
    getDeposite() {
        dispatch( DepositAction.getDepositRequest() )
    },
    postTransferRequest() {
        dispatch( Bountie.postTransferRequest() )
    }
})

const mapStateToProps = ({bountiesBalance}) => ({
    transfaerAllowed: bountiesBalance.getIn(['transfer', 'success']),
    transferErrorMessage: bountiesBalance.getIn(['transfer', 'error'])
})

export default connect(mapStateToProps, mapDispatchToProps)(UserOffice)
