import React from 'react'
import styled from 'styled-components';

const FieldTextSpan = ({labelText, value, children, id}) => {

    return (
        <Wrapper>
            <StyledDesc>{labelText}</StyledDesc> 
            <StyledField>
                <span id={id}>{value}</span>
                {children}
            </StyledField>
        </Wrapper>
    );
}



export default FieldTextSpan;

const Wrapper = styled.div`
    position: relative;
    height: 100%;
`;

const StyledDesc = styled.span`
    color: #0a0a0a;
    display: block;
    margin-bottom: 13px;
`;

const StyledField = styled.span`
    font-weight: 600;
    padding: 0 20px;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    background: #ffffff;
    border: 1px solid #EAEFF2;
    position: relative;
    span {
        color: ${props => props.disabled ? '#233539' : 'rgba(35,53,57,.3)'};
    }
`;