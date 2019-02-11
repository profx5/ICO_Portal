import React from 'react'

import FormikCheckbox from 'js/components/common/FormikCheckbox';


const ConfirmCorrectness = ({errors, touched, values, labelText}) => {
    return (
        <FormikCheckbox name="confirm"
            value={values.confirm} 
            className="Verification_requiredField"
            labelText={labelText}
            errors={errors} 
            touched={touched}/> 
    )
}

export default ConfirmCorrectness;
