import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import Utils from './../utils';

import Button from './../components/Button';
import InvestInput from './../components/InvestInput';
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
        getAltCryptoAccount(investCurrency);
    }


    render() {
        const {
            investCurrency,
            investCurrencyRate,
            investAmount,
            tokensAmount,
            bonusPercent,
            showInvestOptions
        } = this.props;

        return (
            <Wrapper>
                <div>
                    <InvestInput value={this.props.investAmount} type="text" onChangeHandler={this.investOnChangeHandler} header="Amount" currency={investCurrency}/>
                    <InvestInput value={this.props.tokensAmount} type="text" header="TKN" currency="TNK"/>
                    <ButtonWrapper>
                        <Button clickHandler={this.investClickHandler} text="INVEST"/>
                    </ButtonWrapper>
                </div>
                <Tip>
                    {"1 " + investCurrency + ' = ' + investCurrencyRate + ' TNK'}
                    <HoverTip>{(investAmount === '' ? 0 : investAmount) + ' ' + investCurrency + ' + ' + bonusPercent + '%' + ' = ' + tokensAmount + ' TNK'}</HoverTip>
                </Tip>
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
    margin-top: 107px;
`;

const ButtonWrapper = styled.div`
    display: inline-block;
    width: 186px;
`;

const Tip = styled.span`
    font-size: 14px;
    color: #377afc;
    display: inline-block;
    position: relative;
    margin-top: 35px;
    cursor: help;
    &:before {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        position: absolute;
        left: 0;
        bottom: -1px;
        background #377afc;
    }
    &:hover div {
        transform: translate(-50%, calc(-100% - 30px));
        opacity: 1;
        visibility: visible;
    }
`;

const HoverTip = styled.div`
    height: 60px;
    color: #222121;
    position: absolute;
    left: 50%;
    bottm: 0;
    transform: translate(-50%, calc(-100% - 15px));
    border: 1px solid rgba(243,243,243,.8);

    background: white;
    border-radius: 5px;
    box-shadow: 0 2px 9px 0 rgba(0,0,0,0.03);
    padding: 0 15px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    transition: all .25s ease;
    opacity: 0;
    visibility: hidden;
    &:before {
        content: '';
        display: block;
        border 7px solid transparent;
        border-top: 7px solid white;
        position: absolute;
        bottom: -14px;
        left: 50%;
        transform: translateX(-50%);
        box-shadow: 0 0 1px 0 rgba(243,243,243,.8) inset;
    }
`;