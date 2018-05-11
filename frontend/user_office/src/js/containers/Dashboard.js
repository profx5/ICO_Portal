import React from 'react';
import styled from 'styled-components';

import Invest from './Invest';
import ICOProgress from './ICOProgress';
import Currency from './Currency';
import Transactions from './Transactions';
import DepositTable from './DepositTable';


const Dashboard = (props) => {
    return (
        <Wrapper>
            <Invest/>
            <Head>Dashboard</Head>
            <ICOProgress/>
            <Currency/>
            <Transactions>
                <DepositTable/>
            </Transactions>
        </Wrapper>
    )
};

export default Dashboard;

const Wrapper = styled.div`
    flex: 1;
    height: calc(100% - 100px);
    margin-left: 60px;
    padding-bottom: 73px;
`;

const Head = styled.h2`
    font-size: 38px;
    line-height: 1;
    font-weight: 500;
    color: #233539;
    letter-spacing: -1.1px;
    margin-top: 34px;
`;