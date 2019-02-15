import React from 'react';
import {connect} from 'react-redux';
//containers
import ContentWrapper from 'ContentWrapper';
import Layout from 'js/components/layout/Layout';

import { withRouter } from 'react-router';


const App = () => {
    return (
        <div>
            <ContentWrapper layout={<Layout/>}/>
        </div>
    )
}

export default withRouter(connect()(App));
