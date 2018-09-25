import React from 'react'
import styled from 'styled-components';


const AttachButton = ({text, className, onClickHandler, disabled}) => {

    return (
        <Btn className={className} onClick={onClickHandler} disabled={disabled && true || false}>
            {text}
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="26">
                <path fill="#3274FD" fill-rule="nonzero" d="M10.9962 2.4044C9.8076 1.2291 8.2307.5846 6.5575.5925c-.7895.0048-1.5565.1508-2.2804.4352a6.211 6.211 0 0 0-1.9555 1.2377c-.062.0578-.124.119-.1842.1785C.9626 3.6319.3207 5.2069.3294 6.8836L.364 17.2407c.0022.3323.2702.602.6024.6034l.671.003a.6055.6055 0 0 0 .6084-.607l-.0345-10.364c-.0068-1.185.5132-2.3551 1.4262-3.2065.821-.7657 1.8631-1.1913 2.9317-1.1949 1.1697-.005 2.2722.443 3.1049 1.2685.831.8237 1.2931 1.9152 1.299 3.0781l-.028 13.997c.0029.7055-.3055 1.4001-.8487 1.9067-.4884.4554-1.1084.7093-1.7455.7109-.6952.0029-1.3486-.265-1.847-.7533-.495-.4883-.7705-1.1384-.774-1.8269 0 0 .0286-13.0243.031-13.0431.0184-1.1226 1.7143-1.0955 1.696.0271-.032 1.9064-.0136 6.9103-.0011 9.3645.0021.3323.2702.602.6023.6033l.671.0031a.6055.6055 0 0 0 .6084-.607l-.0275-9.4271C9.3019 6.2814 8.0786 5.0688 6.58 5.076a2.7106 2.7106 0 0 0-1.8368.7299 2.6882 2.6882 0 0 0-.6318.887 2.6147 2.6147 0 0 0-.228 1.0964L3.85 20.8547c.0135 2.473 2.0382 4.474 4.5128 4.4634 1.0875-.0046 2.1506-.4432 2.9964-1.232.9396-.8761 1.474-2.0662 1.4676-3.265l.028-13.997c-.0104-1.6715-.67-3.241-1.8586-4.4197z"/>
            </svg>
        </Btn>
    )
}


export default AttachButton;

const Btn = styled.button`
    border: solid 1px rgb(49, 114, 253);
    height: 100%;
    display: block;
    background: 'transparent';
    height: 100%;
    width: 100%;
    border-radius: 2px;
    color: rgb(52, 118, 252);
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    position: relative;
    z-index: 1;
    cursor: pointer;
    svg {
        position: absolute;
        top: 50%;
        right: 16px;
        transform: translateY(-50%);
    }
`;
