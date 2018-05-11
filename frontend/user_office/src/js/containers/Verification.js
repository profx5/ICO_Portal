import React from 'react';
import styled from 'styled-components';

import PersonalData from './PersonalData';
import Address from './Address';
import Documents from './Documents';
import VerificationInfo from './VerificationInfo';



const Verification = (props) => {
    return (
        <Wrapper className="Verification">
            <Head>Verification</Head>
            <MainWrapper>
                <PersonalData/>
                <Address/>
                <Documents/>
            </MainWrapper>
            <InfoWrapper>
                <VerificationInfo/>
            </InfoWrapper>
        </Wrapper>
    )
};


export default Verification;

const Wrapper = styled.div`
    flex: 1;
    height: 100%;
    margin-left: 60px;
    padding-bottom: 73px;
    display: flex;
    flex-flow: row wrap;
`;

const Head = styled.h2`
    font-size: 38px;
    line-height: 1;
    font-weight: 500;
    color: #233539;
    letter-spacing: -1.1px;
    margin-top: 34px;
    flex-basis: 100%;
`;

const MainWrapper = styled.div`
    flex: 1;
`;

const InfoWrapper = styled.div`
    
`;
