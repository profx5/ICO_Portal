import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';

import Title from 'js/components/common/Title';
import DepositTable from "js/components/transactions/DepositTable";


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
`;
