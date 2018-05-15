import React from 'react'
//containers
import ContentWrapper from './js/containers/ContentWrapper'
import Warnings from './js/containers/Warnings'
import UserOffice from './js/containers/UserOffice'
import NavSidebar from './js/containers/NavSidebar'

const App = () => {
    return (
        <div>
            <Warnings/>
            <ContentWrapper
                left={<NavSidebar/>}
                rest={<UserOffice/>}
            />
        </div>
    )
}

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
