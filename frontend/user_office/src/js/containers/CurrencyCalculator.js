import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import Utils from './../utils';

import Button from './../components/Button';
import InvestInput from './../components/InvestInput';
import {Link} from 'react-router-dom';
import iconClose from './../../img/icon_close.svg';


import * as UIActions from './../actions/UIActions';
import * as InvestActions from './../actions/InvestActions';
import * as ICOInfoActions from './../actions/ICOInfoActions';


class CurrencyCalculator extends React.Component {

    constructor() {
        super();

        this.bonus = 0;
    }

    closeTip = () => {
        const {setOpenedTip} = this.props;
        setOpenedTip(null);
    };

    openKYCTip = (e) => {
        e.preventDefault();
        const {setOpenedTip} = this.props;
        setOpenedTip(8);
    };

    openEthSetTip = e => {
        e.preventDefault();
        const {setOpenedTip} = this.props;
        setOpenedTip(9);
    };

    updateTotalTokens = () => {
        const {investAmount, investCurrencyRate, setUSDAmount, setTokensAmount} = this.props;
        let bonus = this.bonus;
        let totalUSD = investAmount * investCurrencyRate;
        let totalTokens = totalUSD / 2;

        if (totalUSD < 8000) bonus = 0;
        else if (totalUSD >= 8000 && totalUSD < 20000) bonus = 20;
        else if (totalUSD >= 20000) bonus = 30;
        totalTokens += totalTokens / 100 * bonus;
        setTokensAmount(totalTokens);
        setUSDAmount(totalUSD);
        this.bonus = bonus;
    };

    investOnChangeHandler = event => {
        Utils.formatInputNumber(event, this.props.setInvestAmount);
        this.updateTotalTokens();
    };

    investClickHandler = () => {
        const {investCurrency, showInvestOptions, getAltCryptoAccount} = this.props;
        showInvestOptions();
        if (investCurrency !== 'ETH') getAltCryptoAccount(investCurrency);
    };

    initialUpdate = () => {
        this.updateTotalTokens();
    };

    showSetAccountPopupAndCloseTip = e => {
        e.preventDefault();
        const {setOpenedTip, showSetAccountPopup} = this.props;
        setOpenedTip(null);
        showSetAccountPopup();
    };

    render() {
        const {
            investCurrency,
            investCurrencyRate,
            investAmount,
            USDAmount,
            tokensAmount,
            kycState,
            openedTip,
            ethAccount,
            type
        } = this.props;

        let ethSet = !!ethAccount;
        let kycSended = !!type;
        let kycApproved = kycState === 'APPROVED';
        let bonus = this.bonus;
        let header = investCurrency ? "Amount, min " + (8000 / investCurrencyRate).toFixed(3) + " " + investCurrency : 'Amount';
        this.initialUpdate();
        return (
            <Wrapper>
                {openedTip === 8 &&
                <ModalWrapper>
                    <Modal>
                        <ModalHeader>
                            Verification required
                            <img onClick={this.closeTip} src={iconClose} alt=""/>
                        </ModalHeader>
                        {!kycSended &&
                        <ModalContent>
                            Sorry, but you are not allowed to buy tokens yet. Please <Link className='link'
                                                                                           onClick={this.closeTip}
                                                                                           to='/user_office/verification/'>pass
                            KYC</Link> procedure first!
                        </ModalContent>
                        }
                        {kycSended && kycState === 'WAITING' &&
                        <ModalContent>
                            Sorry, but you are not allowed to buy tokens yet. Please wait while we validate info you
                            provided.
                        </ModalContent>
                        }
                        {kycSended && kycState === 'DECLINED' &&
                        <ModalContent>
                            Sorry, but you are not allowed to buy tokens yet. Your KYC was declined. Please <Link className='link'
                        onClick={this.closeTip} to='/user_office/support/'>contact our support</Link>.
                        </ModalContent>
                        }
                    </Modal>
                </ModalWrapper>
                }
                {openedTip === 9 &&
                <ModalWrapper>
                    <Modal>
                        <ModalHeader>
                            ETH Account required
                            <img onClick={this.closeTip} src={iconClose} alt=""/>
                        </ModalHeader>
                        <ModalContent>
                            Sorry, but you are not allowed to buy tokens yet. Please <span className='link'
                                                                                           onClick={this.showSetAccountPopupAndCloseTip}>add
                            your ETH account</span> to get tokens.
                        </ModalContent>
                    </Modal>
                </ModalWrapper>
                }
                <WrapperInner>
                    <InvestInput value={investAmount} type="text"
                                 onChangeHandler={this.investOnChangeHandler} header={header}
                                 currency={investCurrency}/>
                    <TokensInputWrapper data-currency="Vera">
                        <div className="head">Vera (Buy till 7 july and <span>get a 30% bonus!</span>)</div>
                        <TokensInput>
                            {tokensAmount && tokensAmount.toFixed(2) || 0}

                        </TokensInput>
                    </TokensInputWrapper>

                    <ButtonWrapper to="/user_office/payment/buy">
                        <Button disabled={USDAmount < 8000}
                                clickHandler={ethSet ? kycApproved ? this.investClickHandler : this.openKYCTip : this.openEthSetTip}
                                text="Buy"/>
                    </ButtonWrapper>
                </WrapperInner>

                <CalculatedWrapper>
                    {!investCurrency && 'Please select currency you d\'like to spend.'}
                    {investCurrency &&
                    <div>
                        <ul>
                            <li>You pay {investAmount} {investCurrency} </li>
                            <li>Which is equal to {investAmount} * {investCurrencyRate} USD
                                = {USDAmount.toFixed(2)} USD
                            </li>
                            <li>Token base price = 2 USD</li>
                            {USDAmount >= 8000 &&
                            <div>
                                <li>Pre-Sale phase {bonus}% bonus applied so you get</li>
                                <li>{USDAmount.toFixed(2)} / 2 * 1{bonus}% = {tokensAmount.toFixed(2)} VERA</li>
                            </div>
                            }
                            {USDAmount < 8000 &&
                            <div>
                                <li>It's less than minimum purchase of $ 8000</li>
                                <li>Please enter amount {(8000 / investCurrencyRate).toFixed(3)} {investCurrency} or
                                    more
                                </li>
                            </div>
                            }


                        </ul>
                    </div>
                    }
                </CalculatedWrapper>

                <BonusDesc>Progressive bonus for private presale phase is
                    currenty available! Investing more than 8&nbsp;000 USD will grant you 20% bonus!
                    Invest more than 20&nbsp;000 USD and get <span>30% bonus tokens!</span></BonusDesc>
            </Wrapper>
        )
    }
};

