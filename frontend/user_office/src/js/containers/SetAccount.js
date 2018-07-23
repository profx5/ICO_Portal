import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';


import Button from './../components/Button';

import * as UserActions from './../actions/UserActions';
import * as UIActions from './../actions/UIActions';


class SetAccount extends Component {
    
    onSubmitHandler = event => {
        event.preventDefault();
        let data = this.input.value;
        this.props.setAccountRequest(data);
    }

    render() {
        const {hidePopup} = this.props;
        let metamaskEthAccount = window.web3.eth.defaultAccount;
        return(
            <React.Fragment>
                <PopupWrapper>
                    <Popup>
                        <BtnClose onClick={hidePopup}>Close</BtnClose>
                        <StyledHead>Add your ETH account</StyledHead>
                        <form>
                            <TextField type="text" value={metamaskEthAccount} innerRef={input => this.input = input}/>
                            <ButtonWrapper>
                                <Button clickHandler={this.onSubmitHandler} type="submit" text="Send"/>
                            </ButtonWrapper>
                        </form>
                    </Popup>
                </PopupWrapper>
            </React.Fragment>
        )
    }
}


const mapStateToProps = ({user, KYC, UI}) => ({

})

const mapDispatchToProps = (dispatch) => ({
    setAccountRequest(address) {
        dispatch(UserActions.setAccountRequest(address));
    },
    hidePopup() {
        dispatch(UIActions.hideSetAccountPopup())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SetAccount);

const ButtonWrapper = styled.div`
    width: 100%;
    height: 40px;
    border-radius: 2px;
    border: 1px solid #d6dfe6;
    position: relative;
`;


const PopupWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(49,114,253,.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
`;

const Popup = styled.div`
    width: 400px;
    border-radius: 3px;
    background: white;
    position: relative;
    padding: 50px 30px;
`;

const BtnClose = styled.span`
    display: block;
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
`;

const FieldWrapper = styled.div`
    width: 50%;
    margin-left: auto;
`;

const TextField = styled.input`
    display: block;
    width: 100%;
    height: 45px;
    border: 1px solid #d6dfe6;
    margin-bottom: 15px;
    padding: 0 10px;
`;

const StyledHead = styled.span`
    display: block;
    font-size: 18px;
    margin-bottom: 20px;
`;
