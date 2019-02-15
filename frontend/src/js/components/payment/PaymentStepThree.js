import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {canSendTransaction} from 'GlobalWeb3';
import QRCode from 'qrcode';
import {media} from 'js/utils/media';

import Button from 'js/components/common/Button';

import * as InvestActions from 'js/actions/InvestActions';
import * as UIActions from "js/actions/UIActions";

import qrIcon from 'img/icon_qr_big.svg';


class PaymentStepThree extends React.Component {

    componentDidMount() {
        const {setStep} = this.props;
        setStep(3);
    }

    generateQRCode = (text) => {
        QRCode.toDataURL(text).then(url => {
            this.props.setQRCode(url);
        });
    };

    copyToClipboard = () => {
        const {investCurrency, crowdsaleAddress, altCrowdsaleaddress} = this.props;
        let text = investCurrency === 'ETH' ? crowdsaleAddress : altCrowdsaleaddress;
        if (window.clipboardData && window.clipboardData.setData) {

            return window.clipboardData.setData("Text", text);
        }
        else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            let textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed";
            document.body.appendChild(textarea);
            textarea.select();
            try {
                return document.execCommand("copy");
            } catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                return false;
            } finally {
                document.body.removeChild(textarea);
            }
        }
    };

    sendTransactionInit = () => {
        const {crowdsaleAddress, investAmount, eth_account, sendTransactionInit, showModal} = this.props;
        let canSendTransactionResponse = canSendTransaction(eth_account);

        if (!canSendTransactionResponse[0]) {
            showModal({
                modalHead: 'Warning',
                modalContent: canSendTransactionResponse[1]
            })
        } else sendTransactionInit({senderAccount: eth_account, receiverAccount: crowdsaleAddress, value: investAmount});
    };

    render() {

        const {investCurrency, investAmount, tokensAmount, crowdsaleAddress, qrcode, altCrowdsaleaddress} = this.props;
        if (investCurrency === 'ETH') {
            this.generateQRCode(crowdsaleAddress || '0');
        } else {
            this.generateQRCode(altCrowdsaleaddress || '0')
        }

        const tokensAmountString = tokensAmount > 0 ? tokensAmount.toFixed(2) : '0';

        return (
            <Wrapper>
                <Head>Buy tokens</Head>
                {investAmount > 0 &&
                <div>
                    <Row className="PaymentRow PaymentRow-1">
                        <RowPart className="part">
                            <div className="head">Payment</div>
                            <div className="amount">
                                {tokensAmountString}
                                <span>&nbsp;OGD</span> &nbsp;
                                <span>=</span>&nbsp; {investAmount > 0 ? investAmount : '0'}
                                <span>&nbsp;{investCurrency}</span>
                            </div>
                            <div className="desc">Rate may change due to high volatility of crypto</div>
                        </RowPart>
                        <RowPart className="part">
                            <BtnLink to="/user_office/payment/method">
                                <BtnWrapper>
                                    <Button text="Change amount"/>
                                </BtnWrapper>
                            </BtnLink>
                        </RowPart>
                    </Row>
                    {investCurrency === 'ETH' &&
                    <div>
                        <Row className="PaymentRow PaymentRow-2">
                            <div className="text">
                                To buy tokens just copy an address below (or scan QR code&nbsp;
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                                    <g fill="none" fillRule="evenodd">
                                        <path fill="#F5F6FA" d="M-717-723H723V517H-717z"/>
                                        <g fill="#000" fillRule="nonzero">
                                        <path
                                            d="M6.719 0H.469A.469.469 0 0 0 0 .469v6.25c0 .259.21.468.469.468h6.25c.259 0 .468-.21.468-.468V.469A.469.469 0 0 0 6.72 0zM6.25 6.25H.937V.937H6.25V6.25z"/>
                                        <path
                                            d="M4.531 2.188H2.656a.469.469 0 0 0-.469.468v1.875c0 .26.21.469.47.469H4.53c.261 0 .47-.21.47-.469V2.656a.469.469 0 0 0-.469-.469zm-.468 1.874h-.938v-.937h.938v.938zM15.531 0h-6.25a.469.469 0 0 0-.469.469v6.25c0 .259.21.468.47.468h6.25c.258 0 .468-.21.468-.468V.469A.469.469 0 0 0 15.531 0zm-.469 6.25H9.75V.937h5.313V6.25z"/>
                                        <path
                                            d="M13.344 2.188h-1.875a.469.469 0 0 0-.469.468v1.875c0 .26.21.469.469.469h1.875c.259 0 .469-.21.469-.469V2.656a.469.469 0 0 0-.47-.469zm-.469 1.874h-.938v-.937h.938v.938zM6.719 8.813H.469A.469.469 0 0 0 0 9.28v6.25c0 .26.21.469.469.469h6.25c.259 0 .468-.21.468-.469V9.28a.469.469 0 0 0-.468-.469zm-.469 6.25H.937V9.75H6.25v5.313z"/>
                                        <path
                                            d="M4.531 11H2.656a.469.469 0 0 0-.469.469v1.875c0 .259.21.469.47.469H4.53c.26 0 .469-.21.469-.47V11.47a.469.469 0 0 0-.468-.47zm-.468 1.875h-.938v-.938h.938v.938zm11.468.332h-2.656V11.47a.469.469 0 0 0-.938 0v2.207c0 .259.21.469.47.469h2.655v.918h-2.656a.469.469 0 0 0 0 .937h3.125c.26 0 .469-.21.469-.469v-1.855a.469.469 0 0 0-.469-.469zm0-4.394a.469.469 0 0 0-.469.468v2.188a.469.469 0 0 0 .938 0V9.28a.469.469 0 0 0-.469-.469zm-4.062 0H9.28a.469.469 0 0 0-.469.468v2.188a.469.469 0 0 0 .938 0V9.75h1.719a.469.469 0 0 0 0-.938zm-2.188 4.394a.469.469 0 0 0-.469.47v1.854a.469.469 0 0 0 .938 0v-1.855a.469.469 0 0 0-.469-.469z"/>
                                        </g>
                                    </g>
                                    </svg>
                                    &nbsp; with any of your wallet apps) and transfer mentioned previously amount of
                                    crypto to this address. Tokens will arrive soon on your ETH account after
                                    transaction be mined. Also you can buy tokens for ETH&nbsp;
                                    <span onClick={this.sendTransactionInit} className="text-blue">via Metamask.</span>
                                </span>
                            </div>
                        </Row>
                        <Row className="PaymentRow-3">
                            <RowPart className="part">
                                <div className="head">Payment address</div>
                                <div className="number">
                                    {crowdsaleAddress}
                                    <img src={qrIcon} className="qr_icon"/>
                                    <QrWrapper className="qrwrapper">
                                        <div className="text">QR code</div>
                                        <img src={qrcode}/>
                                    </QrWrapper>
                                </div>
                            </RowPart>
                            <RowPart className="part">
                                <BtnWrapper>
                                    <Button clickHandler={this.copyToClipboard} text="Copy address"/>
                                </BtnWrapper>
                            </RowPart>
                        </Row>
                    </div>}
                    {investCurrency !== 'ETH' &&
                    <div>
                        <Row className="PaymentRow PaymentRow-2">
                            <div className="text">
                                To buy tokens just copy an address below (or scan QR code&nbsp;
                                <span>

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                              <g fill="none" fillRule="evenodd">
                                <path fill="#F5F6FA" d="M-717-723H723V517H-717z"/>
                                <g fill="#000" fillRule="nonzero">
                                  <path
                                      d="M6.719 0H.469A.469.469 0 0 0 0 .469v6.25c0 .259.21.468.469.468h6.25c.259 0 .468-.21.468-.468V.469A.469.469 0 0 0 6.72 0zM6.25 6.25H.937V.937H6.25V6.25z"/>
                                  <path
                                      d="M4.531 2.188H2.656a.469.469 0 0 0-.469.468v1.875c0 .26.21.469.47.469H4.53c.261 0 .47-.21.47-.469V2.656a.469.469 0 0 0-.469-.469zm-.468 1.874h-.938v-.937h.938v.938zM15.531 0h-6.25a.469.469 0 0 0-.469.469v6.25c0 .259.21.468.47.468h6.25c.258 0 .468-.21.468-.468V.469A.469.469 0 0 0 15.531 0zm-.469 6.25H9.75V.937h5.313V6.25z"/>
                                  <path
                                      d="M13.344 2.188h-1.875a.469.469 0 0 0-.469.468v1.875c0 .26.21.469.469.469h1.875c.259 0 .469-.21.469-.469V2.656a.469.469 0 0 0-.47-.469zm-.469 1.874h-.938v-.937h.938v.938zM6.719 8.813H.469A.469.469 0 0 0 0 9.28v6.25c0 .26.21.469.469.469h6.25c.259 0 .468-.21.468-.469V9.28a.469.469 0 0 0-.468-.469zm-.469 6.25H.937V9.75H6.25v5.313z"/>
                                  <path
                                      d="M4.531 11H2.656a.469.469 0 0 0-.469.469v1.875c0 .259.21.469.47.469H4.53c.26 0 .469-.21.469-.47V11.47a.469.469 0 0 0-.468-.47zm-.468 1.875h-.938v-.938h.938v.938zm11.468.332h-2.656V11.47a.469.469 0 0 0-.938 0v2.207c0 .259.21.469.47.469h2.655v.918h-2.656a.469.469 0 0 0 0 .937h3.125c.26 0 .469-.21.469-.469v-1.855a.469.469 0 0 0-.469-.469zm0-4.394a.469.469 0 0 0-.469.468v2.188a.469.469 0 0 0 .938 0V9.28a.469.469 0 0 0-.469-.469zm-4.062 0H9.28a.469.469 0 0 0-.469.468v2.188a.469.469 0 0 0 .938 0V9.75h1.719a.469.469 0 0 0 0-.938zm-2.188 4.394a.469.469 0 0 0-.469.47v1.854a.469.469 0 0 0 .938 0v-1.855a.469.469 0 0 0-.469-.469z"/>
                                </g>
                              </g>
                            </svg>
                                    &nbsp; with any of your wallet apps) and transfer mentioned previously amount of crypto to this address. Tokens will arrive soon on your ETH account after transaction be mined.
                        </span>
                            </div>
                        </Row>
                        <Row className="PaymentRow-3">
                            <RowPart className="part">
                                <div className="head">Payment address</div>
                                <div className="number">
                                    {altCrowdsaleaddress}
                                    <img src={qrIcon} className="qr_icon"/>
                                    <QrWrapper className="qrwrapper">
                                        <div className="text">QR code</div>
                                        <img src={qrcode}/>
                                    </QrWrapper>
                                </div>
                            </RowPart>
                            <RowPart className="part">
                                <BtnWrapper>
                                    <Button clickHandler={this.copyToClipboard} text="Copy address"/>
                                </BtnWrapper>
                            </RowPart>
                        </Row>
                    </div>}

                    <Row className="PaymentRow-4">
                        <RowPart className="part">
                            <div className="text">Great! If you already transfered funds on the account - just press "I
                                already paid!" button. This action will finish your purchase!
                            </div>
                        </RowPart>
                        <RowPart className="part">
                            <BtnLink to="/user_office/payment/finish">
                                <BtnWrapper>
                                    <Button text="I already paid!"/>
                                </BtnWrapper>
                            </BtnLink>
                        </RowPart>
                    </Row>
                </div>
                }
                {investAmount <= 0 &&
                <div>
                    <Row className="PaymentRow PaymentRow-1">
                        <RowPart className="part">
                            <div className="head">Invalid invest amount</div>
                        </RowPart>
                        <RowPart className="part">
                            <BtnLink to="/user_office/payment/">
                                <BtnWrapper>
                                    <Button text="Select payment method"/>
                                </BtnWrapper>
                            </BtnLink>
                        </RowPart>
                    </Row>
                </div>
                }
            </Wrapper>
        )
    }
};


