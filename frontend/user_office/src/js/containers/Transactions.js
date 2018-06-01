import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';

import * as DepositsActions from './../actions/DepositsActions';

import Button from './../components/Button';



class Transactions extends React.Component {

    render() {

        const {pages, currentPage, incrementPage, decrementPage} = this.props;

        return (
            <Wrapper>
                <Head>Transactions</Head>
                <Content>
                    {this.props.children}
                </Content>
                <Controls>
                    <FetchLinksWrapper>
                        <FetchLink disabled={currentPage <= 1} onClick={decrementPage}>Prev</FetchLink>
                        <FetchLink disabled={currentPage === pages} onClick={incrementPage}>Next</FetchLink>
                    </FetchLinksWrapper>
                    <ButtonWrapper>
                        <Button text="Buy TKN" />
                    </ButtonWrapper>
                </Controls>
            </Wrapper>
        )
    }
};



const mapStateToProps = ({deposits}) => ({
    currentPage: deposits.get('current_page'),
    pages: deposits.get('pages')
})

const mapDispatchToProps = (dispatch) => ({
    incrementPage() {
        dispatch(DepositsActions.requestIncrementCurrentPage())
    },
    decrementPage() {
        dispatch(DepositsActions.requestDecrementCurrentPage())
    }
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

const FetchLinksWrapper = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display flex;
    justify-content: space-between;
    width: 100px;
`;

const FetchLink = styled.a`
    display: inline-block;
    text-transform: uppercase;
    color: ${props => props.disabled ? '#ccc' : '#3172fd'};
    pointer-events: ${props => props.disabled ? 'none' : 'all'};
    &:hover {
        color: #3172fd;
    }
`;

const ButtonWrapper = styled.div`
    width: 165px;
    margin-left: auto;
`;