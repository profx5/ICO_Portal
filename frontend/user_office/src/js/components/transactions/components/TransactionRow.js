import React, {Component} from 'react'
import styled from 'styled-components';

import TransactionInfo from './TransactionInfo';

import iconCheckGreen from './../../../../img/check-green.svg';
import iconReload from './../../../../img/shape.svg';


const TransactionsRow = ({state, onIconClickHandler, openedTransaction, id, date, time, transferTxnHash, paymentTxnId, amount, currency, usdc_value, tokens, rate_usdc, bonus_percent}) => {
    const isTokenRise = tokens > 0 ? true : false;
    const chainResolver = {
        ETH: 'https://rinkeby.etherscan.io/',
        BTC: 'https://www.blockchain.com/en/btc/tx/',
        LTCT: 'https://chain.so/tx/LTCTEST/'
    };

    let payementHashLink, transferHashLink;
    let txnHash = transferTxnHash || null;
    let txnId = paymentTxnId || null;

    if (currency === "ETH") {
        payementHashLink = `${chainResolver.ETH}${txnHash}`
        transferHashLink = `${chainResolver.ETH}${txnId}`
    } else if (currency === "BTC") {
        payementHashLink = `${chainResolver.BTC}${txnHash}`
        transferHashLink = `${chainResolver.BTC}${txnId}`
    } else if (currency === "LTCT") {
        payementHashLink = `${chainResolver.LTCT}${txnHash}`
        transferHashLink = `${chainResolver.LTCT}${txnId}`
    } else {
        payementHashLink = '';
        transferHashLink = '';
    }

    const isOpened = openedTransaction === id ? true : false;

    return (
        <Row className="TransactionRow">
            <Cell>{date}&nbsp;&nbsp;&nbsp;{time}</Cell>
            <Cell><a target="_blank" href={transferHashLink}>{txnHash}</a></Cell>
            <Cell><img alt="State icon" src={state === 'ACTUAL' ? iconCheckGreen : iconReload}/></Cell>
            <Cell>{parseFloat(amount)}&nbsp;&nbsp;{currency}</Cell>
            <Cell>{usdc_value}</Cell>
            <Cell color={isTokenRise ? `rgb(17, 205, 86)` : `rgb(239, 32, 40)`}>
                {isTokenRise ? `+ ${tokens}` : `- ${tokens}`}
                <div className={`TransactionRow_extend ${isOpened ? "active" : ""}`} onClick={onIconClickHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="13">
                        <g fill="none" fillRule="evenodd">
                            <path fill="transparent" d="M-1319-321H121V822h-1440z"/>
                            <text fill="#4381FC" fontFamily="Palatino-Bold, Palatino" fontSize="17" fontWeight="bold" letterSpacing=".523" transform="translate(-11 -5)">
                            <tspan x="11" y="18">i</tspan>
                            </text>
                        </g>
                    </svg>
                </div>
            </Cell>
            {isOpened && 
                <Cell className="TransactionContent">
                    <TransactionInfo
                        payementHashLink={payementHashLink}
                        transferHashLink={transferHashLink}
                        amount={parseFloat(amount)}
                        currency={currency}
                        rate_usdc={parseFloat(rate_usdc)}
                        usdc_value={parseFloat(usdc_value)} 
                        bonus_percent={parseFloat(bonus_percent)}
                        tokens={tokens}
                    />
                </Cell>
            }
        </Row>
    )
}


export default TransactionsRow;

const Row = styled.div`
    flex-basis: 100%;
    display: flex;
    flex-flow: row wrap;
    .TransactionRow_extend {
        cursor: pointer;
        &, text {
            transition: all .25s ease;
        }
        &:hover {
            background: #4381FC;
            text {
                fill: white;
            }
        }
    }
    .TransactionRow_extend.active {
        background: #4381FC;
        text {
            fill: white;
        }
    }
`;

const Cell = styled.div`
    display: inline-flex;
    &:not(.TransactionContent) {
        justify-content: center;
        align-items: center;
        height: 66px;
        font-size: 16px;
        border-top: 1px solid rgba(151, 151, 151, .2);
    }
    &:nth-of-type(1) {
        flex-basis: 20%;
    }
    &:nth-of-type(2) {
        flex-basis: 30%;
        overflow-x: scroll;
        justify-content: flex-start;
        &::-webkit-scrollbar {
            height: 5px;
            width: 50px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgba(0,0,0,.1);
            border-radius: 10px;
            &:hover {
                background-color: rgba(0,0,0,.3);
            }
        } 
    }
    &:nth-of-type(3) {
        flex-basis: 5%;
        img {
            width: 22px;
            height: 22px;
        }
    }
    &:nth-of-type(4) {
        flex-basis: 15%;
    }
    &:nth-of-type(5) {
        flex-basis: 15%;
    }
    &:nth-of-type(6) {
        flex-basis: 15%;
        display: inline-flex;
        justify-content: flex-end;
        color: ${props => props.color};
        padding-right: 40px;
        div {
            width: 22px;
            height: 22px;
            border: 1px solid rgba(151, 151, 151, .5);
            border-radius: 22px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin-left: 10px;
        }
    }
    &.TransactionContent {
        flex-basis: 100%;
        font-size: 16px;
        height: auto;
        background: rgba(174, 200, 255, .07);
        padding: 35px 85px;
    }
`;
