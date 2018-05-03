import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import CurrencyCalculator from './CurrencyCalculator';

import CurrencyCard from './../components/CurrencyCard';
import Button from './../components/Button';
import FetchButton from './../components/FetchButton';

import * as CurrencyActions from '../actions/CurrencyActions.js';



class Currency extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        const firstCurrencyData = this.props.currencies[0];

        this.props.getCurrencies();
        this.props.setInvestCurrency(firstCurrencyData.name);
        this.props.setInvestCurrencyRate(firstCurrencyData.rate);
    }

    cardClickHandler (name, rate) {
        this.props.setInvestCurrency(name);
        this.props.setInvestCurrencyRate(rate);
    }

    generateCurrencyCards = (data) => {

        return data.map((item, index) => {
            let name = item.name,
                rate = item.rate;

            if (index >= 7 && this.props.spreadedCurrencyCards === false) return;

            return <CurrencyCard 
                className={this.props.investCurrency === name ? 'active' : ''}
                name={name} 
                icon={'icon-' + name} 
                rate={rate} 
                key={index} 
                clickHandler={this.cardClickHandler.bind(this, name, rate)}
            />
        })
    }

    buttonClickHandler = () => {
        let {spreadedCurrencyCards, spreadVisibleCards, currencies, setInvestCurrency} = this.props;
        
        if (spreadedCurrencyCards === true) {
            spreadVisibleCards(false);
            setInvestCurrency(currencies[0].name)
        } else {
            spreadVisibleCards(true);
        }
    }

    render() {
        const {
            currencies,
            investCurrency,
            investCurrencyRate,
            spreadedCurrencyCards
        } = this.props;

        return (
            <Wrapper>
                <Head>Currency</Head>
                <Content>
                    {this.generateCurrencyCards(this.props.currencies)}
                </Content>
                {(!(currencies.length - 7) <= 0) && <FetchButton onClickHandler={this.buttonClickHandler} spread={spreadedCurrencyCards} amount={currencies.length - 7}/>}
                <CurrencyCalculator/>
            </Wrapper>
        )
    }
};



const mapStateToProps = ({Currencies}) => ({
    currencies: Currencies.get('currencies'),
    investCurrency: Currencies.get('investCurrency'),
    investCurrencyRate: Currencies.get('investCurrencyRate'),
    spreadedCurrencyCards: Currencies.get('spreadedCurrencyCards')
})

const mapDispatchToProps = (dispatch) => ({
    getCurrencies() {
        dispatch(CurrencyActions.getCurrenciesRequest())
    },
    setInvestCurrency(payload) {
        dispatch(CurrencyActions.setInvestCurrency(payload))
    },
    setInvestCurrencyRate(payload) {
        dispatch(CurrencyActions.setInvestCurrencyRate(payload))
    },
    spreadVisibleCards(payload) {
        dispatch(CurrencyActions.spreadVisibleCards(payload))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Currency)


const Wrapper = styled.div`
    flex: 1;
    height: auto;
    margin-top: 22px;
    padding: 42px 30px 34px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
`;

const Head = styled.h3`
    font-size: 20px;
    font-weight: 500;
    color: #323c47;
    letter-spacing: 0.1px;
    margin-bottom: 30px;
`;

const Content = styled.div`
    margin-bottom: 24px;
`;

const ButtonWrapper = styled.div`
    width: 165px;
    margin-left: auto;
    margin-top: 30px;
`;