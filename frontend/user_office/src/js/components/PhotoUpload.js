import React from 'react'
import styled from 'styled-components';
import {Field} from 'redux-form';

const File = ({ input: {value: omitValue, ...inputProps }, meta: omitMeta, ...props }) => (
  <input type='file' {...inputProps} {...props} />
);

const PhotoUpload = ({name}) => {
    return (
        <Wrapper>
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="30">
              <path d="M33.6078 30H4.3915C1.9697 30 0 28.0319 0 25.612V7.816c0-2.42 1.9697-4.3881 4.3915-4.3881h5.9616l.5218-1.759C11.088.7064 11.9685 0 13.0041 0H24.996c1.0064 0 1.897.7028 2.1328 1.6777l.014.06.4756 1.69h5.99C36.0305 3.4278 38 5.396 38 7.8159v17.7959C37.9993 28.0319 36.029 30 33.6078 30zM4.3915 4.8906c-1.6146 0-2.9276 1.312-2.9276 2.9254v17.7958c0 1.6134 1.313 2.9254 2.9276 2.9254h29.2163c1.6146 0 2.9276-1.3121 2.9276-2.9254V7.816c0-1.6134-1.313-2.9254-2.9276-2.9254h-7.0982l-.8014-2.856c-.0739-.332-.3733-.5726-.713-.5726H13.0035c-.3448 0-.6376.2355-.713.5735l-.846 2.8551h-7.053zm14.6093 20.6883c-5.1227 0-9.2903-4.1635-9.2903-9.2815 0-5.1187 4.1675-9.2822 9.2903-9.2822 5.1213 0 9.2882 4.1642 9.2882 9.2822-.0001 5.1173-4.167 9.2815-9.2882 9.2815zm0-17.1018c-4.3155 0-7.8265 3.5075-7.8265 7.8196 0 4.312 3.5111 7.8188 7.8265 7.8188 4.3147 0 7.8243-3.5075 7.8243-7.8188-.0001-4.312-3.5104-7.8196-7.8243-7.8196zm13.662-.8718c-.7465 0-1.3504.6048-1.3504 1.3494 0 .7453.6038 1.3493 1.3505 1.3493.7458 0 1.3496-.6042 1.3496-1.3493-.0007-.7446-.6046-1.3494-1.3496-1.3494z"/>
            </svg>
            <DescText>Photo</DescText>
            <Field component={File} name={name} hidden/>
        </Wrapper>
    );
}



export default PhotoUpload;

const Wrapper = styled.div`
    border: 1px solid #BABABA;
    width: 125px;
    height: 120px;
    display: inline-flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    &:before, &:after {
        content: '';
        position: absolute;
        background: white;
        z-index: 0;
    }
    &:before {
        left: -2px;
        top: 50%;
        transform: translateY(-50%);
        width: calc(100% + 4px);
        height: 75px;
    }
    &:after {
        top: -2px;
        left: 50%;
        transform: translateX(-50%);
        width: 75px;
        height: calc(100% + 4px);
    }
    &:hover {
        border-color: #3679fc;
        div {
            color: #3679fc;
        }
        svg {
            fill: #3679fc;
        }
    }
    svg {
        position: relative;
        bottom: 10px;
        z-index: 1;
    }
`;

const DescText = styled.div`
    color: #000000;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, calc(-50% + 30px));
    z-index: 1;
`;