const mapStateToProps = ({Currencies, Invest, UI, KYC, user}) => ({
    investCurrency: Currencies.get('investCurrency'),
    investCurrencyRate: Currencies.get('investCurrencyRate'),
    investAmount: Invest.get('investAmount'),
    tokensAmount: Invest.get('tokensAmount'),
    USDAmount: Invest.get('USDAmount'),
    bonusPercent: 0,
    kycState: KYC.get('state'),
    type: KYC.get('type'),
    openedTip: UI.get('openedTip'),
    ethAccount: user.get('eth_account'),
})

const mapDispatchToProps = (dispatch) => ({
    setInvestAmount(payload) {
        dispatch(InvestActions.setInvestAmount(payload))
    },
    setUSDAmount(payload) {
        dispatch(InvestActions.setUSDAmount(payload))
    },
    setTokensAmount(payload) {
        dispatch(InvestActions.setTokensAmount(payload))
    },
    showInvestOptions() {
        dispatch(UIActions.showInvestOptions());
    },
    getAltCryptoAccount(payload) {
        dispatch(ICOInfoActions.getCryptoAccountRequest(payload))
    },
    setOpenedTip(id) {
        dispatch(UIActions.setOpenedTip(id))
    },
    showSetAccountPopup() {
        dispatch(UIActions.showSetAccountPopup())
    },
})


export default connect(mapStateToProps, mapDispatchToProps)(CurrencyCalculator);

const ModalWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    background: rgba(1, 7, 29, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
`;

const Modal = styled.div`
    position: absolute;
    top: 10%;
    left: 20%;
    width: 60%;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 9px 21px 0 rgba(173, 182, 217, 0.3);
    z-index: 100;
    max-height: 64vh;
    font-weight: normal;
`;

const ModalHeader = styled.div`
    padding: 18px;
    text-align: center;
    line-height: 1.45;
    height: 72px;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-align: center;
    color: #000000;
    background-color: #f5f6fa
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    & img {
        position: absolute;
        top: 26px;
        right: 26px;
        cursor: pointer;
    }
`;

const ModalContent = styled.div`
    padding: 32px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    text-align: justify;
    font-size: 16px;
    line-height: 1.44;
    letter-spacing: 0.2px;
    color: #0a0a0a;
    overflow-y: auto;
    max-height: 52.5vh;
    & span~.link {
        font-weight: bold;
    }
    & .link {
        text-decoration: underline;
        cursor: pointer;
    }
`;

const Wrapper = styled.div`
    margin-top: 65px;
`;

const WrapperInner = styled.div`
    display: flex;
    justify-content: start;
    border-top: 1px solid rgba(151,151,151,.2);
    // border-bottom: 1px solid rgba(151,151,151,.2);
    padding-bottom: 50px;
    padding-top: 90px;
`;

const ButtonWrapper = styled(Link)`
    display: inline-block;
    width: 100%;
    max-width: 34.4%;
    height: 70px;
    border-radius: 2px;
    border: 1px solid #d6dfe6;
    position: relative;
`;

const CalculatedWrapper = styled.div`
    font-size: 16px;
    color: #000000;
    letter-spacing: 0.5px;
    position: relative;
    padding-left: 15px;
    & ul {
        font-weight: normal;
    }
    &:before {
        content: '';
        display: block;
        width: 4px;
        height: 110%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background: #4f99f6;
    }
`;

const BonusDesc = styled.p`
    font-size: 16px;
    color: #000000;
    letter-spacing: 0.5px;
    position: relative;
    padding-left: 15px;
    margin-top: 45px;
    span {
        color: #3679fc;
    }
    &:before {
        content: '';
        display: block;
        width: 4px;
        height: 110%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background: #4f99f6;
    }
`;

const TokensInputWrapper = styled.div`
    display: inline-block;
    width: 345px;
    height: 70px;
    border-radius: 2px;
    border: 1px solid #d6dfe6;
    position: relative;
    margin-right: 32px;
    .head {
        color: #0a0a0a;
        position: absolute;
        left: 0
        top: -35px;
        font-size: 16px;
        span {
            color: #3476fd;
        }
    }
    &:after {
        content: attr(data-currency);
        color: rgba(10,10,10, 0.4);
        position: absolute;
        font-size: 18px;
        right: 27px;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const TokensInput = styled.div`
    width: 345px;
    height: 70px;
    margin-right: 32px;
    padding-right: 67px;
    padding-left: 18px;
    line-height: 70px;
    font-weight: 600;
    color: #b6b6b6;
    .bonus {
        color: #3476fd;
    }
`;
