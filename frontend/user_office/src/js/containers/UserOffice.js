import React, {Component} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
//components
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
//containers
import Header from './Header'
//actions
import {getUserRequest} from '../actions/UserActions'
import {getPhaseStatsRequest} from '../actions/ICOPhaseStatsActions'
import {getDepositRequest} from '../actions/DepositsActions'

class UserOffice extends Component {
    componentDidMount() {
        const {getMe, getPhaseStats, getDeposite} = this.props

        compose(getMe, getPhaseStats, getDeposite)()
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row h-100">
                    <Header/>
                </div>
                <div className="row h-25">
                    <Footer/>
                </div>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMe() {
        dispatch(getUserRequest())
    },
    getPhaseStats() {
         dispatch( getPhaseStatsRequest() )
    },
    getDeposite() {
        dispatch(getDepositRequest())
    }
})

export default connect(null, mapDispatchToProps)(UserOffice)
