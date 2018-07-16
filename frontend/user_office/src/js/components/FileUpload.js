import React from 'react'
import styled from 'styled-components';
import { Field } from 'react-final-form';


const File = ({ input: {value: omitValue, ...inputProps }, meta: omitMeta, ...props }) => (
  <input type='file' {...inputProps} {...props} />
);


const FileUpload = ({onClickHandler, uploadPhoto, name}) => {

    function uploadFileHandler (event) {
        var input = event.target;
        var reader = new FileReader();

        if (input.files && input.files[0]) {

            reader.onload = function (e) {
               uploadPhoto({
                    data: e.target.result,
                    name: name
               });

            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    return (

        <Wrapper onClick={onClickHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="38">
              <path d="M10.2417 21.9426c-.2844-.303-.744-.303-1.0284 0s-.2844.7928 0 1.0958l7.2576 7.7338c.1353.1464.32.2278.5135.2278.005 0 .0101-.0031.0152-.0031s.0095.0031.0153.0031c.2422 0 .4458-.134.5782-.3278l7.1936-7.6655c.2844-.303.2844-.7929 0-1.0959-.2843-.303-.744-.303-1.0284 0l-6.0161 6.4108V.775c0-.4286-.3251-.775-.7273-.775-.4022 0-.7273.3464-.7273.775v27.6117l-6.046-6.4441z"/>
              <path d="M21.75 13c-.4148 0-.75.2599-.75.5814s.3352.5814.75.5814h9.75v22.6744h-30V14.1628h9.75c.4147 0 .75-.2599.75-.5814S11.6647 13 11.25 13H0v25h33V13H21.75z"/>
            </svg>
            <DescText>File</DescText>
            <Field onChange={uploadFileHandler} component={File} name={name} hidden/>
        </Wrapper>
    );
}



export default FileUpload;

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