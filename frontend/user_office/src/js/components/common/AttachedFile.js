import React from 'react'
import styled from 'styled-components';
import {media} from './../../utils/media';

import Utils from './../../utils/index';


const AttachedFile = ({fileName, fileSize, id, removable, onRemoveHandler, style}) => {
    return (
        <Wrapper className="attached-file" id={id} style={style}>
            <span className="file-name">{fileName}</span>
            {fileSize && <span className="file-size"> ({Utils.formatFileSize(fileSize).size} {Utils.formatFileSize(fileSize).units})</span>}
            {removable && 
                <div onClick={onRemoveHandler} className="file-close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                        <g fill="#C8C8C8" fillRule="evenodd">
                            <path d="M.05 1.464L1.464.05 9.95 8.536 8.536 9.95z"/>
                            <path d="M1.464 9.95L.05 8.536 8.536.05 9.95 1.464z"/>
                        </g>
                    </svg>
                </div>
            }
        </Wrapper>
    )
}


export default AttachedFile;

const Wrapper = styled.div`
    min-width: 240px;
    background: rgb(245, 245, 245);
    padding: 0 35px 0 13px;
    height: 36px;
    margin-bottom: 4px;
    float: left;
    clear: left;
    position: relative;
    ${media.xs} {
        width: 100%;
    }
    .file-name {
        font-size: 16px;
        color: rgb(92, 141, 245);
        letter-spacing: 0.5px;
        font-weight: 600;
        line-height: 36px;
        ${media.xs} {
            font-size: 14px;
        }
    }
    .file-size {
        font-size: 16px;
        line-height: 36px;
    }
    .file-close {
        position: absolute;
        right: 13px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
`;
