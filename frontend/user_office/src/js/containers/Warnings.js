import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';


import Button from './../components/Button';
import foxIcon from './../../img/metamask.png';
import checkIcon from './../../img/check.svg';

import * as UIActions from './../actions/UIActions';

import { Link } from 'react-router-dom';


class Warnings extends React.Component {

    render() {
        const {KYCStatus, isEthereumAccountExist, showSetAccountPopup} = this.props;
        const showKYCwidget = KYCStatus === 'DECLINED';

        return (
            <div>
                {typeof window.web3 === 'undefined' &&
                <Wrapper background="#F6DD9C">
                    <Img src={foxIcon}/>
                    <Text color="#484643">In order to commit a transition, you must <TextLink href="https://metamask.io/" target="blank">download metamask</TextLink></Text>
                </Wrapper>
                }

                {showKYCwidget &&
                <Wrapper background="#F46C6E">
                    <Img src={checkIcon}/>
                    <Text color="#ffffff">You did not pass KYS confirmation. Your invstment threshold is limited 10000</Text>
                        <ButtonWrapper>
                            <Link to="/user_office/verification">
                                <Button className="btn-white" color="#484643" background="#ffffff" text='Pass KYC'/>
                            </Link>
                        </ButtonWrapper>
                </Wrapper>
                }

                {!isEthereumAccountExist &&
                <Wrapper background="#F46C6E">
                    <Img src={checkIcon}/>
                    <Text color="#ffffff">You did not provide ETH account!</Text>
                    <ButtonWrapper>
                        <Button clickHandler={showSetAccountPopup} className="btn-white" color="#484643" background="#ffffff" text='Set now!'/>
                    </ButtonWrapper>
                </Wrapper>
                }

            </div>
        );
    }
}


const mapStateToProps = ({user, KYC, UI}) => ({
    kycRequired: user.get('kyc_required'),
    KYCStatus: KYC.get('state'),
    isEthereumAccountExist: user.get('eth_account') !== null,
    showSetAccountPopup: UI.get('showSetAccountPopup')
})

const mapDispatchToProps = (dispatch) => ({
    showSetAccountPopup() {
        dispatch(UIActions.showSetAccountPopup())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Warnings)


const Wrapper = styled.div`
    width: 100%;
    height: 60px;
    background: ${props => props.background};
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding-left: 161px;
`;

const Img = styled.img`
    margin-right: 24px;
`;

const Text = styled.p`
    font-weight: 600;
    margin-right: 24px;
    color: ${props => props.color || '#484643'};
`;

const TextLink = styled.a`
    text-decoration: underline;
`;

const ButtonWrapper = styled.span`
    width: 184px;
`;