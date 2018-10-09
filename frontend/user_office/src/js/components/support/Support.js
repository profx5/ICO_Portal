import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'
import $ from 'jquery';

import SupportTabs from './components/SupportTabs';
import NewTicket from './NewTicket';
import AllQuestions from './AllQuestions';
import OpenedTicket from './OpenedTicket';

import * as UIActions from './../../actions/UIActions';


class Support extends React.Component {

    onAttachClickHandler = (name, event) => {
        event.preventDefault();
        const $filesBlock = $(event.target).closest('.files-section').find('.files-container');

        const $newFileInput = $(`<input class="file-input" id=${Math.floor(Math.random() * (10000000 - 0 + 1)) + 0} type="file" name="${name}" hidden/>`);

        $filesBlock.append($newFileInput);
        $newFileInput.click();
    }


    render() {
        const {tickets, selectedTicket, activeSupportTab, activateSupportTab} = this.props;

        return (
            <Wrapper>
                <Head>FAQ & Feedback</Head>
                <SupportTabs tabClickHandler={activateSupportTab} ticketsAmount={tickets} activeTab={activeSupportTab} isTicketOpened={!!selectedTicket}/>
                {!selectedTicket && activeSupportTab === 1 && <NewTicket onAttachClickHandler={this.onAttachClickHandler}/>}
                {!selectedTicket && activeSupportTab === 2 && <AllQuestions/>}
                {selectedTicket && <OpenedTicket onAttachClickHandler={this.onAttachClickHandler}/>}
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
    margin-top: 65px;
    margin-bottom: 60px;
`;
