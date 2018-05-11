import React from 'react';
import {connect} from 'react-redux';

import styled from 'styled-components';

import ICOSidebarInfo from './ICOSidebarInfo';



class StatusSidebar extends React.Component {

    render() {
        return (
            <Sidebar>
                <ICOSidebarInfo/>          
            </Sidebar>          
        );
    }
}


export default StatusSidebar;



// STYLES

const Sidebar = styled.aside`
    background: #FBFBFB;
    width: 271px;
    min-width: 271px;
    height: calc(100% - 100px);
    padding: 92px 32px;
    margin-left: 38px;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.02);
`;