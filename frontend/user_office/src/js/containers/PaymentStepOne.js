import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import CurrencyCalculator from './CurrencyCalculator';
import Currency from './Currency';
import * as UIActions from './../actions/UIActions';


class PaymentStepOne extends React.Component {

    render() {

        return (
            <Wrapper>
                <Head>Select payment method</Head>
                <Currency/>
                <CurrencyCalculator/>
            </Wrapper>
        )
    }

    componentDidMount = () => {
        const { setStep } = this.props;
        setStep(1);
    }
};


const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    setStep(step) {
        dispatch(UIActions.setStep(step));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStepOne)


const Wrapper = styled.div`
    flex: 1;
    height: auto;
    margin-top: 42px;
    padding: 42px 50px 65px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
`;

const Head = styled.div`
    color: #323c47;
    font-size: 22px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 55px;
`;
