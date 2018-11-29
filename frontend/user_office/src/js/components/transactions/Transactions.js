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

`;
