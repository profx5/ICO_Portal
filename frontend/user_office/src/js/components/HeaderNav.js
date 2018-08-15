import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

const navigationItems = [
  {
    location: '/user_office/',
    caption: 'Investors cabinet',
  },
  // {
  //   location: '/user_office/referrals',
  //   caption: 'Referrals',
  // },
];

const HeaderNav = () => (
  <Wrapper>
    <NavList>
      {navigationItems.map(navigationItem => (
        <NavItem key={navigationItem.location} to={navigationItem.location} activeClassName='active'>
           {navigationItem.caption}
        </NavItem>
      ))}
    </NavList>
  </Wrapper>
);

export default HeaderNav;

const Wrapper = styled.div`
    height: 100%;
`;

const NavList = styled.div`
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;

const NavItem = styled(NavLink)`
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
`;
