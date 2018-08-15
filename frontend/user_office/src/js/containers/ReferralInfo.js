import React from 'react';
import styled from 'styled-components';

import {connect} from 'react-redux';
// FIXME replace this with react-clipboard
import ClipboardJS from 'clipboard';

import Utils from '../utils';
import copyIcon from './../../img/icon_copy.svg';
import iconClose from "../../img/icon_close.svg";
import * as UIActions from "../actions/UIActions";
import iconQuestion from "../../img/icons/icon_faq.svg";
import Button from '../components/Button';
import {
    FacebookIcon, FacebookShareButton,
    LinkedinIcon, LinkedinShareButton,
    TwitterIcon, TwitterShareButton,
    TelegramIcon, TelegramShareButton,
    WhatsappIcon, WhatsappShareButton,
    RedditIcon, RedditShareButton,
} from 'react-share';


class ReferralList extends React.Component {

    closeTip = () => {this.props.setOpenedTip(null)};

    componentDidMount() {
        new ClipboardJS('#referral-link');
    }

    render() {
        const {openedTip} = this.props;
        const shareIconSize = 32;
        const shareIconBgStyle = {fill: 'white'};
        const shareLogoFillColor = "#3172fd";
        const referralLink = 'https://your.own/link';
        const referralTitle = 'Vera';
        const referralText = 'Check this out';
        return (
            <Wrapper>
                {/*FIXME use common way of opening modals and replace numbers with identifiers*/}
                {openedTip &&
                    <ModalWrapper className="ModalWrapper">
                        {openedTip === 11 &&
                          <Modal>
                              <ModalHeader>
                                  Pending bonuses info
                                  <img onClick={this.closeTip} src={iconClose} alt=""/>
                              </ModalHeader>
                              <ModalContent>
                                  {Utils.lorem()}
                              </ModalContent>
                          </Modal>
                          }
                    </ModalWrapper>}
                <Title>Referral info</Title>
                <Field>
                    <FieldTitle># of referrals</FieldTitle>
                    <Value>3</Value>
                </Field>
                <Field>
                    <FieldTitle>Aquired referral bonus</FieldTitle>
                    <Value>250.4</Value>
                </Field>
                <Field>
                    <FieldTitle>Pending referral bonus <IconImg onClick={() => this.props.setOpenedTip(11)} src={iconQuestion}/></FieldTitle>
                    <Value>174.6</Value>
                    <ButtonWrapper>
                        <Button text="Collect"/>
                    </ButtonWrapper>
                </Field>
                <Field>
                      <FieldTitle>Your link</FieldTitle>
                      <Value>
                          {referralLink}
                          <IconCopy id="referral-link" data-clipboard-text={referralText + ':' + referralLink}/>
                      </Value>
                </Field>
                <Field>
                    <FieldTitle>Share it</FieldTitle>
                    <SocialButtons>
                        <FacebookShareButton url={referralLink} quote={referralText}>
                            <FacebookIcon size={shareIconSize} iconBgStyle={shareIconBgStyle} logoFillColor={shareLogoFillColor}/>
                        </FacebookShareButton>
                        <LinkedinShareButton url={referralLink} title={referralTitle} description={referralText}>
                            <LinkedinIcon size={shareIconSize} iconBgStyle={shareIconBgStyle} logoFillColor={shareLogoFillColor}/>
                        </LinkedinShareButton>
                        <TwitterShareButton url={referralLink} title={referralTitle}>
                            <TwitterIcon size={shareIconSize} iconBgStyle={shareIconBgStyle} logoFillColor={shareLogoFillColor}/>
                        </TwitterShareButton>
                        <TelegramShareButton url={referralLink} title={referralTitle}>
                            <TelegramIcon size={shareIconSize} iconBgStyle={shareIconBgStyle} logoFillColor={shareLogoFillColor}/>
                        </TelegramShareButton>
                        <WhatsappShareButton url={referralLink} title={referralTitle}>
                            <WhatsappIcon size={shareIconSize} iconBgStyle={shareIconBgStyle} logoFillColor={shareLogoFillColor}/>
                        </WhatsappShareButton>
                        <RedditShareButton url={referralLink} title={referralTitle}>
                            <RedditIcon size={shareIconSize} iconBgStyle={shareIconBgStyle} logoFillColor={shareLogoFillColor}/>
                        </RedditShareButton>
                    </SocialButtons>
                </Field>

            </Wrapper>
        )
    }
}

const mapStateToProps = ({UI}) => ({
    openedTip: UI.get('openedTip'),
});

const mapDispatchToProps = dispatch => ({
    setOpenedTip(id) {
        dispatch(UIActions.setOpenedTip(id))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReferralList);


// FIXME that's A LOT of copypasting
const Wrapper = styled.div`
    padding: 42px 30px 42px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    margin: 0 30px 30px 0;
    width: 300px;
`;

const ButtonWrapper = styled.div`
    width: 70px;
    height: 30px;
    margin-top: 5px;
`;

const Title = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #323c47;
    letter-spacing: 0.1px;
    margin-bottom: 45px;
`;

const Field = styled.div`
    margin: 0 0 30px;
    :last-child {
      margin: 0;
    }
`;
const FieldTitle = styled.h4`
    font-weight: bold;
    color: #0a0a0a;
    letter-spacing: 0.5px;
    margin-bottom: 13px;
`;
const Value = styled.div`
    position: relative;
`;
const SocialButtons = styled.div`
    display: flex;
    justify-content: space-between;

    > div {
        cursor: pointer;
        outline: none;
    }
`;

const IconCopy = styled.span`
    display: block;
    position: absolute;
    top: 50%;
    right: 17px;
    transform: translateY(-50%);
    cursor: pointer;
    width: 16px;
    height: 20px;
    background: url(${copyIcon}) no-repeat center;
    background-size: contain;
`;

const ModalWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    background: rgba(1, 7, 29, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    
`;

const Modal = styled.div`
    position: absolute;
    top: 10%;
    left: 20%;
    width: 60%;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 9px 21px 0 rgba(173, 182, 217, 0.3);
    z-index: 100;
    max-height: 64vh;
    overflow: hidden;
    font-weight: normal;
`;

const ModalHeader = styled.div`
    padding: 18px;
    text-align: center;
    line-height: 1.45;
    height: 72px;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-align: center;
    color: #000000;
    background-color: #f5f6fa
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    & img {
        position: absolute;
        top: 26px;
        right: 26px;
        cursor: pointer;
    }
`;

const ModalContent = styled.div`
    padding: 32px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    text-align: justify;
    font-size: 16px;
    line-height: 1.44;
    letter-spacing: 0.2px;
    color: #0a0a0a;
    overflow-y: auto;
    max-height: 52.5vh;
    & span {
        font-weight: bold;
    }
    & p {
        margin-bottom: 10px;
    }
`;
const IconImg = styled.img`
    width: 16px;
    height: 16px;
    margin-left: 4px;
    position: relative;
    top: 3px;
    cursor: pointer;
`;
