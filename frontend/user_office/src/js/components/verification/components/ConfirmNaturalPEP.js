import React from 'react'
import styled from 'styled-components';
import {media} from './../../../utils/media';

import FormikRadio from './../../common/FormikRadio';


const ConfirmNaturalPEP = ({showModalHandler, iconQuestion, errors, touched, is_pep}) => {
    return (
        <RadioSet className="RadioSet RadioSet-2">
            <p className="text">Are you a <span onClick={showModalHandler.bind(this, {id: 1})}>politically exposed person</span> (PEP),
                family member of PEP or person known to be close associate of PEP? <IconImg onClick={showModalHandler.bind(this, {id: 1})} src={iconQuestion}/></p>
            <FormikRadio name="is_pep" 
                values={["True", "False"]}
                errors={errors} 
                touched={touched}
                is_pep={is_pep}
                options={['Yes', 'No']}/>
        </RadioSet>
    )
}

export default ConfirmNaturalPEP;


const RadioSet = styled.div`
    .text {
        font-size: 16px;
        color: #0a0a0a;
        letter-spacing: 0.5px;
        line-height: 1.44;
        margin-bottom: 15px;
        ${media.xs} {
            font-size: 12px;
        }
        span {
            text-decoration: underline;
            cursor: pointer;
        }
    }
`;

const IconImg = styled.img`
    width: 16px;
    height: 16px;
    margin-left: 4px;
    position: relative;
    top: 3px;
    cursor: pointer;
`;
