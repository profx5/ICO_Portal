import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {media} from 'js/services/media';

import CurrencyCardMain from 'js/components/payment/stateless/CurrencyCardMain';
import CurrencyCardOther from 'js/components/payment/stateless/CurrencyCardOther';

import * as CurrencyActions from 'js/actions/CurrencyActions.js';
import * as UIActions from 'js/actions/UIActions';


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
                            disabled={index !== 0 ? true : false}
                            clickHandler={this.cardClickHandler.bind(this, code, rate)}/>
            } else if (index === mainCurrenciesNum) {
                return  <CurrencyCardOther
                            rate={investCurrencyRate}
                            key={index} 
                            disabled
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
    showPopup() {
        dispatch(UIActions.showCurrenciesPopup())
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Currency)

const Wrapper = styled.div`
    flex: 1;
    height: auto;
    margin-top: 22px;
    background: white;
    border-radius: 6px;
    margin-bottom: 65px;
    ${media.xs} {
        margin-bottom: 0;
    }
`;

const Content = styled.div`
    margin-bottom: 24px;
    white-space: nowrap;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    ${media.sm} {
        justify-content: flex-start;
    }}
    ${media.smMinus} {
        flex-wrap: wrap;
    }
    ${media.xs} {
        justify-content: space-between;
        margin-bottom: 0;
    }
`;
