import React from 'react'
import styled from 'styled-components';

const InvestForm = ({
    price,
    tokensAmount,
    contract,
    amountChange,
    handleInvest,
    showSubmit,
    hideForm,
    reason
}) => {
    const _amountChange = (event) => {
        if (event.target.value) {
            amountChange(event.target.value)
        }
    }

    return (
        <ModalWrapper id="InvestForm" tabIndex="-1" style={{display: 'block'}}>
            <Modal role="document">
                <div>
                    <div>
                        <Head>Invest form</Head>
                        <ButtonClose type="button" onClick={hideForm}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512.001" width="15" height="15">
                              <path d="M284.284 256L506.142 34.142c7.81-7.81 7.81-20.474 0-28.284-7.81-7.81-20.474-7.81-28.284 0L256 227.716 34.142 5.858c-7.81-7.81-20.474-7.81-28.284 0-7.81 7.81-7.81 20.474 0 28.284L227.716 256 5.858 477.858c-7.81 7.81-7.81 20.474 0 28.284 7.81 7.81 20.473 7.81 28.284 0L256 284.284l221.858 221.858c7.81 7.81 20.473 7.81 28.284 0 7.81-7.81 7.81-20.474 0-28.284L284.284 256z"/>
                            </svg>
                        </ButtonClose>
                    </div>
                    <div>
                        <FormRow>
                            <InputWrapper data-name="Amount (ETH)">
                                <Input type="text" className="form-control" id="amount" autoComplete="off" onChange={_amountChange}/>
                            </InputWrapper>
                            <InputWrapper data-name="Current ETH price">
                                <Input type="text" className="form-control" id="price" value={price} readOnly/>
                            </InputWrapper>
                        </FormRow>
                        <FormRow>
                            <InputWrapper fullwidth data-name="Tokens">
                                <Input type="text" className="form-control" id="tokens" value={tokensAmount} readOnly />
                            </InputWrapper>
                        </FormRow>
                        <FormRow>
                            <InputWrapper fullwidth data-name="Crowdsale contract">
                                <Input type="text" className="form-control" id="contract" value={contract} readOnly />
                            </InputWrapper>
                        </FormRow>
                    </div>
                    {showSubmit && <div className="modal-footer">
                        <button type="submit" className="btn btn-primary" onClick={handleInvest}>Invest</button>
                    </div>}
                    {!showSubmit && <small id="emailHelp" className="form-text text-muted">{reason}</small>}
                </div>
            </Modal>
        </ModalWrapper>
    )
}

export default InvestForm

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(50,116,255,.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
`;

const Modal = styled.div`
    width: 600px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px 20px;
`;

const FormRow = styled.div`
    display: flex;
    justify-content: space-between;
`;

const InputWrapper = styled.div`
    position: relative;
    width: ${props => props.fullwidth ? '100%' : '48%'};
    margin-bottom: 40px;
    &:before {
        content: attr(data-name);
        position: absolute;
        left: 0;
        top: -25px;
    }
`;

const Head = styled.h3`
    font-size: 16px;
    text-transform: uppercase;
    margin-bottom: 40px;
`;

const Input = styled.input`
    width: 100%;
    height: 40px;
    background: white;
    padding: 0 15px;
    border: 1px solid rgba(0,0,0,.08);
    border-radius: 3px;
`;

const ButtonClose = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    cursor: pointer;
`;