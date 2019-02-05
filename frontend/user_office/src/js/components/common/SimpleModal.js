import React from 'react'
import {connect} from 'react-redux';
import styled from 'styled-components';
import {media} from 'js/utils/media';
import {CSSTransition } from 'react-transition-group';

import iconClose from 'img/icon_close.svg';

import * as UIActions from 'js/actions/UIActions';


class SimpleModal extends React.Component {

    render() {
        const {modalOpened, modalHead, modalContent, hideModal, clearModalInfo} = this.props;

        return(
            <CSSTransition
                timeout={300}
                in={(modalOpened && !!modalHead && !!modalContent)}
                classNames="modal"
                onExited={clearModalInfo}
                unmountOnExit> 
                <ModalWrapper className="Modal">
                    <ModalInner className='Modal_inner'>
                        <ModalHeader>
                            {modalHead}
                            <img onClick={hideModal} src={iconClose} alt=""/>
                        </ModalHeader>
                        <ModalContent>
                            {modalContent}
                        </ModalContent>
                    </ModalInner>
                </ModalWrapper>
            </CSSTransition>
        )
    }
}


const mapStateToProps = ({UI}) => ({
    modalOpened: UI.get('modalOpened'),
    modalHead: UI.get('modalHead'),
    modalContent: UI.get('modalContent'),
});

const mapDispatchToProps = (dispatch) => ({
    hideModal() {
        dispatch(UIActions.hideModal())
    },
    clearModalInfo() {
        dispatch(UIActions.clearModalInfo())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SimpleModal);

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
