import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import SetAccount from '../containers/SetAccount';
import Verification from '../containers/Verification';
import Settings from '../containers/Settings';

import Header from './Header';
import StatusSidebar from './StatusSidebar';
import Dashboard from './Dashboard';
import Payment from './Payment';

import * as BountiesActions from '../actions/BountiesBalanceActions';

import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';



class UserOffice extends Component {

    handleClickForTransferModalWindow = (e) => {
        this.props.postTransferRequest();
    }

    render() {
        const { showSetAccountPopup } = this.props;

        return (
            <Wrapper>
                <Switch>
                    {/*<Route exact path="/user_office" component={Dashboard} />*/}
                    {/*<Route exact path="/user_office" component={Payment} />*/}
{/*                    <Route path="/user_office/verification" component={Verification} />
                    <Route path="/user_office/settings" component={Settings} />*/}
                </Switch>
                {showSetAccountPopup && <SetAccount/>}
            </Wrapper>
        )
    }
}

const mapStateToProps = ({bountiesBalance, UI}) => ({
    transfaerAllowed: bountiesBalance.getIn(['transfer', 'success']),
    transferErrorMessage: bountiesBalance.getIn(['transfer', 'error']),
    showSetAccountPopup: UI.get('showSetAccountPopup')
})

const mapDispatchToProps = (dispatch) => ({
    postTransferRequest() {
        dispatch(BountiesActions.postTransferRequest())
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserOffice));

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
