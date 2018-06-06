import React from 'react';
import {connect} from 'react-redux';
//containers
import ContentWrapper from './js/containers/ContentWrapper';
import Warnings from './js/containers/Warnings';
import UserOffice from './js/containers/UserOffice';
import NavSidebar from './js/containers/NavSidebar';

// import WithGuard from './js/HOC/WithGuard';
// import Banner from './js/containers/Banner';

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

const mapStateToProps = ({user}) => ({
    
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(App);