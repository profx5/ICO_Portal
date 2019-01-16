import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import {media} from 'js/utils/media';


const navigationItems = [
  {
    location: '/user_office/',
    caption: 'Investors cabinet',
    isActive: (match, location) => {
      if (!match) return false;
      return !location.pathname.startsWith('/user_office/referrals');
    }
  },
];

const HeaderNav = ({className}) => (
  <Wrapper className={className}>
    <NavList>
      {navigationItems.map(navigationItem => (
        <NavItem
            key={navigationItem.location}
            to={navigationItem.location}
            activeClassName='active' isActive={navigationItem.isActive}>
           {navigationItem.caption}
        </NavItem>
      ))}
    </NavList>
  </Wrapper>
);


export default HeaderNav;

const Wrapper = styled.div`
    height: 100%;
    ${media.xs} {
      background: #F5F6FA;
      padding-top: 15px;
      padding-bottom: 6px;
      height: 52px;
      overflow-x: scroll;
    }
`;

const NavList = styled.div`
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;

const NavItem = styled(NavLink)`
    height: 100%;
    font-weight: 400;
    color: #222121;
    margin-left: 38px;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    position: relative;
    ${media.xs} {
      font-size: 14px;
      margin-left: 16px;
    }
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
