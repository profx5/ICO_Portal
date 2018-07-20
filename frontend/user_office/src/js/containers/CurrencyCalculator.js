import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import Utils from './../utils';

import Button from './../components/Button';
import InvestInput from './../components/InvestInput';
import { Link } from 'react-router-dom';


import * as UIActions from './../actions/UIActions';
import * as InvestActions from './../actions/InvestActions';
import * as ICOInfoActions from './../actions/ICOInfoActions';



class CurrencyCalculator extends React.Component {

    constructor() {
        super();

        this.bonus = 0;
    }

    updateTotalTokens = () => {
        const {investAmount, investCurrencyRate, setTokensAmount} = this.props;
        let bonus = this.bonus;

        let totalTokens = investAmount * parseInt(investCurrencyRate, 10);

        if (totalTokens < 8000) bonus = 0;
            else if (totalTokens >= 8000 && totalTokens < 20000) bonus = 20;
            else if (totalTokens >= 20000) bonus = 30;

        let bonusAmount = totalTokens / 100 * bonus;
        totalTokens = parseInt(totalTokens + bonusAmount, 10);

        setTokensAmount(totalTokens);
        this.bonus = bonus;
    }

    investOnChangeHandler = event => {
        Utils.formatInputNumber(event, this.props.setInvestAmount);
        this.updateTotalTokens();
    }

    investClickHandler = () => {
        const {investCurrency, showInvestOptions, getAltCryptoAccount} = this.props;
        showInvestOptions();
        if (investCurrency !== 'ETH') getAltCryptoAccount(investCurrency);
    }

    initialUpdate = () => {
        this.updateTotalTokens();
    }


    render() {
        const {
            investCurrency,
            investCurrencyRate,
            investAmount,
            tokensAmount,
            bonusPercent
        } = this.props;

        let bonus = this.bonus;

        this.initialUpdate();

        return (
            <Wrapper>
                <WrapperInner>

                    <InvestInput value={this.props.investAmount} type="text" onChangeHandler={this.investOnChangeHandler} header="Amount" currency={investCurrency}/>
                    <TokensInputWrapper data-currency="TKN">
                        <div className="head">TKN (Buy till 7 july and <span>get a 30% bonus!</span>)</div>
                        <TokensInput>
                            {bonus > 0 &&
                                <React.Fragment>
                                    <span>{investAmount} + </span>
                                    <span className="bonus">{bonus}</span>&nbsp;=&nbsp; 
                                </React.Fragment>
                            }
                            {this.props.tokensAmount}
                        </TokensInput>
                    </TokensInputWrapper>

                    <ButtonWrapper to="/user_office/payment/buy">
                        <Button clickHandler={this.investClickHandler} text="Buy"/>
                    </ButtonWrapper>

                </WrapperInner>
                <BonusDesc>Progressive bonus for private presale phase is 
                currenty available! Investing more than 8 000 USD will grant you 20% bonus! 
                Invest more than 20 000 USD and get <span>30% bonus tokens!</span></BonusDesc>
            </Wrapper>
        )
    }
};

const mapStateToProps = ({Currencies, Invest, ICOInfo, Phase}) => ({
    investCurrency: Currencies.get('investCurrency'),
    investCurrencyRate: Currencies.get('investCurrencyRate'),
    investAmount: Invest.get('investAmount'),
    tokensAmount: Invest.get('tokensAmount'),
    bonusPercent: 0,
})

const mapDispatchToProps = (dispatch) => ({
    setInvestAmount(payload) {
        dispatch(InvestActions.setInvestAmount(payload))
    },
    setTokensAmount(payload) {
        dispatch(InvestActions.setTokensAmount(payload))
    },
    showInvestOptions() {
        dispatch(UIActions.showInvestOptions());
    },
    getAltCryptoAccount(payload) {
        dispatch(ICOInfoActions.getCryptoAccountRequest(payload))
    }
})



export default connect(mapStateToProps, mapDispatchToProps)(CurrencyCalculator)

const Wrapper = styled.div`
    margin-top: 65px;
`;

const WrapperInner = styled.div`
    display: flex;
    justify-content: center;
    border-top: 1px solid rgba(151,151,151,.2);
    border-bottom: 1px solid rgba(151,151,151,.2);
    padding-bottom: 50px;
    padding-top: 90px;
`;

const ButtonWrapper = styled(Link)`
    display: inline-block;
    width: 100%;
    max-width: 258px;
    height: 70px;
    border-radius: 2px;
    border: 1px solid #d6dfe6;
    position: relative;
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