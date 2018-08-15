import React from 'react';
import styled from 'styled-components';

import ReferralInfo from '../containers/ReferralInfo';
import ReferralList from '../containers/ReferralList';
import ReferralRules from "../containers/ReferralRules";


class ReferralTab extends React.Component {

    render() {
        return (
            <Wrapper>
                <Head>Referrals</Head>
                <MainWrapper>
                    <ReferralInfo/>
                    <ReferralList/>
                    <ReferralRules/>
                </MainWrapper>
            </Wrapper>
        )
    }
}


export default ReferralTab;


const Wrapper = styled.div`
    height: calc(100% - 100px);
    margin-left: 60px;
    padding-bottom: 73px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
`;

const Head = styled.h2`
    font-size: 38px;
    line-height: 1;
    font-weight: 500;
    color: #233539;
    letter-spacing: -1.1px;
    margin-top: 34px;
    flex-basis: 100%;
    margin-bottom: 45px;
`;

const MainWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-flow: row wrap;
`;

