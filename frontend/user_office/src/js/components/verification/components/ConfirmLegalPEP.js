import React from 'react'
import styled from 'styled-components';

import FinalFormRadio from './../../common/FinalFormRadio';


const ConfirmLegalPEP = ({}) => {
    return (
        <RadioSet>
            <p className="text">
                Is the representative or any beneficial owner a politically exposed person (PEP), 
                family member of PEP or person known to be close associate of PEP
            </p>
            <FinalFormRadio name="is_pep" options={['Yes', 'No']} values={["True", "False"]}/>
        </RadioSet>
    )
}

export default ConfirmLegalPEP;


const RadioSet = styled.div`
    .text {
        font-size: 16px;
        color: #0a0a0a;
        letter-spacing: 0.5px;
        line-height: 1.44;
        margin-bottom: 15px;
    }
`;
