import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';

import FinalFormField from './../components/FinalFormField';



class Address extends React.Component {

    render() {

        return (
            <Wrapper className="Verification__address">
                <Title>Address</Title>
                <InputSet>
                    <InputWrapper>
                        <FinalFormField labelText="City" name="city"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField labelText="Country" name="country"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField labelText="Registration address" name="registration_address"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField labelText="Postcode" name="postcode" options={{numericOnly: true}}/>
                    </InputWrapper>
            </InputSet>
            </Wrapper>
        )
    }
};


const mapStateToProps = ({ICOInfo, Timer}) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Address)


const Wrapper = styled.div`
    flex: 1;
    height: auto;
    margin-top: 42px;
    padding: 42px 30px 42px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
`;

const Title = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #323c47;
    letter-spacing: 0.1px;
    margin-bottom: 45px;
`;

const InputSet = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
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