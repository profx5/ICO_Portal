import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'
import {media} from 'js/utils/media';

import Ticket from 'js/components/support/stateless/Ticket';

import * as TicketActions from 'js/actions/TicketActions';


class AllTickets extends React.Component {

    renderTickets = () => {
        const {tickets, email, getSelectedTicket} = this.props;

        return tickets.map((item, index) => {
            return <Ticket
                email={email}
                key={index}
                id={item.id}
                status={item.status}
                title={item.title}
                lastReplyBy={item.last_reply_by}
                lastReplyAt={item.last_reply_at}
                created={item.created}
                onClickHandler={getSelectedTicket}
            />
        })
    }

    render() {
        const {tickets} = this.props;

        return (
            <Wrapper>
                <TicketsList>
                    <tbody>
                        {tickets.length && this.renderTickets() || 
                            <tr><td className="AllTickets_warnText">There are no tickets yet...</td></tr>
                        }
                    </tbody>
                </TicketsList>
            </Wrapper>
        )
    }
}

const mapStateToProps = ({tickets, user}) => ({
    tickets: tickets.get('results'),
    email: user.get('email'),
});

const mapDispatchToProps = (dispatch) => ({
    getSelectedTicket(payload) {
        dispatch(TicketActions.getSelectedTicket(payload))
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(AllTickets)

const Wrapper = styled.div`
    flex: 1;
    height: auto;
    padding: 50px 50px 65px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    ${media.xs} {
        padding: 32px 16px 20px;
    }
`;

const TicketsList = styled.table`
    width: 100%;
    .AllTickets_warnText {
        ${media.xs} {
            font-size: 14px;
        }
    }
`;
