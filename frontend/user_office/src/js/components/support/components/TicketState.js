import React from 'react';
import styled from 'styled-components';
import {media} from './../../../utils/media';


const TicktetState = ({}) => {

    return (
        <Wrapper>
            Ticket was successfully closed. <br className="hidden-xs"/>If you have another issue to submit - please create another ticket! Thank you!
        </Wrapper>
    )
}


export default TicktetState;

const Wrapper = styled.div`
    font-size: 16px;
    font-weight: 500;
    line-height: 1.56;
    background: rgb(246, 246, 246);
    padding: 9px 18px 10px;
    border: 2px solid rgba(0, 0, 0, 0.03);
    ${media.xs} {
        font-size: 14px;
        line-height: 1.21;
        padding: 15px 12px;
    }
`;
