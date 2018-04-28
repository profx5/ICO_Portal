import React from 'react';
import {connect} from 'react-redux';

import styled from 'styled-components';

import Nav from '../components/Nav';



class NavSidebar extends React.Component {

    render() {
        return (

            <Sidebar>
                <Nav />
            </Sidebar>            
        );
    }
}


export default NavSidebar;



// STYLES

const Sidebar = styled.aside`

    background: #3172FD;
    width: 105px;
    min-width: 105px;
`;