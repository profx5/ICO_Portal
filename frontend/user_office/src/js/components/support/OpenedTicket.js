import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import moment from "moment/moment";

import TicketCommentForm from './TicketCommentForm';
import AttachedFile from './../common/AttachedFile';

import * as TicketActions from './../../actions/TicketActions';

import iconUser from './../../../img/user.svg';
import iconResolved from './../../../img/check-green.svg';
import iconPending from './../../../img/icon_transit-amber.svg';
import breadcrumbsArrow from './../../../img/arrow_roadmap.svg';


class OpenedTicket extends React.Component {

    renderAttachedFiles = (attachments) => {
        return attachments.map((file, index) => {
            return (
                <AttachedFile key={index} fileName={file.filename} />
            )
        })
    }

    renderMessages = (data) => {
        return data.map((message, index) => {
            const {email} = this.props;
            const {comment, sender, attachments} = message;

            return (
                <Message key={index}>
                    <div>
                        <img src={iconUser} alt="User icon"/>
                    </div>
                    <MessageContent>
                        <div className="comment-sender">{sender === email && "You" || sender}</div>
                        <div className="comment-text">{comment}</div>
                        {attachments.length !== 0 && 
                            <React.Fragment>
                                <div className="comment-filesAmount">Attached files: {attachments.length}</div>
                                <div className="comment-files">
                                    {this.renderAttachedFiles(attachments)}
                                </div>
                            </React.Fragment>
                        }
                        <div className="comment-date">{moment().format('ll')} {moment().format('HH:mm')}</div>
                    </MessageContent>
                </Message>
            )
        })
    }

    render() {
        const {selectedTicket, unselectTicket, onAttachClickHandler} = this.props;
        const {title, status, public_follow_ups} = selectedTicket;

        return (
            <Wrapper>
                <Header>
                    <div>
                        <Link to="/user_office/support" onClick={unselectTicket}>My questions</Link>
                        <img src={breadcrumbsArrow} alt="Arrow icon"/>
                        <span>{title}</span>
                    </div>
                    <div>
                        <img src={[3,4].includes(status) ? iconResolved : iconPending} alt="Ticket status icon"/>
                        <div>{[3,4].includes(status) ? "Ticket is closed" : "Ticket is open"}</div>
                    </div>
                </Header>
                <Content>
                    {this.renderMessages(public_follow_ups)}
                </Content>
                <TicketCommentForm onAttachClickHandler={onAttachClickHandler}/>
            </Wrapper>
        )
    }
}


const mapStateToProps = ({tickets, user}) => ({
    selectedTicket: tickets.get('selectedTicket'),
    email: user.get('email'),
});

const mapDispatchToProps = (dispatch) => ({
    unselectTicket() {
        dispatch(TicketActions.unselectTicket())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenedTicket)

const Wrapper = styled.div`
    padding: 42px 50px 65px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(151, 151, 151,.2);
    padding-bottom: 33px;
    margin-bottom: 31px;
    div:nth-of-type(1) {
        display: inline-flex;
        align-items: center;
        font-size: 16px;
        a {
            color: rgb(92, 141, 245);
        }
        img {
            margin: 0 10px;
        }
    }
    div:nth-of-type(2) {
        display: inline-flex;
        align-items: center;
        color: rgba(3,25,73,.4);
        font-size: 14px;
        img {
            height: auto;
            width: 36px;
            min-width: 36px;
            margin: 0 15px
        }
    }
`;

const Content = styled.div`

`;

const Message = styled.div`
    display: flex;
    flex-flow: row nowrap;
    border-bottom: 1px solid rgba(151, 151, 151,.2);
    padding-bottom: 50px;
    &:not(:last-of-type) {
        margin-bottom: 40px;
    }
    &:last-of-type:not(:only-child) {
        margin-bottom: 46px;
    }
    img {
        margin-right: 18px;
        width: 48px;
        height: auto;
    }
`;

const MessageContent = styled.div`
    .comment-sender {
        font-size: 18px;
        color: rgb(49, 114, 253);
        margin-bottom: 14px;
    }
    .comment-text {
        font-size: 16px;
        line-height: 1.56;
        margin-bottom: 23px;
    }
    .comment-files {
        overflow: auto;
        .attached-file {
            &:last-of-type {
                margin-bottom: 23px;
            }
        }
    }
    .comment-filesAmount {
        font-size: 16px;
        color: rgb(0, 0, 0);
        margin-bottom: 10px;
    }
    .comment-date {
        font-size: 16px;
        color: rgba(3, 25, 73, .4);
    }
`;
