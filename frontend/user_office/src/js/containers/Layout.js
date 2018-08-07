import React, {Component} from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import {Route, Switch} from 'react-router-dom';
import {withRouter} from 'react-router';
import $ from 'jquery';

import NavSidebar from './NavSidebar';
import Header from './Header';

import Verification from './Verification';
import Settings from './Settings';
import Dashboard from './Dashboard';
import Transactions from './Transactions'
import FAQFeedback from './FAQFeedback';
import Payment from './Payment';

import history from './../utils/history';

import SetAccount from './SetAccount';

import * as UIActions from './../actions/UIActions';


class Layout extends Component {

    componentDidMount() {
        const {openedTip, closeOpenedTip, accountDropdownShown, hideAccountDropdown} = this.props;

        $(document).click(function(e) {
            if ($(e.target).hasClass('ModalWrapper')) {
                closeOpenedTip();
            }
            if (!$(e.target).hasClass('DropdownAccountTrigger') && !$(e.target).closest('.DropdownAccount').length) {
                hideAccountDropdown();
            }

        })
    }

    render() {

        return (
            <Wrapper>
                <Header/>
                <MainWrapper>
                    <NavSidebar/>
                    <Switch history={history}>
                        <Route exact path="/user_office" component={Dashboard}/>
                        <Route path="/user_office/transactions" component={Transactions}/>
                        <Route path="/user_office/payment" component={Payment} />
                        <Route path="/user_office/support/ticket/:ticket" component={FAQFeedback}/>
                        <Route path="/user_office/support" component={FAQFeedback}/>
                        <Route path="/user_office/verification" component={Verification}/>
                        <Route path="/user_office/settings" component={Settings}/>
                    </Switch>
                    {this.props.showSetAccountPopup && <SetAccount/>}
                </MainWrapper>
            </Wrapper>
        )
    }
}

const mapStateToProps = ({UI}) => ({
    currentRoute: UI.get('currentRoute'),
    showSetAccountPopup: UI.get('showSetAccountPopup'),
    openedTip: UI.get('openedTip'),
    accountDropdownShown: UI.get('accountDropdownShown')
})

const mapDispatchToProps = (dispatch) => ({
    closeOpenedTip() {
        dispatch(UIActions.setOpenedTip(null))
    },
    hideAccountDropdown() {
        dispatch(UIActions.hideAccountDropdown())
    },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const MainWrapper = styled.div`
    display: flex;
    background: #F5F6FA;
`;
