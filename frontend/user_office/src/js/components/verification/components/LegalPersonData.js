import React from 'react'
import styled from 'styled-components';
import {media} from './../../../utils/media';

import FormikField from './../../common/FormikField';


const LegalPersonData = ({errors, touched, values}) => {
    return (
        <InputSet>
            <input type="hidden" name='type' value='LEGAL'/>
            <InputWrapper>
                <FormikField 
                    value={values.business_name || ''}
                    name="business_name"
                    placeholder="Apple" 
                    labelText="Business name" 
                    errors={errors} 
                    touched={touched}
                    required/>
            </InputWrapper>
            <InputWrapper>
                <FormikField 
                    value={values.registration_number || ''} 
                    name="registration_number"
                    placeholder="3928818" 
                    labelText="Registration number" 
                    errors={errors} 
                    touched={touched} 
                    options={{numericOnly: true}}
                    required/>
            </InputWrapper>
            <InputWrapper>
                <FormikField 
                    value={values.beneficial_fullname || ''} 
                    name="registration_date" 
                    placeholder="2011/03/08" 
                    labelText="Date of registration" 
                    errors={errors} 
                    touched={touched} 
                    options={{date: true, datePattern: ['Y', 'm', 'd'], delimiter: '-'}}
                    required/>
            </InputWrapper>
            <InputWrapper>
                <FormikField 
                    value={values.beneficial_fullname || ''} 
                    name="phone_number"
                    placeholder="+15417543010" 
                    labelText="Phone number" 
                    errors={errors} 
                    touched={touched} 
                    options={{numericOnly: true, prefix:'+', noImmediatePrefix: true}}
                    required/>
            </InputWrapper>
            <InputWrapper>
                <FormikField 
                    value={values.beneficial_fullname || ''} 
                    name="director_firstname"
                    placeholder="Steve" 
                    labelText="First name of director" 
                    errors={errors} 
                    touched={touched}
                    required/>
            </InputWrapper>
            <InputWrapper>
                <FormikField 
                    value={values.beneficial_fullname || ''} 
                    name="director_lastname"
                    placeholder="Jobs" 
                    labelText="Last Name of director"
                    errors={errors} 
                    touched={touched}
                    required/>
            </InputWrapper>
            <InputWrapper>
                <FormikField 
                    value={values.beneficial_fullname || ''} 
                    name="email"
                    placeholder="apple@gmail.com" 
                    labelText="Email" 
                    errors={errors} 
                    touched={touched}
                    required/> 
            </InputWrapper>
            <InputWrapper>
                <FormikField 
                    value={values.beneficial_fullname || ''} 
                    name="address"
                    placeholder="4150 Sydney Place Washington, DC 20521-4150" 
                    labelText="Address" 
                    errors={errors} 
                    touched={touched}
                    required/> 
            </InputWrapper>
            <InputWrapper>
                <FormikField 
                    value={values.beneficial_fullname || ''} 
                    name="field_of_activity"
                    placeholder="Production of electronics" 
                    labelText="Field of activity" 
                    errors={errors} 
                    touched={touched}
                    required/>
            </InputWrapper>
        </InputSet>
    )
}

export default LegalPersonData;


const InputSet = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    padding-bottom: 40px;
    margin-bottom: 40px;
    border-bottom: 1px solid rgba(151,151,151,.25);
`;

const InputWrapper = styled.div`
    height: 45px;
    flex-basis: 48%;
    ${media.xs} {
        flex-basis: 100%;
    }
    &:not(:last-child) {
        margin-bottom: 70px;
        ${media.xs} {
            margin-bottom: 50px;
        }
    }
    &:last-child {
        margin-bottom: 40px;
    }
`;


