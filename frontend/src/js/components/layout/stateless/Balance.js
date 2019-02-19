import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {media} from 'js/utils/media';

import walletIcon from 'img/icons/icon_wallet.svg';


const Balance = ({amount}) => {
    return (
        <Wrapper>
            <p className="Balance_head">Balance</p>
            <div className="Balance_amountWrapper">
                <img alt="Wallet icon" src={walletIcon}/>
                <p className="Balance_amount">{(amount / 10 ** 18).toFixed(2) || 0.00} <span>OGD</span></p>
            </div>
        </Wrapper>
    )
}

Balance.propTypes = {
    amount: PropTypes.number
}


export default Balance;

const Wrapper = styled.div`
    position: relative;
    padding: 0 23px;
    ${media.sm} {
        padding-right: 0;
    }
    ${media.xs} {
        flex-wrap: wrap;
    }
    img {
        margin-right: 15px;
        ${media.xs} {
            height: 14px;
            width: auto;
            margin-right: 8px;
        }
    }
    a {
        color: #3172fd;
        font-weight: 600;
        font-size: 20px;
    }
    span {
        font-weight: 400;
    }
    .Balance_head {
        ${media.xs} {
            font-size: 12px;
            display: block;
            text-align: right;
            margin-bottom: 6px;
        }
        ${media.smPlus} {
            display: none;
        }
    }
    .Balance_amountWrapper {
        white-space: nowrap;
        display: flex;
        align-items: center;
    }
    .Balance_amount {
        color: #3172fd;
        ${media.xs} {
            font-size: 14px;
            white-space: nowrap;
        }   
    }
`;
