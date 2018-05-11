import React from 'react';

import styled from 'styled-components';


const ContentWrapper = (props) => {
    return (
        <Wrapper>
            {props.left}
            {props.rest}
        </Wrapper>
    )
};


export default ContentWrapper;

const Wrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;
    min-height: 100%;
`;