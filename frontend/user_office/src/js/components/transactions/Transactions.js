import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';

import DepositTable from "./DepositTable";

import * as DepositsActions from './../../actions/DepositsActions';


class Transactions extends React.Component {

    render() {

        const {pages, currentPage, incrementPage, decrementPage} = this.props;

        return (
            <Wrapper>
                <Head>Transactions</Head>
                <DepositTable/>
                <Controls>
                    {pages !== 1 &&
                    <FetchLinksWrapper>
                        <FetchLink disabled={currentPage <= 1} onClick={decrementPage}>Prev</FetchLink>
                        <FetchLink disabled={currentPage === pages} onClick={incrementPage}>Next</FetchLink>
                    </FetchLinksWrapper>
                    }
                </Controls>
            </Wrapper>
        )
    }
}


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
`;

const Controls = styled.div`
    margin-top:35px;
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
