import React from 'react';
import styled from 'styled-components';

import Utils from '../utils';


class ReferralRules extends React.Component {

    render() {
        return (
            <Wrapper>
                <Title>Referral program rules</Title>
                <Content>{Utils.lorem()}</Content>
            </Wrapper>
        )
    }
}

export default ReferralRules;


const Wrapper = styled.div`
    height: auto;
    padding: 42px 30px 42px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    margin-bottom: 30px;
    width: 500px;
`;

const Title = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #323c47;
    letter-spacing: 0.1px;
    margin-bottom: 45px;
`;

const Content = styled.div``;
