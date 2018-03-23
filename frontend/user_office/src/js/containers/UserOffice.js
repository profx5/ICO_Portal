import React, {Component} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
//components
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'
import Footer from '../components/Footer'
//containers
import Header from './Header'
//actions
import UserActions from '../actions/UserActions'
import ICOPhaseStatsActions from '../actions/ICOPhaseStatsActions'
import DepositsActions from '../actions/DepositsActions'

class UserOffice extends Component {
    componentDidMount() {
        const {getMe, getPhaseStats, getDeposite} = this.props

        compose(getMe(), getPhaseStats(), getDeposite())
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row h-100">
                    <Header/>
                    <Content/>
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
        dispatch(UserActions.getUser())
    },
    getPhaseStats() {
        dispatch(ICOPhaseStatsActions.getPhaseStats())
    },
    getDeposite() {
        dispatch(DepositsActions.getDeposite())
    }
})

export default connect(null, mapDispatchToProps)(UserOffice)
