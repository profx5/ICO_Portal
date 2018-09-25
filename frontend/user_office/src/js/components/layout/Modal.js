import React from 'react'
import {connect} from 'react-redux';
import styled from 'styled-components';

import iconClose from './../../../img/icon_close.svg';

import * as UIActions from './../../actions/UIActions';


class Modal extends React.Component {

    render() {
        const {modalOpened, modalHead, modalContent, hideModal} = this.props;

        return(
            <React.Fragment>
                {modalOpened && 
                    <ModalWrapper className="ModalWrapper">
                        <ModalInner>
                            <ModalHeader>
                                {this.props.head || modalHead}
                                <img onClick={hideModal} src={iconClose} alt=""/>
                            </ModalHeader>
                            <ModalContent>
                                {this.props.content || modalContent}
                            </ModalContent>
                        </ModalInner>
                    </ModalWrapper>
                }
            </React.Fragment>
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

const ModalWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    background: rgba(1, 7, 29, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
`;

const ModalInner = styled.div`
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
    background-color: #f5f6fa;
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
