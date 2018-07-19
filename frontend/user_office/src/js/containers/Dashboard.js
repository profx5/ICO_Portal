import React from 'react';
import styled from 'styled-components';

import ICOProgress from './ICOProgress';

import Banner from './../../img/Banner_Vera.png';


const Dashboard = (props) => {
    return (
        <Wrapper>
            <BannerWrapper />
            <Head>Dashboard</Head>
            <ICOProgress/>
        </Wrapper>
    )
};

export default Dashboard;

const Wrapper = styled.div`
    flex: 1;
    height: calc(100% - 100px);
    margin-left: 55px;
    margin-right: 55px;
    padding-bottom: 73px;
`;

const Head = styled.h2`
    font-size: 38px;
    line-height: 1;
    font-weight: 400;
    color: #233539;
    letter-spacing: 0.8px;
    margin-top: 65px;
`;

const BannerWrapper = styled.div`
    width: 100%;
    height: 309px;
    background: url(${Banner}) no-repeat center;
    background-size: cover;
    margin-top: 52px;
    border-radius: 3px;
`;
