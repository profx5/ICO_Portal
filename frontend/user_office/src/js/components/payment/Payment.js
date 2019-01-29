import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Route, Switch} from 'react-router-dom';
import {withRouter} from 'react-router';

import Title from 'js/components/common/Title';
import Verification from 'js/components/payment/Verification';
import PaymentStepTwo from 'js/components/payment/PaymentStepTwo';
import PaymentStepThree from 'js/components/payment/PaymentStepThree';
import PaymentStepFour from 'js/components/payment/PaymentStepFour';
import CurrenciesPopup from 'js/components/payment/CurrenciesPopup';
import Steps from 'js/components/payment/stateless/Steps';


class Payment extends React.Component {

    render() {
        const {showCurrenciesPopup, step, state} = this.props;

        return (
            <Wrapper>
                <Title>Payment</Title>
                <Steps step={step} className={state && 'centered'}/>
                <Switch>
                    <Route exact path="/user_office/payment/verification" component={Verification}/>
                    <Route exact path="/user_office/payment/method" component={PaymentStepTwo}/>
                    <Route exact path="/user_office/payment/buy" component={PaymentStepThree}/>
                    <Route exact path="/user_office/payment/finish" component={PaymentStepFour}/>
                </Switch>
                {showCurrenciesPopup && <CurrenciesPopup/>}
            </Wrapper>
        )
    }
};


const mapStateToProps = ({UI, KYC}) => ({
    showCurrenciesPopup: UI.get('showCurrenciesPopup'),
    step: UI.get('step'),
    state: KYC.get('state'),
})

const mapDispatchToProps = (dispatch) => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Payment));

const Wrapper = styled.div`
    flex-basis: 100%;
`;
