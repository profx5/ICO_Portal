import React from 'react';
import styled from 'styled-components';

import Nav from './Nav';


const NavSidebar = ({children}) => {

    return (

        <Sidebar>
            {children}
        </Sidebar>            
    );
}


export default NavSidebar;

const Sidebar = styled.aside`

    background: white;
    width: 79px;
    min-width: 79px;
    border-right: 1px solid #e6e8f1;
    padding-top: 150px;
`;
