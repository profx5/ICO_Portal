import React from 'react'
import styled from 'styled-components';
import {media} from './../../../utils/media';

import TransactionInfo from './TransactionInfo';

import iconCheckGreen from './../../../../img/check-green.svg';
import iconReload from './../../../../img/shape.svg';


const TransactionsRow = ({state, onIconClickHandler, openedTransaction, id, date, time, transferTxnHash, paymentTxnId, amount, currency, usdc_value, tokens, rate_usdc, bonus_percent, tokenPrice}) => {
    const isTokenRise = tokens > 0 ? true : false;
    const chainResolver = {
        ETH: 'https://rinkeby.etherscan.io/tx/',
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
        <React.Fragment>
            <Row className="TransactionRow">
                <Cell><img alt="State icon" src={state === 'ACTUAL' ? iconCheckGreen : iconReload}/></Cell>
                <Cell>{date}&nbsp;&nbsp;&nbsp;{time}</Cell>
                <Cell><a target="_blank" href={transferHashLink}>{txnHash}</a></Cell>
                <Cell><img alt="State icon" src={state === 'ACTUAL' ? iconCheckGreen : iconReload}/></Cell>
                <Cell>{amount}&nbsp;&nbsp;{currency}</Cell>
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
            </Row>
            {isOpened &&
                <Row>
                    <td colspan="6">
                        <div className="TransactionContent">
                            <TransactionInfo
                                tokenPrice={tokenPrice}
                                payementHashLink={payementHashLink}
                                transferHashLink={transferHashLink}
                                amount={parseFloat(amount)}
                                currency={currency}
                                rate_usdc={parseFloat(rate_usdc)}
                                usdc_value={parseFloat(usdc_value)}
                                bonus_percent={parseFloat(bonus_percent)}
                                tokens={tokens}
                            />
                        </div>
                    </td>
                </Row>
            }
        </React.Fragment>
    )
}


export default TransactionsRow;

const Row = styled.tr`
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
    .TransactionContent {
        flex-basis: 100%;
        font-size: 16px;
        height: auto;
        background: rgba(174, 200, 255, .07);
        padding: 35px 85px;
        ${media.xs} {
            font-size: 14px;
            padding: 35px 28px 35px 15px;
        }
    }
`;

const Cell = styled.td`
    text-align: center;
    &:not(.TransactionContent) {
        height: 66px;
        white-space: nowrap;
        font-size: 16px;
        border-top: 1px solid rgba(151, 151, 151, .2);
        ${media.xs} {
            font-size: 14px;
        }
    }
    &:nth-of-type(1) {
        padding-left: 20px;
        ${media.smPlus} {
            display: none;
        }
        img {
            width: 22px;
            height: 22px;
        }
    }
    &:nth-of-type(2) {
        padding-left: 40px;
        ${media.xs} {
            padding-left: 15px;
            text-align: left;
        }
    }
    &:nth-of-type(3) {
        a {
            width: 85%;
            display: block;
            overflow-x: scroll;
            margin: 0 auto;
            height: 100%;
            padding-top: 23px;
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
    }
    &:nth-of-type(4) {
        width: 50px;
        ${media.xs} {
            display: none;
        }
        img {
            width: 22px;
            height: 22px;
            position: relative;
            left: -30px;
        }
    }
    &:nth-of-type(7) {
        color: ${props => props.color};
        position: relative;
        right: 4px;
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
`;
