import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';

import Utils from './../utils/index';

import InputText from './../components/InputText';



class Address extends React.Component {

    render() {

        return (
            <Wrapper>
                <Title>Address</Title>
                <InputSet>
                    <InputWrapper>
                        <InputText labelText="City"/>
                    </InputWrapper>
                    <InputWrapper>
                        <InputText labelText="Registration address"/>
                    </InputWrapper>
                    <InputWrapper>
                        <InputText labelText="Postcode"/>
                    </InputWrapper>
            </InputSet>
            </Wrapper>
        )
    }
};


const mapStateToProps = ({ICOInfo, Timer}) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

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
    margin-bottom: 50px;
`;

const DescHead = styled.h4`
    color: #0a0a0a;
    font-weight: 500;
    flex-basis: 100%;
    margin-bottom: 40px;
`;


const PhotoFileUpload = styled.div`
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 150px;
`;

const PhotoWrapper = styled.div`
    flex-basis: 50%;
`;

const UploadWrapper = styled.div`
    width: 285px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
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