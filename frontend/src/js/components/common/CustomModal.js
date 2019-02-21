import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {media} from 'js/utils/media';
import {CSSTransition } from 'react-transition-group';

import iconClose from 'img/icon_close.svg';

import * as UIActions from 'js/actions/UIActions';


class CustomModal extends React.Component {

    showSetAccountPopupAndCloseTip = e => {
        e.preventDefault();
        const {showSetAccountPopup} = this.props;
        showSetAccountPopup();
    };

    render() {
        const {
            modalOpened,
            openedModalId,
            modalHead,
            modalContent,
            hideModal,
            clearModalInfo,
            kycState,
            type
        } = this.props;
        let kycSent = !!type;

        return (
            <CSSTransition
                timeout={300}
                in={(modalOpened && !modalHead && !modalContent)}
                classNames="modal"
                onExited={clearModalInfo}
                unmountOnExit> 
                <ModalWrapper className="Modal">
                    <ModalInner className='Modal_inner'>
                        <ModalHeader>
                            {openedModalId === 1 && 'What is PEP?'}
                            {openedModalId === 2 && 'Verification required'}
                            {openedModalId === 3 && 'ETH Account required'}
                            <img onClick={hideModal} src={iconClose} alt=""/>
                        </ModalHeader>
                        <ModalContent>
                            {openedModalId === 1 &&
                                <React.Fragment>
                                    <p><span>Politically exposed person</span> means a natural person who is or who has 
                                    been entrusted with prominent public functions including a head of state, head of government, 
                                    minister or deputy or assistant minister; a member of parliament or of a similar legislative
                                    body, a member of a governing body of a political party, a member of a supreme court, a
                                    member of a court of auditors or of the board of a central bank; an ambassador, a chargé 
                                    d'affaires or a high-ranking officer in the armed forces; a member of an administrative, 
                                    management or supervisory body of a state-owned enterprise; a director, deputy director or
                                    member of the board or equivalent function of an international organisation, except 
                                    middle-ranking or more junior officials.
                                    </p>
                                    <p><span>Family member of a politically exposed person</span> means the spouse, or a person 
                                    considered to be equivalent to a spouse, of a politically exposed person; a child and their 
                                    spouse, or a person considered to be equivalent to a spouse, of a politically exposed person; 
                                    or a parent of a politically exposed person.
                                    </p>
                                    <p>
                                        <span>Person known to be close associate of a politically exposed person</span> means a natural 
                                        person who is known to be the beneficial owner or to have joint beneficial ownership of a legal
                                        person or a legal arrangement, or any other close business relations, with a politically exposed
                                        person; or a natural person who has sole beneficial ownership of a legal entity or legal 
                                        arrangement which is known to have been set up for the de facto benefit of a politically 
                                        exposed person.
                                    </p>
                                </React.Fragment>
                            }
                            {openedModalId === 2 &&
                                <React.Fragment>
                                    {!kycSent &&
                                        <p>Sorry, but you are not allowed to buy tokens yet. Please <StyledLink className='link' onClick={hideModal} to='/user_office/payment/verification'>pass
                                        KYC</StyledLink> procedure first!</p>
                                    }
                                    {kycSent && (kycState === 'WAITING' || kycState === 'DEPLOYING') &&
                                        <p>Sorry, but you are not allowed to buy tokens yet. Please wait while we validate info you
                                        provided.</p>
                                    }
                                    {kycSent && kycState === 'DECLINED' &&
                                        <p>Sorry, but you are not allowed to buy tokens yet. Your KYC was declined. Please <StyledLink className='link'
                                        onClick={hideModal} to='/user_office/support/'>contact our support</StyledLink>.</p>
                                    }
                                </React.Fragment>
                            }
                            {openedModalId === 3 &&
                                <React.Fragment>
                                    <p>Sorry, but you are not allowed to buy tokens yet. Please <span className='link' onClick={this.showSetAccountPopupAndCloseTip}>add
                                    your ETH account</span> to get tokens.</p>
                                </React.Fragment>
                            }
                        </ModalContent>
                    </ModalInner>
                </ModalWrapper>
            </CSSTransition>
        )
    }
}


CustomModal.propTypes = {
    modalOpened: PropTypes.bool.isRequired,
    openedModalId: PropTypes.number,
    modalHead: PropTypes.string,
    modalContent: PropTypes.string,
    hideModal: PropTypes.func.isRequired,
    clearModalInfo: PropTypes.func,
    kycState: PropTypes.string,
    type: PropTypes.string
}

const mapStateToProps = ({UI, KYC}) => ({
    modalOpened: UI.get('modalOpened'),
    openedModalId: UI.get('openedModalId'),
    modalHead: UI.get('modalHead'),
    modalContent: UI.get('modalContent'),
    kycState: KYC.get('state'),
    type: KYC.get('type'),
});

const mapDispatchToProps = (dispatch) => ({
    hideModal() {
        dispatch(UIActions.hideModal())
    },
    clearModalInfo() {
        dispatch(UIActions.clearModalInfo())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomModal);

const ModalWrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(1, 7, 29, 0.3);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s ease;
    &.modal-enter, &.modal-exit-active {
        opacity: 0;
    }
    &.modal-enter-active {
        opacity: 1;
    }
    &.modal-enter .Modal_inner, &.modal-exit-active .Modal_inner {
        opacity: 0;
        transform: translate3d(0, 50px, 0);
    }
    .modal-enter-active .Modal_inner {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
`;

const ModalInner = styled.div`
    position: relative;
    width: 60%;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 9px 21px 0 rgba(173, 182, 217, 0.3);
    z-index: 100;
    max-height: 64vh;
    overflow-y: auto;
    font-weight: normal;
    transition: all .35s ease;
    ${media.xs} {
        width: calc(100vw - 32px);
        max-height: calc(100% - 96px);
    }
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
    background-color: #f5f6fa;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    ${media.xs} {
        font-size: 20px;
        line-height: 20px;
        padding: 15px 40px;
        position: sticky;
        top: 0;
        z-index: 1;
        height: auto;
        min-height: 49px;
    }
    & img {
        position: absolute;
        top: 26px;
        right: 26px;
        cursor: pointer;
        ${media.xs} {
            right: 19px;
            top: 19px;
        }
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
    ${media.xs} {
        font-size: 14px;
        line-height: 1.64;
        padding: 15px 25px 24px;
    }
    & span {
        font-weight: bold;
    }
    & p {
        margin-bottom: 10px;
    }
`;

const StyledLink = styled(Link)`
    color: #3375fc;
`;
