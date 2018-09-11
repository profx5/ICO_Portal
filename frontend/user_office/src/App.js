import React from 'react';
import {connect} from 'react-redux';
//containers
import ContentWrapper from './ContentWrapper';
import Layout from './js/components/layout/Layout';

import { withRouter } from 'react-router';


class App extends React.Component {

    render() {

        return (
            <div>
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
