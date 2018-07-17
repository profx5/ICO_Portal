import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import PaymentStepOne from './PaymentStepOne';
import Steps from './../components/Steps';


class Payment extends React.Component {

    render() {

        return (
            <Wrapper className="">
                <Head>Payment</Head>
                <Steps step="1"/>
                <PaymentStepOne/>
            </Wrapper>
        )
    }
};


const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Payment)


const Wrapper = styled.div`
    flex: 1;
    height: calc(100% - 100px);
    margin-left: 55px;
    margin-right: 55px;
    padding-bottom: 73px;
`;

const Head = styled.h2`
    font-size: 38px;
    line-height: 1;
    font-weight: 400;
    color: #233539;
    letter-spacing: 0.8px;
    margin-top: 65px;
    padding-bottom: 40px;
`;