import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import Utils from './../utils';

import Button from './../components/Button';
import InvestInput from './../components/InvestInput';

import Invest from './Invest';

import * as CurrencyActions from './../actions/CurrencyActions';
import * as InvestActions from './../actions/InvestActions';



class CurrencyCalculator extends React.Component {

    updateTotalTokens = () => {
        const {investAmount, investCurrencyRate, discountPercent, setTokensAmount} = this.props;

        let totalTokens = investAmount * investCurrencyRate;
        let bonusAmount = totalTokens / 100 * discountPercent;
        totalTokens = (totalTokens + bonusAmount).toFixed(2);

        setTokensAmount(totalTokens);
    }

    componentDidUpdate() {this.updateTotalTokens()}

    investOnChangeHandler = event => {
        Utils.formatInvestNumber(event, this.props.setInvestAmount);
        this.updateTotalTokens();
    }


    render() {
        const {
            showInvestForm,
            investCurrency,
            investCurrencyRate,
            investAmount,
            tokensAmount
        } = this.props;

        return (
            <Wrapper>
                <div>
                    <InvestInput value={this.props.investAmount} type="text" onChangeHandler={this.investOnChangeHandler} header="Amount" currency={investCurrency}/>
                    <InvestInput value={this.props.tokensAmount} type="text" header="TKN" currency="TNK"/>
                    <ButtonWrapper>
                        <Button clickHandler={showInvestForm} text="INVEST"/>
                    </ButtonWrapper>
                </div>
                <Tip>{"1 " + investCurrency + ' = ' + investCurrencyRate + ' TNK'}</Tip>
            </Wrapper>
        )
    }
};

const mapStateToProps = ({Currencies, Invest, ICOInfo}) => ({
    investCurrency: Currencies.get('investCurrency'),
    investCurrencyRate: Currencies.get('investCurrencyRate'),
    investAmount: Invest.get('investAmount'),
    tokensAmount: Invest.get('tokensAmount'),
    discountPercent: ICOInfo.getIn(['currentPhase', 'discountPercent'])
})

const mapDispatchToProps = (dispatch) => ({
    showInvestForm() {
        dispatch(InvestActions.showForm())
    },
    hideInvestForm() {
        dispatch(InvestActions.hideForm())
    },
    setInvestAmount(payload) {
        dispatch(InvestActions.setInvestAmount(payload))
    },
    setTokensAmount(payload) {
        dispatch(InvestActions.setTokensAmount(payload))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(CurrencyCalculator)

const Wrapper = styled.div`
    margin-top: 107px;
`;

const InputWrapper = styled.div`
    display: inline-block;
    width: 226px;
    height: 45px;
    border: 1px solid #d6dfe6;
    position: relative;
    margin-right: 22px;
    &:before {
        content: attr(data-header);
        color: #0a0a0a;
        position: absolute;
        left: 0
        top: -35px;
    }
    &:after {
        content: attr(data-currency);
        color: #0a0a0a;
        position: absolute;
        right: 18px;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const Input = styled.input`
    display: block;
    font-weight: 600;
    height: 100%;
    width: 100%;
    padding-left: 18px;
    padding-right: 55px;
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
`;