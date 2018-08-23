import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import CurrencyCardMain from './../components/CurrencyCardMain';
import CurrencyCardOther from './../components/CurrencyCardOther';

import * as CurrencyActions from '../actions/CurrencyActions.js';
import * as UIActions from './../actions/UIActions';


class Currency extends React.Component {

    cardClickHandler(code, rate) {
        this.props.setInvestCurrency(code);
        this.props.setInvestCurrencyRate(rate);
    }

    generateCurrencyCards = (data) => {
        const mainCurrenciesNum = 4;

        return data.map((item, index) => {
            let {code, rate, name} = item;
            const {investCurrency, investCurrencyRate, showPopup} = this.props;

            if (index < mainCurrenciesNum) {
                return  <CurrencyCardMain
                            className={investCurrency === code ? 'active' : ''}
                            name={name}
                            icon={'icon-' + code}
                            rate={rate}
                            key={index}
                            clickHandler={this.cardClickHandler.bind(this, code, rate)}/>
            } else if (index === mainCurrenciesNum) {
                return  <CurrencyCardOther
                            rate={investCurrencyRate}
                            key={index}
                            investCurrency={investCurrency}
                            restCurrencies={data.slice(mainCurrenciesNum)}
                            clickHandler={showPopup}>
                        </CurrencyCardOther>
            } else return;

        })
    }

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
