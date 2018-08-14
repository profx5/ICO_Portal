import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';



const HeaderNav = ({}) => (
    <Wrapper>
        <NavList>
            <NavItem className="active"><Link to="/user_office">Investors cabinet</Link></NavItem>
{/*            <NavItem><a>Referral & Bonuses</a></NavItem>
            <NavItem><a>Fundraiser's cabinet</a></NavItem>*/}
        </NavList>
    </Wrapper>
)

export default HeaderNav;

const Wrapper = styled.div`
    height: 100%;
`;

const NavList = styled.ul`
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;

const NavItem = styled.li`
    height: 100%;
    color: #222121;
    margin-left: 38px;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    position: relative;
    &.active {
        color: #3172fd;
        &:before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            width: 100%;
            background: #3172fd;
        }
    }
    a {
        display: flex;
        align-items: center;
        height: 100%;
    }
`;