import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';

import Button from './../components/Button';



class Transactions extends React.Component {

    render() {

        return (
            <Wrapper>
                <Head>Transactions</Head>
                <Content>
                    {this.props.children}
                </Content>
                <Controls>
                    <FetchLink>All more</FetchLink>
                    <ButtonWrapper>
                        <Button text="Buy TKN" />
                    </ButtonWrapper>
                </Controls>
            </Wrapper>
        )
    }
};



const mapStateToProps = ({}) => ({

})

const mapDispatchToProps = (dispatch) => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(Transactions)


const Wrapper = styled.div`
    flex: 1;
    height: auto;
    margin-top: 22px;
    padding: 42px 30px 34px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
`;

const Head = styled.h3`
    font-size: 20px;
    font-weight: 500;
    color: #323c47;
    letter-spacing: 0.1px;
    margin-bottom: 40px;
`;

const Content = styled.div`
    margin-bottom: 35px;
`;

const Controls = styled.div`
    position: relative;
`;

const FetchLink = styled.a`
    display: inline-block;
    text-transform: uppercase;
    color: #3172fd;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    &:hover {
        color: #3172fd;
    }
    &:before {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: #3172fd;
    }
`;

const ButtonWrapper = styled.div`
    width: 165px;
    margin-left: auto;
`;