import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {media} from 'js/utils/media';

import FormikField from 'js/components/common/FormikField';


class AddWallet extends React.Component {

    render() {
        const {eth_account, errors, touched} = this.props;

        return (
            <Wrapper className="Verification_addEth">
                <Head>Add your ETH account</Head>
                <InputWrapper>
                    <FormikField
                        placeholder="Your ETH wallet"
                        className="Verification_requiredField"
                        name="eth_account"
                        errors={errors} 
                        touched={touched} 
                    />
                </InputWrapper>
                {!eth_account && this.deteckMetamask() && 
                    <MetamaskNotice>
                        We`ve noticed that your Metamask app is unlocked so we copied account here. If you want to use any other account please just delete current data and refill the field
                    </MetamaskNotice>
                }
                <Notice>
                    <span>IMPORTANT NOTICE:</span>
                    Add only your Own account you have a secret key from! Do not add accounts from exchanges, this will cause you to loose all the tokens! Also your wallet should support ERC 20 tokens!
                </Notice>
            </Wrapper>
        )
    }

    deteckMetamask = () => {
        if (typeof window.web3.eth.defaultAccount !== 'undefined') return true;
            else return false;
    }
}


const mapStateToProps = ({user}) => ({
    eth_account: user.get('eth_account')
});

export default connect(mapStateToProps)(AddWallet);

const Wrapper = styled.div`
    padding: 40px 50px;
    background: white;
    margin-bottom: 60px;
    ${media.xs} {
        padding: 16px 20px 25px;
        margin-bottom: 25px;
    }
    ${media.sm} {
        margin-bottom: 0;
    }
`;

const Head = styled.h3`
    font-size: 20px;
    margin-bottom: 30px;
    ${media.xs} {
        font-size: 16px;
    }
`;

const InputWrapper = styled.div`
    height: 45px;
    margin-bottom: 33px;
`;

const MetamaskNotice = styled.p`
    font-size: 16px;
    border-left: 4px solid rgb(49, 114, 253);
    padding-left: 11px;
    margin-bottom: 30px;
    line-height: 1.44;
    ${media.xs} {
        font-size: 12px;
        border-width: 3px;
    }
`;

const Notice = styled.p`
    span {
        display: block;
        text-transform: uppercase;
        color: rgb(237, 18, 11);
        font-size: 18px;
        margin-bottom: 12px;
        font-weight: 600;
        ${media.xs} {
            font-size: 14px;
        }
    }
    font-size: 16px;
    line-height: 1.44;
    ${media.xs} {
        font-size: 12px;
    }
`;
