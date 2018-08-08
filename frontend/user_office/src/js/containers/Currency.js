import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import CurrencyCard from './../components/CurrencyCardBig';

import * as CurrencyActions from '../actions/CurrencyActions.js';
import * as UIActions from './../actions/UIActions';


class Currency extends React.Component {

    cardClickHandler(code, rate) {
        this.props.setInvestCurrency(code);
        this.props.setInvestCurrencyRate(rate);
    }

    componentDidMount = () => {
        const {updateCurrencies} = this.props;
        this.timerID = setInterval(
            () => updateCurrencies(),
            5000
        );
    };

    componentWillUnmount() {
        clearInterval(this.timerID);
    };

    generateCurrencyCards = (data) => {

        return data.map((item, index) => {
            let {code, rate} = item;

            if (index >= 3 && this.props.spreadedCurrencyCards === false) return;
            if (code === 'LTCT') return;
            if (code === 'BTC') return;
            return <CurrencyCard
                className={this.props.investCurrency === code ? 'active' : ''}
                name={code}
                icon={'icon-' + code}
                rate={rate.toFixed(2)}
                key={index}
                clickHandler={this.cardClickHandler.bind(this, code, rate)}
            />
        })
    };

    render() {
        return (
            <Wrapper>
                <Content>
                    {this.generateCurrencyCards(this.props.currencies)}
                </Content>
            </Wrapper>
        )
    }
};


const mapStateToProps = ({Currencies}) => ({
    currencies: Currencies.get('currencies'),
    investCurrency: Currencies.get('investCurrency'),
    investCurrencyRate: Currencies.get('investCurrencyRate'),
    spreadedCurrencyCards: Currencies.get('spreadedCurrencyCards')
});

const mapDispatchToProps = (dispatch) => ({
    setInvestCurrency(payload) {
        dispatch(CurrencyActions.setInvestCurrency(payload))
    },
    setInvestCurrencyRate(payload) {
        dispatch(CurrencyActions.setInvestCurrencyRate(payload))
    },
    spreadVisibleCards(payload) {
        dispatch(CurrencyActions.spreadVisibleCards(payload))
    },
    showPopup() {
        dispatch(UIActions.showCurrenciesPopup())
    },
    updateCurrencies() {
        dispatch(CurrencyActions.getCurrenciesRequest())
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Currency)


const Wrapper = styled.div`
    flex: 1;
    height: auto;
    margin-top: 22px;
    background: white;
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
    white-space: nowrap;
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;