const mapStateToProps = ({Currencies, Invest, ICOInfo, user}) => ({
    investCurrency: Currencies.get('investCurrency'),
    investAmount: Invest.get('investAmount'),
    tokensAmount: Invest.get('tokensAmount'),
    qrcode: Invest.get('qrcode'),
    crowdsaleAddress: ICOInfo.get('crowdsale_address'),
    altCrowdsaleaddress: ICOInfo.get('alt_crowdsale_address'),
    eth_account: user.get('eth_account'),
});

const mapDispatchToProps = (dispatch) => ({
    setQRCode(payload) {
        dispatch(InvestActions.setQRCode(payload))
    },
    setStep(step) {
        dispatch(UIActions.setStep(step));
    },
    sendTransactionInit(payload) {
        dispatch(InvestActions.sendTransactionInit(payload.senderAccount, payload.receiverAccount, payload.value))
    },
    showModal(payload) {
        dispatch(UIActions.showModal(payload))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStepThree)

const Wrapper = styled.div`
    flex: 1;
    height: auto;
    margin-top: 42px;
    padding: 42px 50px 65px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    ${media.sm} {
        width: calc(100vw - 192px);
    }
    ${media.xs} {
        width: calc(100vw - 32px);
        margin-top: 30px;
        padding: 20px 15px 38px;
    }
`;

const Head = styled.div`
    color: #323c47;
    font-size: 22px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 55px;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    ${media.smMinus} {
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    .part:first-of-type {
        flex: 1;
    }
    .part:last-of-type {
        margin-left: 30px;
        ${media.smMinus} {
            margin-left: 0;
            margin-top: 20px;
            flex-basis: 100%;
        }
        ${media.xs} {
           margin-top: 34px; 
        }
    }
    &.PaymentRow {
        &-1 {
            margin-bottom: 65px;
            padding-bottom: 65px;
            border-bottom: 1px solid rgba(151,151,151,.2);
            ${media.xs} {
                margin-bottom: 38px;
                padding-bottom: 38px;
            }
            .part {
                &:last-of-type {
                    display: flex;
                    align-items: center;
                    ${media.smMinus} {
                        flex-basis: 100%;
                    }
                }
            }
            .head {
                font-size: 16px;
                color: #000000;
                margin-bottom: 15px;
                ${media.xs} {
                    margin-bottom: 5px;
                }
            }
            .amount {
                font-size: 45px;
                color: #000000;
                font-weight: 600;
                margin-bottom: 15px;
                ${media.xs} {
                    font-size: 30px;
                }
                span {
                    font-size: 25px;
                    ${media.xs} {
                        font-size: 18px;
                    }
                }
            }
            .desc {
                font-size: 14px;
                color: #000000;
                opacity: .4;
            }
        }
        &-2 {
            margin-bottom: 45px;
            ${media.xs} {
                margin-bottom: 35px;
            }
            div {
                font-size: 16px;
                color: #000000;
                letter-spacing: 0.4px;
                position: relative;
                padding-left: 15px;
                &:before {
                    content: '';
                    display: block;
                    width: 4px;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    border-radius: 2px;
                    background: #4f99f6;
                }
            }
            .text {
                ${media.xs} {
                    font-size: 14px;
                    line-height: 22px;
                }
                &-blue {
                    color: #387bfc;
                }
                cursor: pointer;
            }
        }
        &-3 {
            padding-bottom: 67px;
            border-bottom: 1px solid rgba(151,151,151,.2);
            margin-bottom: 80px;
            position: relative;
            ${media.sm} {
                margin-bottom: 60px;
            }
            ${media.xs} {
                margin-bottom: 38px;
                padding-bottom: 38px;
            }
            .head {
                color: #323c47;
                font-size: 16px;
                padding-bottom: 10px;
            }
            .number {
                height: 68px;
                border: 1px solid #d6dfe6;
                border-radius: 2px;
                color: rgba(56,123,252,.6);
                letter-spacing: 0.6px;
                font-size: 18px;
                padding: 0 25px;
                display: flex;
                align-items: center;
                position: relative;
                ${media.sm} {
                    font-size: 15px;
                }
                ${media.xs} {
                    font-size: 14px;
                    line-height: 24px;
                    padding: 0 16px;
                    word-break: break-all;
                }
            }
            .qr_icon {
                position: absolute;
                right: 25px;
                top: calc(50% + 4px);
                transform: translateY(-50%);
                cursor: pointer;
                &:hover + .qrwrapper {
                    opacity: 1;
                    visibility: visible;
                    transform: translate(100px, -100%);
                }
                ${media.xs} {
                    display: none;
                }
            }
            .part:first-of-type {
                width: 100%;
            }
            .part:last-of-type {
                display: flex;
                align-items: flex-end;
            }
        }
        &-4 {
            .part {
                align-items: center;
                display: inline-flex;
            }
            .text {
                font-size: 14px;
                color: #000000;
                letter-spacing: 0.4px;
                position: relative;
                line-height: 1.64;
                padding-left: 15px;
                padding-right: 20px;
                span {
                    color: #3476fd;
                    text-decoration: underline;
                }
                &:before {
                    content: '';
                    display: block;
                    width: 4px;
                    height: 110%;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    border-radius: 2px;
                    background: #4f99f6;
                }
            }
        }
    }
`;

const QrWrapper = styled.div`
    width: 283px;
    height: 294px;
    border-radius: 4px;
    background: white;
    box-shadow: 0 9px 21px 0 rgba(173, 182, 217, 0.3);
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(100px, calc(-100% - 30px));
    z-index: 1;
    padding-top: 30px;
    transition: all .28s ease;
    opacity: 0;
    visibility: hidden;
    &:after {
        content: '';
        border: 8px solid transparent;
        border-top: 11px solid white;
        position: absolute;
        left: 50%;
        bottom: -19px;
        transform: translateX(-50%);
    }
    .text {
        font-size: 16px;
        letter-spacing: 0.4px;
        color: rgb(0,0,0);
        text-align: center;
        margin-bottom: 10px;
    }
    img {
        width: 200px;
        height: auto;
        display: block;
        margin: 0 auto;
    }
`;

const RowPart = styled.div`
    &.amount {

    }
`;

const BtnLink = styled(Link)`
    ${media.xs} {
        width: 100%;
    }
`;

const BtnWrapper = styled.div`
    width: 250px;
    height: 68px;
    ${media.xs} {
        height: 47px;
        width: 100%;
    }
`;
