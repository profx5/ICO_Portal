import React, {Component} from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import {Route, Switch} from 'react-router-dom';
import {withRouter} from 'react-router';
import $ from 'jquery';
import history from './../../utils/history';
import {media} from './../../utils/media';

import NavSidebar from './components/NavSidebar';
import Nav from './components/Nav';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import Header from './Header';
import MobileNavSidebar from './MobileNavSidebar';

import Dashboard from './../dashboard/Dashboard';
import Transactions from './../transactions/Transactions'
import Payment from './../payment/Payment';
import Support from './../support/Support';
import Verification from './../verification/Verification';
import Account from './../account/Account';
import Referrals from './../referrals/Referrals';

import SetAccount from './SetAccount';

import CustomModals from './CustomModals';
import Modal from './Modal';

import * as UIActions from './../../actions/UIActions';
import * as TicketActions from './../../actions/TicketActions';


class Layout extends Component {

    getTicket() {
        const {getSelectedTicket, unselectTicket} = this.props;
        const url = this.props.history.location.pathname;
        const ticketID = url.match(/\d+/g) || '';

        if (ticketID.length > 0) getSelectedTicket(+ticketID);
        else unselectTicket();
    }

    componentWillMount() {
        this.getTicket();
        this.unlisten = this.props.history.listen((location, action) => {
            this.getTicket(location.pathname);
        });
    }

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
        const {showSetAccountPopup, closeMobileSidebar, modalOpened, openedModalId, modalHead, modalContent, changeSupportActiveTab, mobileSidebarOpened} = this.props;

        return (
            <Wrapper>
                <Header/>
                <MainWrapper>
                    <NavSidebar>
                        <Nav changeSupportActiveTab={changeSupportActiveTab}/>
                    </NavSidebar>
                    {mobileSidebarOpened &&                     
                        <MobileNavSidebar>
                            <MobileNav onClickHandler={closeMobileSidebar} changeSupportActiveTab={changeSupportActiveTab}/>
                        </MobileNavSidebar>
                    }
                    <LayoutWrapper>
                        <Switch history={history}>
                                <Route exact path="/user_office" component={Dashboard}/>
                                <Route path="/user_office/transactions" component={Transactions}/>
                                <Route path="/user_office/payment" component={Payment} />
                                <Route path="/user_office/support/ticket/:ticket" component={Support}/>
                                <Route path="/user_office/support" component={Support}/>
                                <Route path="/user_office/verification" component={Verification}/>
                                <Route path="/user_office/account" component={Account}/>
                                <Route path="/user_office/referrals" component={Referrals}/>
                        </Switch>
                        <Footer/>
                    </LayoutWrapper>
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
    activeSupportTab: UI.get('activeSupportTab'),
    mobileSidebarOpened: UI.get('mobileSidebarOpened')
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
    },
    getSelectedTicket(payload) {
        dispatch(TicketActions.getSelectedTicket(payload))
    },
    unselectTicket() {
        dispatch(TicketActions.unselectTicket())
    },
    changeSupportActiveTab(payload) {
        dispatch(UIActions.changeActiveTab(payload))
    },
    closeMobileSidebar(payload) {
        dispatch(UIActions.closeMobileSidebar(payload))
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const MainWrapper = styled.div`
    display: flex;
    background: #F5F6FA;
    min-height: calc(100vh - 90px);
    ${media.xs} {
        flex-wrap: wrap;
    }
`;

const LayoutWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    flex: 1;
    height: calc(100% - 100px);
    min-height: calc(100vh - 90px);
    margin-left: 55px;
    margin-right: 55px;
    ${media.xs} {
        width: calc(100vw - 32px);
        margin: 0 16px;
    }
`;
