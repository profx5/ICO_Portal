import React from 'react'
import {connect} from 'react-redux'
import KYCActions from '../actions/KYCActions'
//components
import {
    KYCHeaderAlert,
    KYCHeaderWaiting,
    KYCHeaderDeclined
} from '../components/KYCHeader'
import KYCForm from '../components/KYCForm'
//types
import {
    KYC_STATE_WAITING,
    KYC_STATE_DECLINED
} from '../types/KYCTypes'

class KYC extends React.Component {
    componentDidMount() {
        this.props.getKYC()
    }
    render() {
        const {
            investmentThreshold,
            showForm,
            hideForm,
            state,
            isFetched,
            isFormVisible,
            submitKYC_and_retriveKYC
        } = this.props

        let header

        if (isFetched) {
            switch (state) {
                case KYC_STATE_WAITING:
                    header = (<KYCHeaderWaiting />)
                    break
                case KYC_STATE_DECLINED:
                    header = (<KYCHeaderDeclined />)
                    break
                default:
                    header = (
                        <React.Fragment>
                            <KYCHeaderAlert investmentThreshold={investmentThreshold} onClick={showForm} />
                            {isFormVisible && 
                                <KYCForm 
                                    closeModal={hideForm}
                                    submitKYC_and_retriveKYC={submitKYC_and_retriveKYC}
                                />
                            }
                        </React.Fragment>
                    )
            }

            return header
        } else {
            return null
        }
    }
}

const mapStateToProps = ({KYC, user}) => ({
    isFormVisible: KYC.showForm,
    state: KYC.state,
    investmentThreshold: user.investment_threshold,
    isFetched: KYC.isFetched
})

const mapDispatchToProps = (dispatch) => ({
    showForm() {
        dispatch(KYCActions.showForm())
    },
    hideForm() {
        dispatch(KYCActions.hideForm())
    },
    getKYC() {
        dispatch(KYCActions.getKYC())
    },
    submitKYC_and_retriveKYC(data) {
        dispatch(KYCActions.submitKYC_and_retriveKYC(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(KYC)
