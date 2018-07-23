import React from 'react';
import styled from 'styled-components';

import {connect} from 'react-redux'
import Button from "../components/Button";
import Comment from '../components/Comment';
import iconCheckGreen from './../../img/check-green.svg';
import iconTransitAmber from './../../img/icon_transit-amber.svg';
import iconUser from './../../img/user.svg';
import arrowRoadmap from './../../img/arrow_roadmap.svg';
import moment from "moment/moment";
import * as UIActions from './../actions/UIActions';
import * as TicketActions from './../actions/TicketActions';
import {Link} from 'react-router-dom';
import $ from "jquery";

const STATUSES = {
    1: 'Open',
    2: 'Reopen',
    3: 'Resolved',
    4: 'Closed',
    5: 'Duplicate',
};

class FAQFeedback extends React.Component {

    handleImage = e => {
        const {setNewTicketFiles} = this.props;
        let files = [];
        for (let i = 0; i < e.target.files.length; i++) {
            files.push(e.target.files[i].name);
        }
        setNewTicketFiles(files);
    };

    handleCommentImage = e => {
        const {setNewCommentFiles} = this.props;
        let files = [];
        for (let i = 0; i < e.target.files.length; i++) {
            files.push(e.target.files[i].name);
        }
        setNewCommentFiles(files);
    }

    setOpenedTicketNull = () => {
        const {setTicketFullNull} = this.props;
        setTicketFullNull();
    };

    uploadOnClickHandler = (e) => {
        e.preventDefault();
        $(e.currentTarget).closest('div').find('input[type="file"]').click();
    };

    _backToAll = () => {
        this.setOpenedTicketNull();
        this.props.history.push('/user_office/support/');
    };

    handleNewTicketFormSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        this.props.sendNewTicket(data);
        e.target.reset();
    };

    handleNewCommentSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        this.props.sendNewComment(data);
        e.target.reset();
    };


    _renderNewTicket = () => {
        const {newTicketFiles} = this.props;
        return (
            <form onSubmit={this.handleNewTicketFormSubmit} encType='multipart/form-data'>
                <Head3>Technical support</Head3>
                <WrapperInput>
                    <StyledLabel htmlFor={'title'}>Subject</StyledLabel>
                    <StyledInput
                        type="text"
                        id={'title'}
                        placeholder={'Please describe topic of your issue..'}
                        name={'title'}
                        required/>
                </WrapperInput>
                <br/>
                <WrapperInput>
                    <StyledLabel htmlFor={'description'}>Description</StyledLabel>
                    <StyledTextarea
                        id={'description'}
                        placeholder={'Please describe your issue in details..'}
                        name={'description'}/>
                </WrapperInput>
                <br/>
                {newTicketFiles &&
                <div>
                    {newTicketFiles.map((item, index) => {
                        return (
                            <FileWrapper key={index}>
                                <div>
                                    {item}
                                </div>
                            </FileWrapper>
                        )
                    })}
                </div>
                }
                <ButtonWrapper>
                    <Button submit={true} text='Send'/>
                </ButtonWrapper>

                <ButtonWrapper>
                    <Button clickHandler={this.uploadOnClickHandler} text="Attach file"/>
                    <input onChange={this.handleImage} type="file" name='attachment' multiple hidden/>
                </ButtonWrapper>
                <Clearfix/>
            </form>
        )
    };

    _renderAllQuestions = () => {
        const {tickets, email} = this.props;
        return (
            tickets.map((ticket) => {
                return (
                    <FlexContainer key={ticket.id}>
                        <FlexItem width={5}>
                            {[3, 4].includes(ticket.status) &&
                            <IconImg src={iconCheckGreen}/>}
                            {[1, 2].includes(ticket.status) &&
                            <IconImg src={iconTransitAmber}/>}
                        </FlexItem>
                        <FlexItem width={75}>
                            <div className='title'><Link
                                to={'/user_office/support/ticket/' + ticket.id}>{ticket.title}</Link></div>
                            <span>{[3, 4].includes(ticket.status) && 'Ticket closed' || 'Pending'}</span>
                        </FlexItem>
                        <FlexItem width={20} padding={'none'}>
                            <FlexContainer>
                                <FlexItem width={20} border={'none'}>
                                    <IconImg src={iconUser}/>
                                </FlexItem>
                                <FlexItem width={80} border={'none'}>
                                    <div>{ticket.last_reply_by === email && 'You' || ticket.last_reply_by}</div>
                                    <span>{ticket.last_reply_by !== email &&
                                    'Replied ' + moment(ticket.last_reply_at).format('DD MMMM YYYY') ||
                                    'Message sent ' + moment(ticket.created).format('DD MMMM YYYY')}</span>
                                </FlexItem>
                            </FlexContainer>
                        </FlexItem>
                    </FlexContainer>
                )
            })
        )
    };


    _renderOpenedTicket = () => {
        const {ticketFull, newCommentFiles} = this.props;
        let content = [];
        content.push(ticketFull.public_follow_ups.map((item, index) => {
            if (item) {
                return (
                    <Comment comment={item} key={index}/>
                )
            }
        }));
        return (
            <div>
                <HeadWrapper>
                    <div className='breadcrumbs'>
                        <span onClick={this._backToAll} className='link'>My questions</span>
                        <IconImg src={arrowRoadmap}/>
                        <span>{ticketFull.title}</span>
                        <span className='status'>
                        <div>
                            {[3, 4].includes(ticketFull.status) &&
                            <IconImg src={iconCheckGreen}/>}
                            {[1, 2].includes(ticketFull.status) &&
                            <IconImg src={iconTransitAmber}/>}
                            <div>{[3, 4].includes(ticketFull.status)
                            && 'Ticket closed'
                            || 'Ticket is open'}</div>
                        </div>
                    </span>
                    </div>
                </HeadWrapper>
                <ContentWrapper>
                    {content}
                </ContentWrapper>
                {[3, 4, 5].includes(ticketFull.status) &&
                <ClosedDiv>
                    Ticket was successfully closed. If you have another issue to submit - please create another ticket!
                    Thank you!
                </ClosedDiv>
                }
                {[1, 2].includes(ticketFull.status) &&
                <form encType={'multipart/form-data'} onSubmit={this.handleNewCommentSubmit}>
                    <input type="hidden" name={'ticket'} value={ticketFull.id}/>
                    <WrapperInput>
                        <StyledTextarea
                            placeholder={'Your message here'}
                            name={'comment'}
                            id={'comment'}
                        />
                    </WrapperInput>
                    {newCommentFiles &&
                    <div>
                        {newCommentFiles.map((item, index) => {
                            return (
                                <FileWrapper key={index}>
                                    <div>
                                        {item}
                                    </div>
                                </FileWrapper>
                            )
                        })}
                    </div>
                    }
                    <ButtonWrapper>
                        <Button submit={true} text='Send'/>
                    </ButtonWrapper>
                    <ButtonWrapper>
                        <Button clickHandler={this.uploadOnClickHandler} text="Attach file"/>
                        <input onChange={this.handleCommentImage} type="file" name='attachment' multiple hidden/>
                    </ButtonWrapper>
                </form>
                }
                <Clearfix/>
            </div>
        )
    };


    handleChangeTab = (e) => {
        const {changeTab, setTicketFullNull} = this.props;
        setTicketFullNull();
        changeTab(e.target.id);
        this.props.history.push('/user_office/support/');
    };

    _renderTickets = () => {
        const {ticketFull} = this.props;
        if (ticketFull === null) {
            return this._renderAllQuestions()
        } else {
            return this._renderOpenedTicket()
        }
    };

    render() {
        const {tab, changeTab, tickets, ticketFull, setOpenedTicket} = this.props;
        const openedTicket = this.props.match.params.ticket;
        if (openedTicket) {
            if (ticketFull !== null) {
                if (ticketFull.id != openedTicket) {
                    setOpenedTicket(openedTicket);
                }
            } else {
                setOpenedTicket(openedTicket);
            }
        }

        if (ticketFull) {
            changeTab('my');
        }

        return (
            <Wrapper>
                <Head>Support</Head>
                <Tabs>
                    <Tab id={'new'} onClick={this.handleChangeTab} active={tab === 'new'}>
                        New ticket
                    </Tab>

                    <Tab id={'my'} onClick={this.handleChangeTab} active={tab === 'my'}>
                        My questions <span>{tickets.length}</span>
                    </Tab>
                </Tabs>
                <Content>
                    {tab === 'new' &&
                    this._renderNewTicket()}
                    {tab === 'my' &&
                    this._renderTickets()}
                </Content>
            </Wrapper>
        )
    }
}


const mapStateToProps = ({UI, tickets, user}) => ({
    tab: UI.get('faqSelectedTab'),
    tickets: tickets.get('results'),
    ticketFull: tickets.get('ticketFull'),
    email: user.get('email'),
    newTicketFiles: UI.get('newTicketFiles'),
    newCommentFiles: UI.get('newCommentFiles'),
});

