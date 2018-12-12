import React from 'react';
import styled from 'styled-components';
import {media} from 'js/services/media';

import {Link} from 'react-router-dom';

const Footer = ({}) => {
    return (
        <Wrapper>
            <ul>
                <li><Link to="/user_office">White Paper</Link></li>
                <li><Link to="/user_office">ICO site</Link></li>
                <li><Link to="/user_office">User Agreement</Link></li>
            </ul>
            <Copyright>© 2018 Ongrid.pro</Copyright>
        </Wrapper>
    )
}


export default Footer;

const Wrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-end;
    flex-basis: 100%;
    text-align: center;
    margin-bottom: 40px;
    margin-top: 40px;
    ul {
        margin-bottom: 14px;
        li {
            margin-bottom: 5px;
            display: inline-block;
            ${media.xs} {
                display: block;
            }
            &:nth-of-type(2) {
                ${media.smPlus} {
                    margin: 0 25px;
                }
            }
            a {
                font-size: 14px;
                color: rgba(0,0,0,.5);
                transition: color .25s ease;
                ${media.xs} {
                    color: rgb(0,0,0);
                }
                &:hover {
                    color: rgb(0,0,0);
                }
            }
        }
    }
`;

const Copyright = styled.div`
    font-size: 14px;
    ${media.xs} {
        color: rgb(53, 119, 252);
    }
`;
