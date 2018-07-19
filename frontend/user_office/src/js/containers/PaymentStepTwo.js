import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import CurrencyCalculator from './CurrencyCalculator';
import Currency from './Currency';

import Button from './../components/Button';
import qrIcon from './../../img/icon_qr_big.svg';

import { Link } from 'react-router-dom';


class PaymentStepTwo extends React.Component {

    render() {

        return (
            <Wrapper>
                <Head>Покупка токенов</Head>
                <Row className="PaymentRow PaymentRow-1">
                    <RowPart className="part">
                        <div className="head">К оплате</div>
                        <div className="amount">150 <span>TKN</span> &nbsp;<span>=</span>&nbsp; 0.0333 <span>ETH</span></div>
                        <div className="desc">Текущий курс закреплен на 15 минут</div>
                    </RowPart>
                    <RowPart className="part">
                        <Link to="/user_office/payment">
                            <BtnWrapper>
                                <Button text="Изменить количество" />
                            </BtnWrapper>
                        </Link>
                    </RowPart>
                </Row>
                <Row className="PaymentRow PaymentRow-2">
                    <div>
                        Которая инструкция о том, что 
                        вы можете скопировать адрес кошелька, 
                        на который нужно перевести деньги или 
                        вы можете это сделать через QR код, при наведении&nbsp;
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                              <g fill="none" fill-rule="evenodd">
                                <path fill="#F5F6FA" d="M-717-723H723V517H-717z"/>
                                <g fill="#000" fill-rule="nonzero">
                                  <path d="M6.719 0H.469A.469.469 0 0 0 0 .469v6.25c0 .259.21.468.469.468h6.25c.259 0 .468-.21.468-.468V.469A.469.469 0 0 0 6.72 0zM6.25 6.25H.937V.937H6.25V6.25z"/>
                                  <path d="M4.531 2.188H2.656a.469.469 0 0 0-.469.468v1.875c0 .26.21.469.47.469H4.53c.261 0 .47-.21.47-.469V2.656a.469.469 0 0 0-.469-.469zm-.468 1.874h-.938v-.937h.938v.938zM15.531 0h-6.25a.469.469 0 0 0-.469.469v6.25c0 .259.21.468.47.468h6.25c.258 0 .468-.21.468-.468V.469A.469.469 0 0 0 15.531 0zm-.469 6.25H9.75V.937h5.313V6.25z"/>
                                  <path d="M13.344 2.188h-1.875a.469.469 0 0 0-.469.468v1.875c0 .26.21.469.469.469h1.875c.259 0 .469-.21.469-.469V2.656a.469.469 0 0 0-.47-.469zm-.469 1.874h-.938v-.937h.938v.938zM6.719 8.813H.469A.469.469 0 0 0 0 9.28v6.25c0 .26.21.469.469.469h6.25c.259 0 .468-.21.468-.469V9.28a.469.469 0 0 0-.468-.469zm-.469 6.25H.937V9.75H6.25v5.313z"/>
                                  <path d="M4.531 11H2.656a.469.469 0 0 0-.469.469v1.875c0 .259.21.469.47.469H4.53c.26 0 .469-.21.469-.47V11.47a.469.469 0 0 0-.468-.47zm-.468 1.875h-.938v-.938h.938v.938zm11.468.332h-2.656V11.47a.469.469 0 0 0-.938 0v2.207c0 .259.21.469.47.469h2.655v.918h-2.656a.469.469 0 0 0 0 .937h3.125c.26 0 .469-.21.469-.469v-1.855a.469.469 0 0 0-.469-.469zm0-4.394a.469.469 0 0 0-.469.468v2.188a.469.469 0 0 0 .938 0V9.28a.469.469 0 0 0-.469-.469zm-4.062 0H9.28a.469.469 0 0 0-.469.468v2.188a.469.469 0 0 0 .938 0V9.75h1.719a.469.469 0 0 0 0-.938zm-2.188 4.394a.469.469 0 0 0-.469.47v1.854a.469.469 0 0 0 .938 0v-1.855a.469.469 0 0 0-.469-.469z"/>
                                </g>
                              </g>
                            </svg>&nbsp;. Cras quis nulla commodo, aliquam lectus sed.
                        </span>
                    </div>
                </Row>
                <Row className="PaymentRow-3">
                    <RowPart className="part">
                        <div className="head">Кошелек</div>
                        <div className="number">0x1c61431692ccd575b3849d7595d8d42e4c3d22c3</div>
                    </RowPart>
                    <RowPart className="part">
                        <BtnWrapper>
                            <Button text="Скопировать" />
                        </BtnWrapper>
                    </RowPart>
                </Row>
                <Row className="PaymentRow-4">
                    <RowPart className="part">
                        <div className="text">*После того, как вы оплатите, токены 
                            придут <span>в течении 24 часов</span>. Cras quis nulla
                            commodo, aliquam lectus sed, blandit augue. Cras ullamcorper 
                            bibendum bibendum.</div>
                    </RowPart>
                    <RowPart>
                        <BtnWrapper>
                            <Button text="Я оплатил" />
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStepTwo)


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

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    .part:first-of-type {
        flex: 1;
    }
    .part:last-of-type {
        margin-left: 30px;
    }
    &.PaymentRow {
        &-1 {
            margin-bottom: 65px;
            .part {
                &:last-of-type {
                    display: flex;
                    align-items: center;
                }
            }
            .head {
                font-size: 16px;
                color: #000000;
                margin-bottom: 15px;
            }
            .amount {
                font-size: 45px;
                color: #000000;
                font-weight: 600;
                margin-bottom: 15px;
                span {
                    font-size: 25px;
                }
            }
            .desc {
                font-size: 14px;
                color: #000000;
                opacity: .4;
            }
        }
        &-2 {
            padding-top: 60px;
            border-top: 1px solid rgba(151,151,151,.2);
            margin-bottom: 45px;
            div {
                font-size: 16px;
                color: #000000;
                letter-spacing: 0.4px;
                position: relative;
                padding-left: 15px;
                &:before {
                    content: '';
                    display: block;
                    width: 4px;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    border-radius: 2px;
                    background: #4f99f6;
                }
            }
        }
        &-3 {
            padding-bottom: 67px;
            border-bottom: 1px solid rgba(151,151,151,.2);
            margin-bottom: 80px;
            .head {
                color: #323c47;
                font-size: 16px;
                padding-bottom: 10px;
            }
            .number {
                height: 68px;
                border: 1px solid #d6dfe6;
                border-radius: 2px;
                color: rgba(56,123,252,.6);
                letter-spacing: 0.6px;
                font-size: 18px;
                padding: 0 25px;
                display: flex;
                align-items: center;
                position: relative;
                &:after {
                    content: url(${qrIcon});
                    position: absolute;
                    right: 25px;
                    top: calc(50% + 4px);
                    transform: translateY(-50%);
                }
            }
            .part:last-of-type {
                display: flex;
                align-items: flex-end;
            }
        }
        &-4 {
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
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
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

const BtnWrapper = styled.div`
    width: 250px;
    height: 68px;
`;
