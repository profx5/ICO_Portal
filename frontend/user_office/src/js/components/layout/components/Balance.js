import React from 'react';
import styled from 'styled-components';

import walletIcon from './../../../../img/icons/icon_wallet.svg';


const Balance = ({amount}) => {
    return (
        <Wrapper>
            <img alt="Wallet icon" src={walletIcon}/>
            <p>{(amount / 10 ** 18).toFixed(2)} <span>OGD</span></p>
        </Wrapper>
    )
}


export default Balance;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 23px;
    img {
        margin-right: 15px;
    }
    a {
        color: #3172fd;
        font-weight: 600;
        font-size: 20px;
    }
    span {
        font-weight: 400;
    }
`;
