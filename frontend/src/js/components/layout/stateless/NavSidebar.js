import React from 'react';
import styled from 'styled-components';
import {media} from 'js/utils/media';


const NavSidebar = ({children}) => {

    return (
        <React.Fragment>
            <Sidebar>{children}</Sidebar>
        </React.Fragment>
    );
}


export default NavSidebar;

const Sidebar = styled.aside`
    background: white;
    width: 79px;
    min-width: 79px;
    border-right: 1px solid #e6e8f1;
    padding-top: 150px;
    ${media.xs} {
        display: none;
    } 
`;
