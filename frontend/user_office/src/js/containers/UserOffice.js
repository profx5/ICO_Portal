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
import ICOPhasesStatsActions from '../actions/ICOPhasesStatsActions'
import DepositsActions from '../actions/DepositsActions'

class UserOffice extends Component {
    componentDidMount() {
        const {get_me, get_phases_stats, get_deposite} = this.props

        compose(
            get_me(),
            get_phases_stats(),
            get_deposite()
        )

    }

    render() {
       return (
            <div className="container-fluid">
                <div className="row h-100">
                    <Sidebar/>
                    <Header/>
                    <Content/>
                </div>
                <div className="row h-25">
                    <Footer />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    get_me() {
        dispatch(UserActions.get_user())
    },
    get_phases_stats() {
        dispatch(ICOPhasesStatsActions.get_phases_stats())
    },
    get_deposite() {
        dispatch(DepositsActions.get_deposite())
    }
})

export default connect(null, mapDispatchToProps)(UserOffice)
