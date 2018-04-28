import React from 'react';
import styled from 'styled-components';

import clockImg from './../../img/icon_progress.svg';
import Button from './../components/Button';



class ICOProgress extends React.Component {

    render() {
        return (
            <Wrapper>
                <Header>
                    <Head>ICO Progress</Head>
                    <WrapperHeaderInfo>
                        <Text>Current phase: <Span>preICO</Span></Text>
                        <Text>Current bonus: <Span>40%</Span></Text>
                        <Text>Funds raised: <Span colored>123 566 USD</Span></Text>
                    </WrapperHeaderInfo>
                </Header>
                <Content>
                    <ContentPart>
                        <ContentProgressCell noBorderBottom progress="80%" color="#ffffff" background="rgba(79,221,190,.4)">25M USD / 35M USD</ContentProgressCell>
                        <ContentCell noBorderBottom>Pre ICO</ContentCell>
                        <ContentCell noBorderBottom>Current bonus: 40%</ContentCell>
                        <ContentCell>Remaining: 
                            <Span colored>11 days 01h 15m 12s</Span>
                        </ContentCell>
                    </ContentPart>
                    <ContentPart>
                        <ContentCell noBorderBottom background="#ececec">Expectation</ContentCell>
                        <ContentCell noBorderBottom>ICO phase 1</ContentCell>
                        <ContentCell noBorderBottom>ICO phase 2</ContentCell>
                        <ContentCell noBorderBottom>ICO phase 3</ContentCell>
                        <ContentCell statusCell></ContentCell>
                        <ContentCell statusCell></ContentCell>
                        <ContentCell statusCell></ContentCell>
                    </ContentPart>
                </Content>
                <ButtonWrapper>
                    <Button text='Buy TKN'/>
                </ButtonWrapper>
            </Wrapper>
        )
    }
};


export default ICOProgress;

const Wrapper = styled.div`
    flex: 1;
    height: auto;
    margin-top: 22px;
    padding: 42px 30px 34px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
`;

const WrapperHeaderInfo = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 46px;
`;

const Head = styled.h3`
    font-size: 20px;
    font-weight: 500;
    color: #323c47;
    letter-spacing: 0.1px;
`;

const Text = styled.p`
    &:not(:only-child):not(:first-child):before {
        content: '';
        display: inline-block;
        width: 1px;
        height: 20px;
        margin: 0 23px;
        opacity: 0.3;
        background: #282b2a;
        position: relative;
        top: 4px;
    }
`;

const Span = styled.span`
    font-weight: 600;
    letter-spacing: normal;
    color: ${props => props.colored ? '#4fddbe' : '#323c47'};
`;

const Content = styled.div`
    display: flex;
    flex-flow: row nowrap;
`;

const ContentPart = styled.div`
    display: inline-flex;
    flex-flow: row wrap;
    align-items: flex-start;
    &:first-of-type {
        flex-basis: 57%;
        border-left: solid 1px #d6dfe6;
        div {
            flex-basis: 100%;
        }
    }
    &:last-of-type {
        flex-basis: 43%;
        div {
            &:first-of-type {
                flex-basis: 100%;
            }
            &:not(:first-of-type) {
                flex-basis: 33.33%;
            } 
        }
    }
`;

const ContentCell = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.color || '#233539'}

    height: ${props => props.statusCell ? '90px' : '45px'};

    background: ${props => props.statusCell ? `url(${clockImg}) no-repeat center` : props.background || 'unset'};

    border-top: ${props => props.noBorderTop ? 'none' : 'solid 1px #d6dfe6'};
    border-right: ${props => props.noBorderRight ? 'none' : 'solid 1px #d6dfe6'};
    border-bottom: ${props => props.noBorderBottom ? 'none' : 'solid 1px #d6dfe6'};

`;

const ContentProgressCell = ContentCell.extend`
    position: relative;
    z-index: 1;
    &:before {
        content: '';
        background: linear-gradient(to right, #87f0e0, #4fddbe);
        z-index: -1;
        display: block;
        position: absolute
        left: 0;
        top: 0;
        height: 100%;
        width: ${props => props.progress || '0%'};
    }
`;

const ButtonWrapper = styled.div`
    width: 165px;
    margin-left: auto;
    margin-top: 30px;
`;