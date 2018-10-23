import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';

import DepositTable from "./DepositTable";


class Transactions extends React.Component {

    render() {

        return (
            <Wrapper>
                <Head>Transactions</Head>
                <DepositTable/>
            </Wrapper>
        )
    }
}


const mapStateToProps = ({deposits}) => ({

})

const mapDispatchToProps = (dispatch) => ({

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
    margin-top: 50px;
`;
