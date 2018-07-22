import React from 'react';
import {connect} from 'react-redux';
//containers
import ContentWrapper from './js/containers/ContentWrapper';
import Warnings from './js/containers/Warnings';
import UserOffice from './js/containers/UserOffice';
import NavSidebar from './js/containers/NavSidebar';
import Layout from './js/containers/Layout';

import { withRouter } from 'react-router';


class App extends React.Component {

    render() {

        return (
            <div>
                {/*<Warnings/>*/}
                <ContentWrapper 
                    layout={<Layout/>}
                />
            </div>
        )
    }
}

const mapStateToProps = ({UI}) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
