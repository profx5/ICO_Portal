import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import CurrencyCalculator from './CurrencyCalculator';
import Currency from './Currency';

import Button from './../components/Button';
import qrIcon from './../../img/icon_qr_big.svg';

import { Link } from 'react-router-dom';


class PaymentStepThree extends React.Component {

    render() {

        return (
            <Wrapper>
                <Head>Your transaction is already on its way to your wallet!</Head>
                <Row className="PaymentRow PaymentRow-1">
                    <RowPart className="part">
                        <div className="text">Great! If you already transfered funds on the account - just press "I already paid!" button. This action will finish your purchase!</div>
                    </RowPart>
                    <RowPart className="part">
                        <BtnWrapper to="/user_office/transactions">
                            <Button text="Go to transactions"/>
                        </BtnWrapper>
                    </RowPart>
                </Row>
            </Wrapper>
        )
    }
};


const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStepThree)


const Wrapper = styled.div`
    flex: 1;
    height: auto;
    margin-top: 42px;
    padding: 42px 105px 65px;
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

const Row = styled.div`
    &.PaymentRow {
        &-1 {
            .text {
                font-size: 14px;
                color: #000000;
                letter-spacing: 0.4px;
                position: relative;
                line-height: 1.64;
                padding-left: 15px;
                padding-right: 150px;
                span {
                    color: #3476fd;
                    text-decoration: underline;
                }
                &:before {
                    content: '';
                    display: block;
                    width: 4px;
                    height: 110%;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    border-radius: 2px;
                    background: #4f99f6;
                }
            }
        }
    }
`;

const RowPart = styled.div`
    &.amount {

    }
`;

const BtnWrapper = styled(Link)`
    width: 250px;
    height: 68px;
    display: block;
    margin: 0 auto;
    margin-top: 32px;
`;
