import React from 'react'
import styled from 'styled-components';


const FieldRadio = ({labelText, options}) => {

    function generateRadio(data) {
        return data.map((item, index) => {
            return (
                <React.Fragment key={index}>
                    <RadioInput type="radio" name={labelText} id={`radio-${item}`} hidden/>
                    <RadioLabel htmlFor={`radio-${item}`}>{item}</RadioLabel>
                </React.Fragment>
            )
        });
    }

    return (
        <Wrapper>
            <StyledLabel>{labelText}</StyledLabel>
            <InputsWrapper>
                {generateRadio(options)}
            </InputsWrapper>
        </Wrapper>
    );
}


export default FieldRadio;

const Wrapper = styled.div`
    position: relative;
    height: 100%;
`;

const InputsWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
`;

const RadioInput = styled.input`
    &:checked + label {
        color: #3476fd;
        border-color: #3476fd;
    }
`;

const RadioLabel = styled.label`
    font-weight: 500;
    flex-basis: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: black;
    text-transform: capitalize;
    border: 1px solid #f3f3f3;
    cursor: pointer;
`;

const StyledLabel = styled.label`
    color: #0a0a0a;
    display: block;
    margin-bottom: 13px;
`;
