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

    submitForm(data){
        this.props.submitKYC(data)
    }

    render() {
        const {
            investmentThreshold,
            showForm,
            hideForm,
            state,
            isFetched,
            isFormVisible
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
                            {isFormVisible && <KYCForm handleSubmit={this.submitForm.bind(this)} closeModal={hideForm}/>}
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
    submitKYC(data) {
        dispatch(KYCActions.submitKYC(data)).then(() => dispatch(KYCActions.getKYC()))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(KYC)
