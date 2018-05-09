import React from 'react';
import styled from 'styled-components';

import PersonalData from './PersonalData';
import Address from './Address';
import Documents from './Documents';



const Verification = (props) => {
    return (
        <Wrapper>
            <Head>Verification</Head>
            <PersonalData/>
            <Address/>
            <Documents/>
        </Wrapper>
    )
};


export default Verification;

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

