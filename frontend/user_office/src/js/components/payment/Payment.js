import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Route, Switch} from 'react-router-dom';
import {withRouter} from 'react-router';
import {media} from './../../utils/media';

import Title from './../common/Title';
import PaymentStepOne from './PaymentStepOne';
import PaymentStepTwo from './PaymentStepTwo';
import PaymentStepThree from './PaymentStepThree';
import CurrenciesPopup from './CurrenciesPopup';
import Steps from './components/Steps';


class Payment extends React.Component {

    render() {
        const {isCurrenciesPopupVisible,step} = this.props;

        return (
            <Wrapper>
                <Title>Payment</Title>
                <Steps step={step}/>
                <Switch>
                    <Route exact path="/user_office/payment" component={PaymentStepOne}/>
                    <Route exact path="/user_office/payment/buy" component={PaymentStepTwo}/>
                    <Route exact path="/user_office/payment/finish" component={PaymentStepThree}/>
                </Switch>
                {isCurrenciesPopupVisible && <CurrenciesPopup/>}
            </Wrapper>
        )
    }
};


const mapStateToProps = ({UI}) => ({
    isCurrenciesPopupVisible: UI.get('showCurrenciesPopup'),
    step: UI.get('step')
})

const mapDispatchToProps = (dispatch) => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Payment));

const Wrapper = styled.div`
    flex: 1;
    height: calc(100% - 100px);
    margin-left: 55px;
    margin-right: 55px;
    padding-bottom: 73px;
    ${media.xs} {
        margin: 0 16px;
    }
`;
