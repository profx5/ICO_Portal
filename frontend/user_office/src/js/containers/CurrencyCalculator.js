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

    updateTotalTokens = () => {
        const {investAmount, investCurrencyRate, bonusPercent, setTokensAmount} = this.props;

        let totalTokens = investAmount * investCurrencyRate;
        let bonusAmount = totalTokens / 100 * bonusPercent;
        totalTokens = parseInt(totalTokens + bonusAmount, 10);

        setTokensAmount(totalTokens);
    }

    updateInvestAmount = () => {
        const {tokensAmount, investCurrencyRate, bonusPercent} = this.props;

        let totalInvest = investCurrencyRate / tokensAmount;
        let bonusAmount = totalInvest / 100 * bonusPercent;
        totalInvest = (totalInvest + bonusAmount).toFixed(2);
    }

    componentDidUpdate() {
        this.updateTotalTokens()
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


    render() {
        const {
            investCurrency,
            investCurrencyRate,
            investAmount,
            tokensAmount,
            bonusPercent
        } = this.props;

        return (
            <Wrapper>
                <WrapperInner>
                    <InvestInput value={this.props.investAmount} type="text" onChangeHandler={this.investOnChangeHandler} header="Amount" currency={investCurrency}/>
                    <InvestInput value={this.props.tokensAmount} type="text" header="TKN" currency="TKN"/>
                        <ButtonWrapper to="/user_office/payment/buy">
                            <Button clickHandler={this.investClickHandler} text="Купить"/>
                        </ButtonWrapper>
                </WrapperInner>
                <BonusDesc>Пометка о бонусной программе, купи сейчас и получи еще 10% бонусных токенов до 3 июля. Cras quis 
nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna</BonusDesc>
            </Wrapper>
        )
    }
};

const mapStateToProps = ({Currencies, Invest, ICOInfo, Phase}) => ({
    investCurrency: Currencies.get('investCurrency'),
    investCurrencyRate: Currencies.get('investCurrencyRate'),
    investAmount: Invest.get('investAmount'),
    tokensAmount: Invest.get('tokensAmount'),
    bonusPercent: Phase.get('bonus_percents'),
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
    &:before {
        content: '';
        display: block;
        width: 4px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: #4f99f6;
    }
`;