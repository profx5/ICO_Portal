import React from 'react';
import {connect} from 'react-redux';
//containers
import ContentWrapper from './js/containers/ContentWrapper';
import Warnings from './js/containers/Warnings';
import UserOffice from './js/containers/UserOffice';
import NavSidebar from './js/containers/NavSidebar';

import { withRouter } from 'react-router';


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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));