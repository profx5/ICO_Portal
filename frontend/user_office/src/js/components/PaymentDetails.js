import React from 'react';
import styled from 'styled-components';

const PaymentDetails = ({address, QRCode}) => {


    return (
        <Wrapper>
            <PaymentHead>Crowdsale address</PaymentHead>
            <CrowdsaleAddress>{address}</CrowdsaleAddress>
            <br/><br/>
            <PaymentHead>QR code</PaymentHead>
            <img src={QRCode} alt="QR code"/>
        </Wrapper>
    );
};

export default PaymentDetails;


const Wrapper = styled.div`

`;

const PaymentHead = styled.span`
    font-size: 18px;
    margin-bottom: 20px;
    display: block;
    font-weight: 600;
`;

const CrowdsaleAddress = styled.p`
    word-break: break-word;
`;