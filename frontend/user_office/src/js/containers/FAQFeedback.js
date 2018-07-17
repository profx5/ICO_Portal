import React from 'react';
import styled from 'styled-components';

import {connect} from 'react-redux'
import Button from "../components/Button";
import iconCheckGreen from './../../img/check-green.svg';
import iconTransitAmber from './../../img/icon_transit-amber.svg';
import iconUser from './../../img/user.svg';
import moment from "moment/moment";
import $ from "jquery";
import * as UIActions from './../actions/UIActions';
import Utils from './../utils/index';

let questions = [
    {
        u_id: 'qe12',
        subject: 'Не приходят токены',
        text: Utils.lorem(),
        created_date: new Date(),
        answers: [{
            date: new Date(),
            who: 'Светочка',
            text: Utils.lorem(),
        },]
    },
    {
        u_id: 'qe13',
        subject: 'Купил токены за день до окончания акции, пришли на следующий день и бонусы',
        text: Utils.lorem(),
        created_date: new Date(),
        answers: [{
            date: new Date(),
            text: Utils.lorem(),
            who: 'Мама Светочки'
        },]
    },
    {
        u_id: 'qe14',
        subject: 'Че за нах? Ау, я тупой и не знаю куда нажать надо, помогите мне, пожалуйста',
        who: 'Светочка',
        created_date: new Date(),
        answered_date: null,
        answers: null
    }
];


class FAQFeedback extends React.Component {

    uploadOnClickHandler = (event) => {
        $(event.currentTarget).find('input[type="file"]').click();
    };

    _renderNewQuestions = () => {
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
        return (
            questions.map((question) => {
                return (
                    <FlexContainer>
                        <FlexItem width={5}>
                            {question.answers !== null &&
                            <IconImg src={iconCheckGreen}/>}
                            {question.answers === null &&
                            <IconImg src={iconTransitAmber}/>}
                        </FlexItem>
                        <FlexItem width={75}>
                            <div>{question.subject}</div>
                            <span>{question.answers !== null && 'Ответ получен.' || 'В ожидании.'}</span>
                        </FlexItem>
                        <FlexItem width={20} padding={'none'}>
                            <FlexContainer>
                                <FlexItem width={20} border={'none'}>
                                    <IconImg src={iconUser}/>
                                </FlexItem>
                                <FlexItem width={80} border={'none'}>
                                    <div>{question.answers && question.answers[0].who || 'Вы'}</div>
                                    <span>{question.answers &&
                                    'Ответ получен ' + moment(question.answers[0].date).format('DD MMMM YYYY') ||
                                    'Написали ' + moment(question.created_date).format('DD MMMM YYYY')}</span>
                                </FlexItem>
                            </FlexContainer>
                        </FlexItem>
                    </FlexContainer>
                )
            })
        )
    };

    _renderQuestionById = (u_id) => {
        let question = questions.filter((item) => item.u_id === u_id);
        return (
            <div>
                <HeadWrapper>
                    Мои вопросы -> <span>{question[0].subject}</span>
                </HeadWrapper>
                <Divider/>
                Hello world!
            </div>
        )
    };

    _renderAnswer = (answer) => {

    };

    _renderQuestions = (current) => {
        if (current === null) {
            return this._renderAllQuestions()
        } else {
            return this._renderQuestionById(current)
        }
    };

    render() {
        const {tab, changeTab, openedTicket} = this.props;
        return (
            <Wrapper>
                <Head>FAQ & Feedback</Head>
                <Tabs>
                    <Tab id={'new'} onClick={changeTab} active={tab === 'new'}>
                        Новый запрос
                    </Tab>
                    <Tab id={'my'} onClick={changeTab} active={tab === 'my'}>
                        Мои запросы <span>{questions.length}</span>
                    </Tab>
                </Tabs>
                <Content>
                    {tab === 'new' &&
                    this._renderNewQuestions()}
                    {tab === 'my' &&
                    this._renderQuestions(openedTicket)}
                </Content>
            </Wrapper>
        )
    }
}


const mapStateToProps = ({UI}) => ({
    tab: UI.get('faqSelectedTab'),
    openedTicket: UI.get('openedTicket'),
});

const mapDispatchToProps = (dispatch) => ({
    changeTab(payload) {
        dispatch(UIActions.changeSelectedTab(payload.target.id))
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
        line-height: 7px
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
