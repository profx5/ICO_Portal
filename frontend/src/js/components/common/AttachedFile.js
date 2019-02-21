import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {media} from 'js/utils/media';


const AttachedFile = ({fileName, fileSize, sizeUnits, id, removable, removeHandler, style}) => {
    return (
        <Wrapper className="attached-file" id={id} style={style}>
            <span className="file-name">{fileName}</span>
            {fileSize && <span className="file-size"> ({fileSize} {sizeUnits})</span>}
            {removable && 
                <div onClick={removeHandler} className="file-close">
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


AttachedFile.propTypes = {
    fileName: PropTypes.string,
    fileSize: PropTypes.number,
    sizeUnits: PropTypes.string,
    id: PropTypes.number,
    removable: PropTypes.bool,
    removeHandler: PropTypes.func.isRequired,
    style: PropTypes.object,
}

export default AttachedFile;

const Wrapper = styled.div`
    width: 285px;
    background: rgb(245, 245, 245);
    padding: 0 35px 0 13px;
    height: 36px;
    margin-bottom: 4px;
    float: left;
    clear: left;
    position: relative;
    display: flex;
    justify-content: flex-start;
    ${media.xs} {
        width: 100%;
        min-width: unset;
    }
    .file-name {
        font-size: 16px;
        color: rgb(92, 141, 245);
        letter-spacing: 0.5px;
        font-weight: 600;
        line-height: 36px;
        display: block;
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        ${media.xs} {
            font-size: 14px;
        }
    }
    .file-size {
        font-size: 16px;
        line-height: 36px;
        width: 83px;
        margin-left: 6px;
        white-space: nowrap;
    }
    .file-close {
        position: absolute;
        right: 13px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
`;
