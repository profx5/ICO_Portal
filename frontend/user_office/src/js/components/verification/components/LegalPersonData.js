import React from 'react'
import styled from 'styled-components';

import FinalFormField from './../../common/FinalFormField';


const LegalPersonData = ({}) => {
    return (
        <InputSet>
            <input type="hidden" name='type' value='LEGAL'/>
            <InputWrapper>
                <FinalFormField placeholder="Apple" labelText="Business name" required name="business_name" options={{delimiter: ''}}/>
            </InputWrapper>
            <InputWrapper>
                <FinalFormField placeholder="3928818" labelText="Registration number" required name="registration_number" options={{delimiter: ''}}/>
            </InputWrapper>
            <InputWrapper>
                <FinalFormField placeholder="2011/03/08" 
                                labelText="Date of registration" 
                                name="registration_date" 
                                required 
                                options={{date: true, datePattern: ['Y', 'm', 'd'], delimiter: '-'}}/>
            </InputWrapper>
            <InputWrapper>
                <FinalFormField placeholder="+15417543010"  labelText="Phone number" required options={{numericOnly: true, prefix:'+', noImmediatePrefix: true}} name="phone_number"/>
            </InputWrapper>
            <InputWrapper>
                <FinalFormField placeholder="Steve" labelText="First name of director" required name="director_firstname" options={{delimiter: ''}}/>
            </InputWrapper>
            <InputWrapper>
                <FinalFormField placeholder="Jobs" labelText="Last Name of director" required name="director_lastname" options={{delimiter: ''}}/>
            </InputWrapper>

            <InputWrapper>

                <FinalFormField placeholder="apple@gmail.com" labelText="Email" required name="email" options={{delimiter: ''}}/>
            </InputWrapper>
            <InputWrapper>
                <FinalFormField placeholder="4150 Sydney Place Washington, DC 20521-4150" labelText="Address" required name="address" options={{delimiter: ''}}/>
            </InputWrapper>
            <InputWrapper>
                <FinalFormField placeholder="Production of electronics" labelText="Field of activity" required name="field_of_activity" options={{delimiter: ''}}/>
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
    
    &:not(:last-child) {
        margin-bottom: 70px;
    }
    &:last-child {
        margin-bottom: 40px;
    }
`;


