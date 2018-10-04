import React from 'react'
import styled from 'styled-components';

import FinalFormField from './../../common/FinalFormField';


const NaturalPersonData = ({email}) => {
    return (
        <InputSet>
            <input type="hidden" name='type' value='NATURAL'/>
            <InputWrapper>
                <FinalFormField placeholder="John" labelText="First Name" required name="firstname" options={{delimiter: ''}}/>
            </InputWrapper>
            <InputWrapper>
                <FinalFormField placeholder="Fitzgerald" labelText="Middle Name" name="middlename" options={{delimiter: ''}}/>
            </InputWrapper>
            <InputWrapper>
                <FinalFormField placeholder="Kennedy" labelText="Last Name" required name="lastname" options={{delimiter: ''}}/>
            </InputWrapper>
            <InputWrapper>
                <FinalFormField placeholder="Brookline, Massachusetts, United States" required labelText="Place of birth" name="place_of_birth" options={{delimiter: ''}}/>
            </InputWrapper>
            <InputWrapper>
                <FinalFormField placeholder="1917/05/29" 
                                labelText="Date of birth" 
                                name="birthdate" 
                                required
                                options={{date: true, datePattern: ['Y', 'm', 'd'], delimiter: '-'}}/>
            </InputWrapper>
            <InputWrapper>
                <FinalFormField placeholder="915344722819"
                                labelText="Personal identification code" 
                                name="personal_id" 
                                required
                                options={{delimiter: ''}}/>
            </InputWrapper>
            <InputWrapper>
                <FinalFormField placeholder="+15417543010" labelText="Phone number"
                                required 
                                options={{numericOnly: true, prefix: '+', noImmediatePrefix: true}} 
                                name="phone_number"/>
            </InputWrapper>
            <InputWrapper>
                <FinalFormField placeholder="john@gmail.com" labelText="Email" required value={email} type="email" name="email" options={{delimiter: ''}}/>
            </InputWrapper>
            <InputWrapper>
                <FinalFormField placeholder="4150 Sydney Place Washington, DC 20521-4150" labelText="Place of residence" required name="place_of_residence" options={{delimiter: ''}}/>
            </InputWrapper>
            <InputWrapper>
                <FinalFormField placeholder="Software developer" labelText="Profession or field of activity" required name="profession" options={{delimiter: ''}}/>
            </InputWrapper>
        </InputSet>
    )
}

export default NaturalPersonData;


const InputSet = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    margin-bottom: 35px;
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


