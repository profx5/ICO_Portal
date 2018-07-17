import React from "react";
import styled from 'styled-components';


const Comment = ({comment}) => {
    console.log(comment);
    return (
        <CommentWrapper>

        </CommentWrapper>
    )
};

export default Comment

const CommentWrapper = styled.div`
    margin-top: 20px;
    border-top: 1px solid rgba(151,151,151,0.2)
`;
