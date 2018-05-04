import React from 'react';
import styled from 'styled-components';

import canSendTransaction from '../../web3';

import Button from './../components/Button';
import foxIcon from './../../img/metamask.png';
import checkIcon from './../../img/check.svg';


class Warnings extends React.Component {


    render() {
        return (
            <div>
                <Wrapper background="#F6DD9C">
                    <Img src={foxIcon}/>
                    <Text color="#484643">In order to commit a transition, you must <Link href="https://metamask.io/" target="blank">download metamask</Link></Text>
                </Wrapper>
                <Wrapper background="#F46C6E">
                    <Img src={checkIcon}/>
                    <Text color="#ffffff">You did not pass KYS confirmation. Your invstment threshold is limited 10000</Text>
                    <ButtonWrapper>
                        <Button className="btn-white" color="#484643" background="#ffffff" text='Pass KYC'/>
                    </ButtonWrapper>
                </Wrapper>
            </div>
        );
    }
}


export default Warnings;

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

const Link = styled.a`
    text-decoration: underline;
`;

const ButtonWrapper = styled.span`
    width: 184px;
`;