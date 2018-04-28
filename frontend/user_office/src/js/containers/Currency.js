import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';

import CurrencyCard from './../components/CurrencyCard';
import Button from './../components/Button';
import FetchButton from './../components/FetchButton';

import * as CurrencyActions from '../actions/CurrencyActions.js'



class Currency extends React.Component {

    constructor() {
        super();

        this.cards = [];
    }

    componentDidMount() {
        this.props.getCurrencies();
    }

    cardClickHandler = event => {

        // this.cards.forEach(item => {
        //     item.classList.remove('active');
        // });
        // event.currentTarget.classList.add('active');
    }

    generateCurrencyCards = (data) => {

        return data.map((item, index) => {
            return <CurrencyCard 
                className={index === 0 ? 'active' : ''}
                name={item.name} 
                icon={item.logo} 
                rate={item.rate} 
                key={index} 
                ref={card => {this.cards[index] = card}} 
            />
        })
    }

    render() {
        const {
            currencies
        } = this.props;
        return (
            <Wrapper>
                <Head>Currency</Head>
                <Content>
                    {this.generateCurrencyCards(this.props.currencies)}
                </Content>
                <FetchButton amount={23}/>
            </Wrapper>
        )
    }
};



const mapStateToProps = ({Currencies}) => ({
    currencies: Currencies.get('currencies')
})

const mapDispatchToProps = (dispatch) => ({
    getCurrencies() {
        dispatch(CurrencyActions.getCurrenciesRequest())
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