import React, {Component} from "react";
import styled from 'styled-components';
import moment from "moment/moment";

import iconUser from './../../../../img/user.svg';


const Comment = ({comment}) => {

    return (
        <CommentWrapper key={comment.id}>
            <FlexContainer>
                <FlexItem width={7}>
                    <IconImg src={iconUser}/>
                </FlexItem>
                <FlexItem width={93}>
                    <div className='who'>{comment.sender}</div>
                    <div className='comment'>{comment.comment}</div>
                    {comment.attachments.length > 0 &&
                    <FilesWrapper>
                        <div>Attached files: {comment.attachments.length}</div>
                        {comment.attachments.map((item, index) => {
                            return (
                                <FileWrapper key={index}>
                                    <div>
                                        <a target='_blank' href={item.file}>{item.filename}</a>
                                    </div>
                                </FileWrapper>
                            )
                        })}
                        <Clearfix/>
                    </FilesWrapper>
                    }
                    <div className='meta'>{moment(comment.date).format('DD MMMM YYYY')}</div>
                </FlexItem>
            </FlexContainer>
        </CommentWrapper>
    )

}


export default Comment;

const FilesWrapper = styled.div`
    margin: 15px 0;
    display: block;
    div {
        margin: 10px 0;
    }
`;

const FileWrapper = styled.div`
    height: 36px;
    font-size: 16px;
    font-weight: bold;
    line-height: 36px;
    letter-spacing: 0.5px;
    color: #5c8df5; 
    display: block;
    & div {
        background-color: #f5f5f5;
        display: inline-block;
        padding: 2px 10px;
    }
`;


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

const Clearfix = styled.div`
    &:before {
        content:"";
        display:table-cell
    }
    &:after {
        content:"";
        display:table;
        clear:both
    }
`;

const FlexItem = styled.div`
    width: ${props => props.width ? +props.width + '%' : 'auto'};
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0.1px;
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
