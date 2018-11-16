import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import moment from "moment/moment";
import {media} from './../../utils/media';

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
                        <Link className="hidden-xs Ticket_linkBack" to="/user_office/support" onClick={unselectTicket}>My questions</Link>
                        <img src={breadcrumbsArrow} alt="Arrow icon"/>
                        <span className="hidden-xs">{title}</span>
                        <Link className="Ticket_linkBack visible-xs" to="/user_office/support" onClick={unselectTicket}>Back</Link>
                    </div>
                    <div className="hidden-xs">
                        <img src={[3,4].includes(status) ? iconResolved : iconPending} alt="Ticket status icon"/>
                        <div>{[3,4].includes(status) ? "Ticket is closed" : "Ticket is open"}</div>
                    </div>
                </Header>
                <div>
                    {this.renderMessages(public_follow_ups)}
                </div>
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
    ${media.xs} {
        padding: 0 16px 32px;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(151, 151, 151,.2);
    padding-bottom: 33px;
    margin-bottom: 31px;
    ${media.xs} {
        padding-bottom: 0;
    }
    div:nth-of-type(1) {
        display: inline-flex;
        align-items: center;
        font-size: 16px;
        ${media.xs} {
           height: 55px;
        }
        .Ticket_linkBack:first-of-type {
            color: rgb(92, 141, 245);
        }
        img {
            margin: 0 10px;
            ${media.xs} {
                transform: rotate(180deg);
                margin: 0 5px 0 0;
            }
        }
    }
    .Ticket_linkBack {
        color: inherit;
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

const Message = styled.div`
    display: flex;
    flex-flow: row nowrap;
    border-bottom: 1px solid rgba(151, 151, 151,.2);
    padding-bottom: 50px;
    ${media.xs} {
        padding-bottom: 35px;
    }
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
        ${media.xs} {
            width: 35px;
            margin-right: 8px;
        }
    }
`;

const MessageContent = styled.div`
    ${media.xs} {
        flex: 1;
        position: relative
    }
    .comment-sender {
        font-size: 18px;
        color: rgb(49, 114, 253);
        margin-bottom: 14px;
        ${media.xs} {
            font-size: 16px;
            margin-bottom: 7px;
        }
    }
    .comment-text {
        font-size: 16px;
        line-height: 1.56;
        margin-bottom: 23px;
        word-break: break-word;
        ${media.xs} {
            font-size: 14px;
            margin-bottom: 0;
        }
    }
    .comment-files {
        overflow: auto;
        ${media.xs} {
            position: relative;
            left: -42px;
            width: calc(100% + 42px);
        }
        .attached-file {
            &:last-of-type {
                margin-bottom: 23px;
                ${media.xs} {
                    margin-bottom: 6px;
                }
            }
        }
    }
    .comment-filesAmount {
        font-size: 16px;
        color: rgb(0, 0, 0);
        margin-bottom: 10px;
        ${media.xs} {
            font-size: 14px;
            margin-top: 30px;
            position: relative;
            left: -42px;
        }
    }
    .comment-date {
        font-size: 16px;
        color: rgba(3, 25, 73, .4);
        ${media.xs} {
            font-size: 12px;
            position: absolute;
            top: 0;
            right: 0;
        }
    }
`;
