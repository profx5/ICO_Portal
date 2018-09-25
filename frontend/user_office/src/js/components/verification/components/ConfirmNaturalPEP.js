import React from 'react'
import styled from 'styled-components';

import FinalFormRadio from './../../common/FinalFormRadio';


const ConfirmNaturalPEP = ({showModalHandler, iconQuestion}) => {
    return (
        <RadioSet className="RadioSet RadioSet-2">
            <p className="text">Are you a <span onClick={showModalHandler.bind(this, {id: 1})}>politically exposed person</span> (PEP),
                family member of PEP or person known to be close associate of PEP? <IconImg onClick={showModalHandler.bind(this, {id: 1})} src={iconQuestion}/></p>
            <FinalFormRadio name="is_pep" options={['Yes', 'No']} values={["True", "False"]}/>
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