const mapDispatchToProps = (dispatch) => ({
    changeTab(tab) {
        dispatch(UIActions.changeSelectedTab(tab))
    },
    setOpenedTicket(ticketId) {
        dispatch(TicketActions.getTicketFull(ticketId));
    },
    setTicketFullNull() {
        dispatch(TicketActions.setTicketFullNull());
    },
    sendNewTicket(ticket) {
        dispatch(TicketActions.sendNewTicket(ticket));
    },
    sendNewComment(comment) {
        dispatch(TicketActions.sendNewComment(comment));
    },
    setNewTicketFiles(files) {
        dispatch(UIActions.setNewTicketFiles(files));
    },
    setNewCommentFiles(files) {
        dispatch(UIActions.setNewCommentFiles(files));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(FAQFeedback)

const FileWrapper = styled.div`
    height: 36px;
    font-size: 16px;
    font-weight: bold;
    line-height: 36px;
    letter-spacing: 0.5px;
    color: #5c8df5; 
    display: block;
    margin-top: 10px;
    & div {
        background-color: #f5f5f5;
        display: inline-block;
        padding: 2px 10px;
    }
`;

const ContentWrapper = styled.div`
    margin-bottom: 50px;
`;

const ClosedDiv = styled.div`
    background-color: #f6f6f6;
    border: solid 1px #d6dfe6;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.56;
    color: #233539;
    padding: 10px;
`;

const HeadWrapper = styled.div`
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.4px;
    color: #000000;
    & span.link {
        color: #3172fd;
        cursor: pointer;
    }
    .status {
        margin-left: auto;
        & div {
            display: flex;
        }
    }
    .status > div > div {
        line-height: 30px;
        margin-left: 5px;
        opacity: 0.4;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.4px;
        color: #031949;
    }
    .breadcrumbs {
        display: flex;
        & span {
            line-height: 30px;
        }
        & img {
            width: 30px;
            height: 30px;
        }
    }
`;

const FlexContainer = styled.div`
    display: flex;
`;

const IconImg = styled.img`
    width: 36px;
    height: 36px;
`;

const FlexItem = styled.div`
    width: ${props => props.width ? +props.width + '%' : 'auto'};
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0.1px;
    color: ${props => props.color ? '#031949' : props => props.failed ? 'rgba(0,0,0,0.2)' : '#000000'};
    border-top:  ${props => props.border ? props.border : '1px solid rgba(150, 150, 150, 0.2)'};
    position: ${props => props.position ? props.position : 'inherit' }
    padding: ${props => props.padding ? props.padding : '24.5px 0'};
    & span {
        opacity: 0.4;
        font-family: Gilroy;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.4px;
        color: #031949;
    }
    & br {
        line-height: 7px;
    }
    .title {
        cursor: pointer;
    }
`;

const ButtonWrapper = styled.div`
    width: 165px;
    height: 45px;
    float: right;
    margin: 15px;
`;

const Clearfix = styled.div`
    &:before {
        content:"";
        display:table-cell
    }
    &:after {
        content:"";
        display:table;
        clear:both
    }
`;

const WrapperInput = styled.div`
    position: relative;
    height: 100%;
`;

const StyledLabel = styled.label`
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.5px;
    color: #0a0a0a;
`;

const StyledInput = styled.input`
    margin-top: 15px;
    color: #233539;
    font-weight: 600;
    padding: 15px 13px;
    display: block;
    height: 45px;
    background-color: #ffffff;
    border: solid 1px #d6dfe6;    
    width: 100%;
    &:read-only {
        color: rgba(35,53,57,.3);
    }
    &::placeholder {
         opacity: 0.4;
         font-family: Gilroy;
         font-size: 16px;
         font-weight: 400;
         color: #233539;
    }
`;
const StyledTextarea = styled.textarea`
    margin-top: 15px;
    color: #233539;
    font-weight: 600;
    padding: 15px 13px;
    display: block;
    height: 180px;
    resize: none;
    background-color: #ffffff;
    border: solid 1px #d6dfe6;    
    width: 100%;
    &:read-only {
        color: rgba(35,53,57,.3);
    }
    &::placeholder {
         opacity: 0.4;
         font-family: Gilroy;
         font-size: 16px;
         font-weight: 400;
         color: #233539;
    }
`;

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
    `;

const Head3 = styled.h3`
    font-family: Gilroy;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 0.1px;
    text-align: center;
    color: #323c47;
    `;


const Content = styled.div`
    border-radius: 6px;
    border-top-left-radius: 0;
    background-color: #ffffff;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    padding:47px;
    `;

const Tabs = styled.div`
    display: flex;
    margin-top: 35px;
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.4px;
    text-align: center;
    `;

const Tab = styled.div`
    background: ${props => props.active ? 'white' : 'transparent'};
    color: ${props => props.active ? '#3172fd' : 'inherit'};
    padding: 22px 48px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    cursor: pointer;
    & span {
        color: #a5aeb0
    }
`;
