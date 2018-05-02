import React from 'react';
import styled from 'styled-components';
//components
import Button from './Button'

const Balance = ({currentAmount, investClick}) => (
    <Wrapper>
        <Title>On-Chain balance:</Title>
        <Text>{currentAmount} TKN</Text>
        <ButtonWrapper>
            <Button text='Buy TKN' onClick={investClick}/>
        </ButtonWrapper>
    </Wrapper>
)

export default Balance

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;


const Title = styled.h3`
    font-size: 16px;
    margin-right: 7px;
`;


const Text = styled.p`
    font-size: 25px;
    color: #3172fd;
    margin-right: 30px;
`;

const ButtonWrapper = styled.div`
    width: 165px;
`;