import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import UserOffice from './js/containers/UserOffice'
import Banner from './js/containers/Banner'
import WithGuard from './js/HOC/withGuard'

const App = ({children}) => (
    <UserOffice>
        {children}
    </UserOffice>
)

const mapStateToProps = ({user}) => {
    const isEthereumAccountExist = user.get('eth_account') !== null;

    return {
        isAllowed: isEthereumAccountExist
    }
}

export default compose(
    connect(mapStateToProps),
    WithGuard(Banner)
)(App)
