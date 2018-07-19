import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import FinalFormCheckbox from './../components/FinalFormCheckbox';
import Button from './../components/Button';

class InvestorsDocuments extends React.Component {

    render() {

        return (
            <Wrapper className="Verification__investorsDocuments">
                <Title>Investor's documents</Title>
                <div class="block-file">
                    <SubTitle>Copy of identification document</SubTitle>
                    <p className="text">EU ID card, passport or driving licence bearing the name, photograph or facial image, signature or image of signature and date of birth or personal identification code of the holder</p>
                    <ButtonWrapper>
                        <Button text="Attach file"/>
                    </ButtonWrapper>
                </div>
                <div class="block-file">
                    <SubTitle>Utility bill</SubTitle>
                    <p className="text">For rent, electricity, gas, water, telecommunication services or other similar services), bank or credit card statement, tax bill or notice or voter’s card or similar document bearing the investor’s name and address (the document must not be older than six months.</p>
                    <ButtonWrapper>
                        <Button text="Attach file"/>
                    </ButtonWrapper>
                </div>
                <FinalFormCheckbox name="confirm" options={['I confirm that all the data and documents submitted are correct.']} values={['Yes']}/>
            </Wrapper>
        )
    }
}

const mapStateToProps = ({}) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(InvestorsDocuments)

const Wrapper = styled.div`
    flex: 1;
    height: auto;
    padding: 42px 50px 42px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    margin-top: 20px;
    .text {
        font-size: 16px;
        color: #0a0a0a;
        letter-spacing: 0.5px;
        line-height: 1.44;
    }
    .block-file {
        border-bottom: 1px solid rgba(151,151,151,.25);
        margin-bottom: 40px;
    }
`;

const Title = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #323c47;
    letter-spacing: 0.1px;
    margin-bottom: 45px;
`;

const SubTitle = styled.h4`
    font-size: 16px;
    color: 30a0a0a;
    letter-spacing: 0.5px;
    margin-bottom: 13px;
    & + .text {
        margin-bottom: 20px;
    }
`;

const ButtonWrapper = styled.div`
    width: 190px;
    height: 45px;
    margin-bottom: 50px;
`;