import React, {Component} from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import {Route, Switch} from 'react-router-dom';
import {withRouter} from 'react-router';
import $ from 'jquery';
import history from './../../utils/history';

import NavSidebar from './components/NavSidebar';
import Nav from './components/Nav';
import Header from './Header';

import Dashboard from './../dashboard/Dashboard';
import Transactions from './../transactions/Transactions'
import Payment from './../payment/Payment';
import Support from './../support/Support';
import Verification from './../verification/Verification';
import Settings from './../settings/Settings';
import Referrals from './../referrals/Referrals';

import SetAccount from './SetAccount';

import CustomModals from './CustomModals';
import Modal from './Modal';

import * as UIActions from './../../actions/UIActions';


class Layout extends Component {

    componentDidMount() {
        const {hideAccountDropdown, hideModal} = this.props;

        $(document).click(function(e) {
            if ($(e.target).hasClass('ModalWrapper')) {
                hideModal();
            }
            if (!$(e.target).hasClass('DropdownAccountTrigger') && !$(e.target).closest('.DropdownAccount').length) {
                hideAccountDropdown();
            }
        })
    }

    render() {
        const {showSetAccountPopup, modalOpened, openedModalId, modalHead, modalContent} = this.props;

        return (
            <Wrapper>
                <Header/>
                <MainWrapper>
                    <NavSidebar>
                        <Nav/>
                    </NavSidebar>
                    <Switch history={history}>
                        <Route exact path="/user_office" component={Dashboard}/>
                        <Route path="/user_office/transactions" component={Transactions}/>
                        <Route path="/user_office/payment" component={Payment} />
                        <Route path="/user_office/support/ticket/:ticket" component={Support}/>
                        <Route path="/user_office/support" component={Support}/>
                        <Route path="/user_office/verification" component={Verification}/>
                        <Route path="/user_office/settings" component={Settings}/>
                        <Route path="/user_office/referrals" component={Referrals}/>
                    </Switch>
                    {showSetAccountPopup && <SetAccount/>}
                    {modalOpened && modalHead && modalContent && <Modal/>}
                    {modalOpened && openedModalId && <CustomModals/>}
                </MainWrapper>
            </Wrapper>
        )
    }
}

const mapStateToProps = ({UI}) => ({
    showSetAccountPopup: UI.get('showSetAccountPopup'),
    openedTip: UI.get('openedTip'),
    accountDropdownShown: UI.get('accountDropdownShown'),
    modalOpened: UI.get('modalOpened'),
    openedModalId: UI.get('openedModalId'),
    modalHead: UI.get('modalHead'),
    modalContent: UI.get('modalContent'),
})

const mapDispatchToProps = (dispatch) => ({
    closeOpenedTip() {
        dispatch(UIActions.setOpenedTip(null))
    },
    hideAccountDropdown() {
        dispatch(UIActions.hideAccountDropdown())
    },
    hideModal() {
        dispatch(UIActions.hideModal())
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));


//———————————————————————————————————————————————————————————————————————————————


const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const MainWrapper = styled.div`
    display: flex;
    background: #F5F6FA;
    min-height: calc(100vh - 90px);
`;
