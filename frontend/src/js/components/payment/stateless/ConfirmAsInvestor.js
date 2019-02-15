import React from 'react'
import styled from 'styled-components';
import {media} from 'js/utils/media';

import FormikCheckbox from 'js/components/common/FormikCheckbox';


const ConfirmAsInvestor = ({showModalHandler, iconQuestion, errors, touched, values, labelText, setFieldValue, validateField, validateForm}) => {
    return (
        <RadioSet className="RadioSet RadioSet-1">
            <FormikCheckbox name="confirmInvestor" icon={iconQuestion}
                value={values.confirmInvestor}
                className="Verification_requiredField"
                labelText={labelText}
                errors={errors} 
                touched={touched} 
                handler={showModalHandler.bind(this, {
                    modalHead: 'Beneficial owner',
                    modalContent: `Beneficial owner means a natural person who, taking advantage of their influence,
                    makes a transaction, act, action, operation or step or otherwise exercises control
                    over a
                    transaction, act, action, operation or step or over another person and in whose
                    interests or favour or on whose account a transaction or act, action, operation or
                    step is made.`
                })}/>
        </RadioSet>
    )
}

export default ConfirmAsInvestor;


const RadioSet = styled.div`
    margin-bottom: 33px;
    ${media.xs} {
        margin-bottom: 15px;
    }
    .text {
        font-size: 16px;
        color: #0a0a0a;
        letter-spacing: 0.5px;
        line-height: 1.44;
        margin-bottom: 15px;
    }
`;
