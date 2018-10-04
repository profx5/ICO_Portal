import React from 'react'

import FinalFormCheckbox from './../../common/FinalFormCheckbox';


const ConfirmCorrectness = ({}) => {
    return (
        <FinalFormCheckbox name="confirm"
            options={['I confirm that all the data and documents submitted are correct.']}
            values={['Yes']}
            required/>
    )
}

export default ConfirmCorrectness;
