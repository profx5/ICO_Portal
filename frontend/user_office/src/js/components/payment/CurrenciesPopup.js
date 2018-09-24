import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import CurrencyCardRest from './components/CurrencyCardRest';

import * as CurrencyActions from '../../actions/CurrencyActions.js';
import * as UIActions from './../../actions/UIActions';


class CurrenciesPopup extends React.Component {

    cardClickHandler (code, rate) {
        this.props.setInvestCurrencyRate(rate);
        this.props.setInvestCurrency(code);
    }

    generateCurrencyCards = (data) => {

        return data.map((item, index) => {
            let {code, rate} = item;

            if (index < 4) return;

            return <CurrencyCardRest
                className={this.props.altInvestCurrency === code ? 'active' : ''}
                name={code}
                icon={'icon-' + code}
                rate={rate}
                key={index}
                clickHandler={this.cardClickHandler.bind(this, code, rate)}
            />
        })
    }


    render() {
        const {
            currencies,
            hidePopup
        } = this.props;
        return (
            <Wrapper>
                <WrapperInner>
                    <Head>Select another crypto currency
                        <div onClick={hidePopup} className="close-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15">
                              <g fill="none" fill-rule="evenodd">
                                <path fill="#F5F6FA" d="M-1083-366H357V793h-1440z"/>
                                <g fill="#000">
                                  <path d="M.282 2.197L1.697.782l12.02 12.021-1.414 1.415z"/>
                                  <path d="M1.697 14.218L.282 12.803 12.303.783l1.415 1.414z"/>
                                </g>
                              </g>
                            </svg>
                        </div>
                    </Head>
                    <Content>
                        {this.generateCurrencyCards(this.props.currencies)}
                    </Content>
                </WrapperInner>
            </Wrapper>
        )
    }
};


const mapStateToProps = ({Currencies}) => ({
    currencies: Currencies.get('currencies'),
    investCurrency: Currencies.get('investCurrency'),
    investCurrencyRate: Currencies.get('investCurrencyRate'),
    altInvestCurrency: Currencies.get('investCurrency')
})

const mapDispatchToProps = (dispatch) => ({
    setInvestCurrency(payload) {
        dispatch(CurrencyActions.setInvestCurrency(payload))
    },
    setInvestCurrencyRate(payload) {
        dispatch(CurrencyActions.setInvestCurrencyRate(payload))
    },
    hidePopup() {
        dispatch(UIActions.hideCurrenciesPopup())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesPopup)


const Wrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(1,7,29,.3);
    z-index: 50;
`;

const WrapperInner = styled.div`
    width: 757px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 9px 21px 0 rgba(173, 182, 217, 0.3);
    border-radius: 4px;
    background: white;
`;

const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 40px 60px;
`;

const Head = styled.div`
    font-size: 22px;
    color: #000000;
    line-height: 72px;
    text-align: center;
    background: #f5f6fa;
    padding: 0 20px;
    position: relative;
    .close-btn {
        position: absolute;
        right: 40px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
`;
