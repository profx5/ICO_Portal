import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'
import $ from 'jquery';

import Title from 'js/components/common/Title';
import SupportTabs from 'js/components/support/stateless/SupportTabs';
import NewTicket from 'js/components/support/NewTicket';
import AllTickets from 'js/components/support/AllTickets';
import OpenedTicket from 'js/components/support/OpenedTicket';

import * as UIActions from 'js/actions/UIActions';


class Support extends React.Component {

    constructor() {
        super();
        this.currentFileId = 0;
    }

    render() {
        const {tickets, selectedTicket, activeSupportTab, activateSupportTab} = this.props;

        return (
            <Wrapper>
                <Title>FAQ & Feedback</Title>
                <SupportTabs tabClickHandler={activateSupportTab} ticketsAmount={tickets} activeTab={activeSupportTab} isTicketOpened={!!selectedTicket}/>
                {!selectedTicket && activeSupportTab === 1 && <NewTicket/>}
                {!selectedTicket && activeSupportTab === 2 && <AllTickets/>}
                {selectedTicket && <OpenedTicket/>}
            </Wrapper>
        )
    }
}


const mapStateToProps = ({tickets, UI}) => ({
    tickets: tickets.get('results'),
    selectedTicket: tickets.get('selectedTicket'),
    activeSupportTab: UI.get('activeSupportTab')
});

const mapDispatchToProps = (dispatch) => ({
    activateSupportTab(payload) {
        dispatch(UIActions.changeActiveTab(payload))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Support)

const Wrapper = styled.div`
    flex: 1;
`;
