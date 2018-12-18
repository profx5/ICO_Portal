import React from 'react'
import styled from 'styled-components';
import {media} from 'js/utils/media';

import FormikField from 'js/components/common/FormikField';


const LegalOwnerData = ({showModalHandler, errors, touched, values}) => {
    return (
        <InputSet>
            <SubTitle>
                <span onClick={showModalHandler.bind(this, {
                    modalHead: 'Beneficial owner',
                    modalContent: `Beneficial owner means a natural person who ultimately owns or controls a legal person through direct 
                    or indirect ownership of a sufficient percentage (25 per cent plus one) of the shares or voting rights or ownership interest 
                    (more than 25 per cent) in that person, including through bearer shareholdings, or through control via other means.`
                })}>Beneficial owner</span> data
            </SubTitle>
            <InputWrapper>
                <FormikField 
                    value={values.beneficial_fullname || ''}
                    name="beneficial_fullname" 
                    placeholder="John" 
                    labelText="Name" 
                    errors={errors} 
                    touched={touched} 
                    required/>
            </InputWrapper>
            <InputWrapper>
                <FormikField 
                    value={values.beneficial_personal_id || ''} 
                    name="beneficial_personal_id" 
                    placeholder="915344722819" 
                    labelText="Personal identification code" 
                    errors={errors} 
                    touched={touched}
                    options={{numericOnly: true}}
                    required/>
            </InputWrapper>
            <InputWrapper>
                <FormikField 
                    value={values.beneficial_place_of_birth || ''} 
                    name="beneficial_place_of_birth"
                    placeholder="Brookline, Massachusetts, United States" 
                    labelText="Place of birth" 
                    errors={errors} 
                    touched={touched}
                    required/>
            </InputWrapper>
            <InputWrapper>
                <FormikField 
                    value={values.beneficial_birthdate || ''} 
                    name="beneficial_birthdate"
                    labelText="Date of birth" 
                    placeholder="1917/05/29" 
                    errors={errors} 
                    touched={touched}
                    options={{date: true, datePattern: ['Y', 'm', 'd'], delimiter: '-'}}
                    required/>
            </InputWrapper>
            <InputWrapper fullWidth>
                <FormikField 
                    value={values.beneficial_place_of_residence || ''} 
                    name="beneficial_place_of_residence"
                    placeholder="4150 Sydney Place Washington, DC 20521-4150" 
                    labelText="Place of residence of the beneficial owner(s)" 
                    errors={errors} 
                    touched={touched}
                    required/>
            </InputWrapper>
        </InputSet>
    )
}

export default LegalOwnerData;


const SubTitle = styled.h4`
    font-size: 16px;
    color: #0a0a0a;
    letter-spacing: 0.5px;
    flex-basis: 100%;
    margin-bottom: 30px;
    span {
        text-decoration: underline;
        cursor: pointer;
    }
`;

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
    flex-basis: ${props => props.fullWidth ? '100%' : '48%'};
    position: relative;
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


