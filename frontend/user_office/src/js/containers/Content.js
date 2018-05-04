import React from 'react';
import styled from 'styled-components';

import Invest from './Invest';
import ICOProgress from './ICOProgress';
import Currency from './Currency';
import Transactions from './Transactions';
import DepositTable from './DepositTable';


const Content = (props) => {
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


export default Content;

const Wrapper = styled.div`
    flex: 1;
    height: 100%;
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