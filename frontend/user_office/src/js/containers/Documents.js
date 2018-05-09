import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';

import Utils from './../utils/index';

import Photo from './../components/Photo';
import FileUpload from './../components/FileUpload';
import PhotoUpload from './../components/PhotoUpload';
import DocsOptions from './../components/DocsOptions';
import InputText from './../components/InputText';



class Documents extends React.Component {

    render() {

        return (
            <Wrapper>
                <Title>Document</Title>
                <ContentWrapper>
                    <ContentPart>
                        <Head>Choose a document</Head>
                        <DocsOptions tabsArray={['Passport', 'Driver license', 'International passport']}></DocsOptions>
                    </ContentPart>
                    <ContentPart>
                        <InputWrapper>
                            <InputText labelText="Series and number"/>
                        </InputWrapper>
                        <InputWrapper>
                            <InputText labelText="Country"/>
                        </InputWrapper>
                        <InputWrapper>
                            <InputText labelText="Date"/>
                        </InputWrapper>
                    </ContentPart>
                </ContentWrapper>
                <PhotoFileUpload>
                    <PhotoWrapper>
                        <Photo/>
                    </PhotoWrapper>
                    <UploadWrapper>
                        <DescHead>Choose uploading way</DescHead>
                        <PhotoUpload/>
                        <FileUpload/>
                    </UploadWrapper>
                </PhotoFileUpload>
            </Wrapper>
        )
    }
};


const mapStateToProps = ({ICOInfo, Timer}) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Documents)


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
    margin-bottom: 90px;
`;

const ContentWrapper = styled.div`
    display: flex;
    margin-bottom: 56px;
`;

const ContentPart = styled.div`
    flex-basis: 50%;
`;

const Head = styled.h4`
    color: #0a0a0a;
    font-weight: 500;
    margin-bottom: 13px;
`;

const InputWrapper = styled.div`
    height: 45px;
    
    &:not(:last-child) {
        margin-bottom: 70px;
    }
    &:last-child {
        margin-bottom: 40px;
    }
`;

const DescHead = styled.h4`
    position: absolute;
    left: 0;
    top: 0;
    color: #0a0a0a;
    font-weight: 500;
    flex-basis: 100%;
`;

const PhotoFileUpload = styled.div`
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 70px;
    padding-top: 50px;
    border-top: 1px solid rgba(151,151,151,0.25);
`;

const PhotoWrapper = styled.div`
    flex-basis: 50%;
    display: inline-flex;
    flex-flow: row wrap;
    align-items: center;
    position: relative;
    padding-top: 55px;
`;

const UploadWrapper = styled.div`
    width: 285px;
    display: inline-flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding-top: 55px;
`;