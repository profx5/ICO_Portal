import React, {Component} from 'react'
import {connect} from 'react-redux'

import {KYCActions} from '../actions/KYCActions'

import KYCForm from '../components/KYCForm'
import KYCHeader from '../components/KYCHeader'

class KYC extends Component {
    componentDidMount() {
        this.props.getKYC()
    }
    render() {
        const {
            investmentThreshold,
            showForm,
            hideForm,
            isFormVisible,
            status,
            submitKYC_and_retriveKYC
        } = this.props

        return (
            <KYCHeader
                investmentThreshold={investmentThreshold}
                onClick={showForm}
                status={status} >
                <KYCForm
                    closeModal={hideForm}
                    submitKYC_and_retriveKYC={submitKYC_and_retriveKYC}
                    isFormVisible={isFormVisible} />
            </KYCHeader>
        )
    }
}

const mapStateToProps = ({KYC, user}) => ({
    isFormVisible: KYC.get('showForm'),
    status: KYC.get('status'),
    investmentThreshold: user.get('investment_threshold'),
})

const mapDispatchToProps = (dispatch) => ({
    showForm() {
        dispatch(KYCActions.showForm())
    },
    hideForm() {
        dispatch(KYCActions.hideForm())
    },
    getKYC() {
        dispatch(KYCActions.getKYCRequest())
    },
    submitKYC_and_retriveKYC(data) {
        dispatch(KYCActions.submitKYC_and_retriveKYC_Request(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(KYC)
