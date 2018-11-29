import React from 'react';
import styled from 'styled-components';
import {media} from './../../utils/media';

import Title from './../common/Title';
import ICOProgress from './ICOProgress';
import BonusSheet from './components/BonusSheet';

import Banner from './../../../img/banner.jpg';


const Dashboard = (props) => {
    return (
        <Wrapper>
            <BannerWrapper />
            <Title>Dashboard</Title>
            <BonusSheet/>
            <ICOProgress/>
        </Wrapper>
    )
};


export default Dashboard;

const Wrapper = styled.div`
    flex: 1;
`;

const BannerWrapper = styled.div`
    width: 100%;
    height: 309px;
    background: url(${Banner}) no-repeat center left;
    background-size: cover;
    margin-top: 52px;
    border-radius: 3px;
    ${media.sm} {
        height: 200px;
    }
    ${media.xs} {
        height: 112px;
        margin-top: 12px;
        margin-bottom: 30px;
    }
`;
