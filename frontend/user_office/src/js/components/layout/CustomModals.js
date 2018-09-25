import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Modal from './Modal';

import * as UIActions from './../../actions/UIActions';


class CustomModals extends React.Component {

    showSetAccountPopupAndCloseTip = e => {
        e.preventDefault();
        const {showSetAccountPopup} = this.props;
        showSetAccountPopup();
    };

    render() {
        const {
            openedModalId,
            hideModal,
            kycState,
            type
        } = this.props;
        let kycSended = !!type;

        return (
            <React.Fragment>
                {openedModalId === 1 && 
                    <Modal head="What is PEP?" content={
                        <React.Fragment>
                            <p><span>Politically exposed person</span> means a natural person who is or who has 
                            been entrusted with prominent public functions including a head of state, head of government, 
                            minister or deputy or assistant minister; a member of parliament or of a similar legislative
                            body, a member of a governing body of a political party, a member of a supreme court, a
                            member of a court of auditors or of the board of a central bank; an ambassador, a chargé 
                            d'affaires or a high-ranking officer in the armed forces; a member of an administrative, 
                            management or supervisory body of a state-owned enterprise; a director, deputy director or
                            member of the board or equivalent function of an international organisation, except 
                            middle-ranking or more junior officials.
                            </p>
                            <p><span>Family member of a politically exposed person</span> means the spouse, or a person 
                            considered to be equivalent to a spouse, of a politically exposed person; a child and their 
                            spouse, or a person considered to be equivalent to a spouse, of a politically exposed person; 
                            or a parent of a politically exposed person.
                            </p>
                            <p>
                                <span>Person known to be close associate of a politically exposed person</span> means a natural 
                                person who is known to be the beneficial owner or to have joint beneficial ownership of a legal
                                person or a legal arrangement, or any other close business relations, with a politically exposed
                                person; or a natural person who has sole beneficial ownership of a legal entity or legal 
                                arrangement which is known to have been set up for the de facto benefit of a politically 
                                exposed person.
                            </p>
                        </React.Fragment>
                    }/>
                }
                {openedModalId === 2 && 
                    <Modal head="Verification required" content={
                        <React.Fragment>
                            {!kycSended &&
                                <p>Sorry, but you are not allowed to buy tokens yet. Please <Link className='link' onClick={hideModal} to='/user_office/verification/'>pass
                                KYC</Link> procedure first!</p>
                            }
                            {kycSended && kycState === 'WAITING' &&
                                <p>Sorry, but you are not allowed to buy tokens yet. Please wait while we validate info you
                                provided.</p>
                            }
                            {kycSended && kycState === 'DECLINED' &&
                                <p>Sorry, but you are not allowed to buy tokens yet. Your KYC was declined. Please <Link className='link'
                            onClick={hideModal} to='/user_office/support/'>contact our support</Link>.</p>
                            }
                        </React.Fragment>
                    }/>
                }
                {openedModalId === 3 && 
                    <Modal head="ETH Account required" content={
                        <React.Fragment>
                            <p>Sorry, but you are not allowed to buy tokens yet. Please <span className='link' onClick={this.showSetAccountPopupAndCloseTip}>add
                            your ETH account</span> to get tokens.</p>
                        </React.Fragment>
                    }/>
                }

            </React.Fragment>
        )
    }
}


const mapStateToProps = ({UI, KYC, Currencies, Invest, user}) => ({
    openedModalId: UI.get('openedModalId'),
    kycState: KYC.get('state'),
    type: KYC.get('type'),
});

const mapDispatchToProps = (dispatch) => ({
    hideModal() {
        dispatch(UIActions.hideModal())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomModals);
