import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import {media} from './../../utils/media';

import Title from './../common/Title';
import DepositTable from "./DepositTable";


class Transactions extends React.Component {

    render() {

        return (
            <Wrapper>
                <Title>Transactions</Title>
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
    ${media.xs} {
        margin: 0 16px;
        padding-bottom: 50px;
    }
`;
