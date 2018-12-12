import React from 'react'
import styled from 'styled-components';
import {media} from 'js/services/media';

import FormikRadio from 'js/components/common/FormikRadio';


const ConfirmLegalPEP = ({errors, touched, is_pep}) => {
    return (
        <RadioSet>
            <p className="text">
                Is the representative or any beneficial owner a politically exposed person (PEP), 
                family member of PEP or person known to be close associate of PEP
            </p>
            <FormikRadio name="is_pep" 
                values={["True", "False"]}
                errors={errors} 
                touched={touched}
                is_pep={is_pep}
                options={['Yes', 'No']}/>
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
        ${media.xs} {
            font-size: 12px;
        }
    }
`;
