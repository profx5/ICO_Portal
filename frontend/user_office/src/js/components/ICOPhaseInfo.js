import React from 'react';
import styled from 'styled-components';

const ICOPhaseInfo = ({phaseName, discount, endDate}) => (
    <div>
        <Title>Current ico phase</Title>
        <Text>Name: {phaseName}</Text>
        <Text>Discount: {discount}%</Text>
        <Text>End date: {endDate}</Text>
    </div>
)

export default ICOPhaseInfo;

const Title = styled.span`
    display: block;
    font-size: 18px;
    margin-bottom: 9px;
    color: #3172fd;
    font-weight: 600;
`;

const Text = styled.span`
    display: block;
    margin-bottom: 9px;
    color: #222121;
    &:last-child {
        margin-bottom: 22px;
    }
`;

