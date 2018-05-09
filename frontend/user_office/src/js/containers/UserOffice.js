import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import styled from 'styled-components';

import Button from '../components/Button';
import Title from '../components/Title';

import Header from './Header';
import StatusSidebar from './StatusSidebar';
import Dashboard from './Dashboard';
import Verification from './Verification';

import * as UserActions from '../actions/UserActions';
import * as ICOInfoActions from '../actions/ICOInfoActions';
import * as DepositsActions from '../actions/DepositsActions';
import * as BountiesActions from '../actions/BountiesBalanceActions';

class UserOffice extends Component {
    componentDidMount() {
        const {getMe, getPhaseStats, getDeposite} = this.props;

        compose(getMe, getPhaseStats, getDeposite)();
    }

    handleClickForTransferModalWindow = (e) => {
        this.props.postTransferRequest()
    }

    render() {
        const { transfaerAllowed, transferErrorMessage } = this.props

        return (
            <Wrapper>
                <HeaderWrapper>
                    <Header/>
                </HeaderWrapper>
                {/*<Dashboard />*/}
                <Verification />
                <StatusSidebar/>
            </Wrapper>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMe() {
        dispatch(UserActions.getUserRequest())
    },
    getPhaseStats() {
         dispatch(ICOInfoActions.getICOInfoRequest())
    },
    getDeposite() {
        dispatch(DepositsActions.getDepositsRequest())
    },
    postTransferRequest() {
        dispatch(BountiesActions.postTransferRequest())
    }
})

const mapStateToProps = ({bountiesBalance}) => ({
    transfaerAllowed: bountiesBalance.getIn(['transfer', 'success']),
    transferErrorMessage: bountiesBalance.getIn(['transfer', 'error'])
})

export default connect(mapStateToProps, mapDispatchToProps)(UserOffice);

const Wrapper = styled.div`
    width: calc(100% - 105px);
    background: #F3F3F3;
    flex: 1;
    display: inline-flex;
    flex-flow: row wrap;
    justify-content: flex-end;
`;

const HeaderWrapper = styled.div`
    flex-basis: 100%;
`;