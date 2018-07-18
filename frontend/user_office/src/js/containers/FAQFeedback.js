import React from 'react';
import styled from 'styled-components';

import {connect} from 'react-redux'
import Button from "../components/Button";
import Comment from '../components/Comment';
import iconCheckGreen from './../../img/check-green.svg';
import iconTransitAmber from './../../img/icon_transit-amber.svg';
import iconUser from './../../img/user.svg';
import moment from "moment/moment";
import * as UIActions from './../actions/UIActions';
import * as TicketActions from './../actions/TicketActions';
import {Link} from 'react-router-dom';

const STATUSES = {
    1: 'Open',
    2: 'Reopen',
    3: 'Resolved',
    4: 'Closed',
    5: 'Duplicate',
};

class FAQFeedback extends React.Component {

    setOpenedTicketNull = () => {
        const {setTicketFullNull} = this.props;
        setTicketFullNull();
    };

    _backToAll = () => {
        this.setOpenedTicketNull();
        this.props.history.push('/user_office/faq/');
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
        return (
            <div>
                <Head3>Здесь Вы можете задать любой вопрос о нашем сервисе</Head3>
                <WrapperInput>
                    <StyledLabel htmlFor={'subject'}>Тема</StyledLabel>
                    <StyledInput
                        type="text"
                        placeholder={'Пожалуйста, опишите Вашу проблему...'}
                        name={'subject'}/>
                </WrapperInput>
                <br/>
                <WrapperInput>
                    <StyledLabel htmlFor={'desc'}>Описание</StyledLabel>
                    <StyledTextarea
                        placeholder={'Пожалуйста, расскажите о Вашей проблеме чуть подробнее...'}
                        name={'desc'}/>
                </WrapperInput>
                <br/>
                {/*<FileUpload onClickHandler={this.uploadOnClickHandler} name={'file'}/>*/}
                <ButtonWrapper>
                    <Button text='Отправить'/>
                </ButtonWrapper>
                <br/>
            </div>
        )
    };

    _renderAllQuestions = () => {
        const {tickets} = this.props;
        return (
            tickets.map((ticket) => {
                return (
                    <FlexContainer key={ticket.id}>
                        <FlexItem width={5}>
                            {(ticket.status === '1' || ticket.status === '2') &&
                            <IconImg src={iconCheckGreen}/>}
                            {(ticket.status !== '1' && ticket.status !== '2') &&
                            <IconImg src={iconTransitAmber}/>}
                        </FlexItem>
                        <FlexItem width={75}>
                            <div className='title'><Link
                                to={'/user_office/faq/ticket/' + ticket.id}>{ticket.title}</Link></div>
                            <span>{(ticket.status === '1' || ticket.status === '2') && 'Ответ получен.' || 'В ожидании.'}</span>
                        </FlexItem>
                        <FlexItem width={20} padding={'none'}>
                            <FlexContainer>
                                <FlexItem width={20} border={'none'}>
                                    <IconImg src={iconUser}/>
                                </FlexItem>
                                <FlexItem width={80} border={'none'}>
                                    <div>{ticket.public_follow_ups && ticket.public_follow_ups[0].user_email || 'You'}</div>
                                    <span>{ticket.public_follow_ups &&
                                    'Ответ получен ' + moment(ticket.public_follow_ups[0].date).format('DD MMMM YYYY') ||
                                    'Написали ' + moment(ticket.created).format('DD MMMM YYYY')}</span>
                                </FlexItem>
                            </FlexContainer>
                        </FlexItem>
                    </FlexContainer>
                )
            })
        )
    };


    _renderOpenedTicket = () => {
        const {ticketFull} = this.props;
        let content = [];
        content.push(ticketFull.public_follow_ups.map((item, index) => {
            return (
                <Comment comment={item} key={index}/>
            )
        }));
        return (
            <div>
                <HeadWrapper>

                    <span onClick={this._backToAll} className='link'>Мои вопросы</span> -> {ticketFull.title}
                    <span className='status'>
                        <div>
                            {(ticketFull.status === '1' || ticketFull.status === '2') &&
                            <IconImg src={iconCheckGreen}/>}
                            {(ticketFull.status !== '1' && ticketFull.status !== '2') &&
                            <IconImg src={iconTransitAmber}/>}
                            <div>{(ticketFull.status === '1' || ticketFull.status === '2')
                            && 'Ответ получен.'
                            || 'Вопрос открыт.'}</div>
                        </div>
                    </span>
                </HeadWrapper>
                <Divider/>
                {content}
            </div>
        )
    };


    handleChangeTab = (e) => {
        const {changeTab, setTicketFullNull} = this.props;
        setTicketFullNull();
        changeTab(e.target.id);
        this.props.history.push('/user_office/faq/');
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
                <Head>FAQ & Feedback</Head>
                <Tabs>
                    <Tab id={'new'} onClick={this.handleChangeTab} active={tab === 'new'}>
                        New ticket
                    </Tab>

                    <Tab id={'my'} onClick={this.handleChangeTab} active={tab === 'my'}>
                        My tickets <span>{tickets.length}</span>
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


const mapStateToProps = ({UI, tickets}) => ({
    tab: UI.get('faqSelectedTab'),
    tickets: tickets.get('results'),
    ticketFull: tickets.get('ticketFull')
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
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(FAQFeedback)

const HeadWrapper = styled.div`
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.4px;
    color: #000000;
    & span {
        color: #3172fd;
        cursor: pointer;
    }
`;

const FlexContainer = styled.div`
    display: flex;
`;

const IconImg = styled.img`
    width: 36px;
    height: 36px;
`;

const Divider = styled.hr`
    width: 100%;
    color: #979797;
    opacity: 0.2;
     margin: 25px 0;
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
    height: 74.5px;
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
