import React from 'react';
import styled from 'styled-components';

import Nav from './components/Nav';


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

    background: white;
    width: 79px;
    min-width: 79px;
    border-right: 1px solid #e6e8f1;
    padding-top: 150px;
`;