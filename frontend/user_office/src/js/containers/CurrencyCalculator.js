import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import Button from './../components/Button';

import Invest from './Invest';

import * as CurrencyActions from './../actions/CurrencyActions';
import * as InvestActions from './../actions/InvestActions';



class CurrencyCalculator extends React.Component {

    render() {
        const {
            showInvestForm
        } = this.props;

        return (
            <Wrapper>
                <div>
                    <InputWrapper data-header="Amount" data-currency="ETH">
                        <Input type="text" placeholder="1"/>
                    </InputWrapper>
                    <InputWrapper data-header="TKN" data-currency="TNK">
                        <Input type="text"/>
                    </InputWrapper>
                    <ButtonWrapper>
                        <Button clickHandler={showInvestForm} text="INVEST"/>
                    </ButtonWrapper>
                </div>
                <Tip>
                    1 ETH = 1250.000 TNK
                </Tip>
            </Wrapper>
        )
    }
};



const mapStateToProps = ({}) => ({

})

const mapDispatchToProps = (dispatch) => ({
    showInvestForm() {
        dispatch(InvestActions.showForm())
    },
    hideInvestForm() {
        dispatch(InvestActions.hideForm())
    },
})


export default connect(mapStateToProps, mapDispatchToProps)(CurrencyCalculator)

const Wrapper = styled.div`
    margin-top: 107px;
`;

const InputWrapper = styled.div`
    display: inline-block;
    width: 226px;
    height: 45px;
    border: 1px solid #d6dfe6;
    position: relative;
    margin-right: 22px;
    &:before {
        content: attr(data-header);
        color: #0a0a0a;
        position: absolute;
        left: 0
        top: -35px;
    }
    &:after {
        content: attr(data-currency);
        color: #0a0a0a;
        position: absolute;
        right: 18px;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const Input = styled.input`
    display: block;
    font-weight: 600;
    height: 100%;
    width: 100%;
    padding-left: 18px;
    padding-right: 55px;
`;

const ButtonWrapper = styled.div`
    display: inline-block;
    width: 186px;
`;

const Tip = styled.span`
    font-size: 14px;
    color: #377afc;
    display: inline-block;
    position: relative;
    margin-top: 35px;
    &:before {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        position: absolute;
        left: 0;
        bottom: -1px;
        background #377afc;
    }
`;