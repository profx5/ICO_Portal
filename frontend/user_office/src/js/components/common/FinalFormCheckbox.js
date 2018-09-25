import React from 'react'
import styled from 'styled-components';
import {Field} from 'react-final-form';

import iconCheck from './../../../img/icons/icon_check.svg';


const FinalFormCheckbox = ({labelText, name, values, options, icon, handler, required}) => {

    function handle(handler, event) {
        event.preventDefault();
        handler(1);
    }

    function generateRadio(data) {
        return data.map((item, index) => {
            return (
                <React.Fragment key={index}>
                    <RadioInput component="input" type="checkbox" required={required} name={name} defaultChecked={values[index]} id={`radio-${item}`}/>
                    <RadioLabel htmlFor={`radio-${item}`}>
                        {item}
                        {icon &&
                            <IconImg onClick={handle.bind(this, handler)} src={icon}/>
                        }
                    </RadioLabel>
                </React.Fragment>
            )
        });
    }

    return (
        <Wrapper>
            <InputsWrapper>
                {generateRadio(options)}
            </InputsWrapper>
        </Wrapper>
    );
}


export default FinalFormCheckbox;

const Wrapper = styled.div`
    position: relative;
    height: 100%;
`;

const InputsWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
`;

const RadioInput = styled(Field)`
    opacity: 0;
    pointer-events: none;
    position: absolute;
    margin-left: 3px;
    margin-top: 3px;
    &:checked + label:before {
        background: url(${iconCheck}) no-repeat center;
    }
`;

const RadioLabel = styled.label`
    font-size: 16px;
    letter-spacing: 0.5px;
    color: #0a0a0a;
    margin-right: 20px;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    &:before {
        content: '';
        width: 20px;
        height: 20px;
        border: 1px solid #d6dfe6;
        margin-right: 8px;
    }
`;

const IconImg = styled.img`
    width: 16px;
    height: 16px;
    margin-left: 5px;
`;
