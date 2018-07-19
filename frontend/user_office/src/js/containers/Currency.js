import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import CurrencyCalculator from './CurrencyCalculator';

import CurrencyCard from './../components/CurrencyCardBig';
import FetchButton from './../components/FetchButton';

import * as CurrencyActions from '../actions/CurrencyActions.js';
import * as UIActions from './../actions/UIActions';



class Currency extends React.Component {

    cardClickHandler (code, rate) {
        this.props.setInvestCurrency(code);
        this.props.setInvestCurrencyRate(rate);
    }

    generateCurrencyCards = (data) => {

        return data.map((item, index) => {
            let {code, rate} = item;

            if (index >= 3 && this.props.spreadedCurrencyCards === false) return;
            if (code === 'LTCT') return;
            
            return <CurrencyCard 
                className={this.props.investCurrency === code ? 'active' : ''}
                name={code} 
                icon={'icon-' + code} 
                rate={rate.toFixed(2)} 
                key={index} 
                clickHandler={this.cardClickHandler.bind(this, code, rate)}
            />
        })
    }

    buttonClickHandler = () => {
        let {spreadedCurrencyCards, spreadVisibleCards, currencies, setInvestCurrency, setInvestCurrencyRate} = this.props;
        
        if (spreadedCurrencyCards === true) {
            spreadVisibleCards(false);
            setInvestCurrency(currencies[0].code)
            setInvestCurrencyRate(currencies[0].rate)
        } else {
            spreadVisibleCards(true);
        }
    }

    render() {
        const {
            currencies,
            showPopup
        } = this.props;

        return (
            <Wrapper>
                <Content>
{/*                    <CurrencyCard 
                        className={this.props.investCurrency === 'credit' ? 'active' : ''}
                        name='Credit card' 
                        icon='icon-card' 
                        altWay={true}
                        clickHandler={this.cardClickHandler.bind(this, 'credit')}/>*/}

                    {this.generateCurrencyCards(this.props.currencies)}

{/*                    <CurrencyCard 
                        className={this.props.investCurrency === 'other' ? 'active' : ''}
                        name='Other Crypto' 
                        icon='icon-other' 
                        altWay={true}
                        clickHandler={() => {
                            showPopup();
                            this.cardClickHandler('other')
                        }}/>*/}
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
})

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
    }
})


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