import React from "react";
import styled from 'styled-components';
import moment from "moment/moment";
import iconUser from './../../img/user.svg';


const Comment = ({comment}) => {
    return (
        <CommentWrapper>
            <FlexContainer>
                <FlexItem width={7}>
                    <IconImg src={iconUser}/>
                </FlexItem>
                <FlexItem width={93}>
                    <div className='who'>{comment.sender}</div>
                    <div className='comment'>{comment.comment}</div>
                    <div className='meta'>{moment(comment.date).format('DD MMMM YYYY')}</div>
                </FlexItem>
            </FlexContainer>
        </CommentWrapper>
    )
};

export default Comment

const IconImg = styled.img`
    width: 48px;
    height: 48px;
`;

const CommentWrapper = styled.div`
    margin-top: 20px;
    border-top: 1px solid rgba(151,151,151,0.2);

`;

const FlexContainer = styled.div`
    display: flex;
    margin: 36px;
`;

const FlexItem = styled.div`
    width: ${props => props.width ? +props.width + '%' : 'auto'};
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0.1px;
    height: 74.5px;
    .meta {
        opacity: 0.4;
        font-family: Gilroy;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 0.5px;
        color: #031949;;
    }
    .comment {
        font-family: Gilroy;
        font-size: 16px;
        line-height: 1.56;
        letter-spacing: 0.1px;
        color: #000000;
        margin: 11px 0;
    }
    .who {
        font-family: Gilroy;
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 0.6px;
        color: #3172fd;
    }
`;
