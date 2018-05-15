import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as ReferralsActions from '../actions/ReferralsActions'

import Button from '../components/Button'

class ReferralLink extends Component {
    copyLink = () => {
        const copyText = document.getElementById("referralLink");

        copyText.select();

        document.execCommand("Copy");
    }

    render() {
        const {
            getReferralLinkRequest,
            isLinkLoading,
            referralLink
        } = this.props

        let content = ''

        if (isLinkLoading){
            content = (
                <div>
                    <span>loading ...</span>
                </div>
            )
        } else if (referralLink){
            content = (
                <div>
                    <p className='small'>Referral link: <br/>
                        <input id='referralLink' value={referralLink} readOnly />
                    </p>
                    <Button
                        text='copy'
                        onClick={this.copyLink}
                    />
                </div>
            )
        } else {
            content = (
                <Button
                    text='get referral link'
                    primary={true}
                    onClick={getReferralLinkRequest}
                />
            )
        }

        return (
            <div>
                {content}
            </div>
        )
    }
}

const mapStateToProps = ({referrals}) => ({
    referralLink: referrals.getIn(['link', 'url']),
    isLinkLoading: referrals.getIn(['link', 'isLoading'])
})

const mapDispatchToProps = (dispatch) => ({
    getReferralLinkRequest() {
        dispatch(ReferralsActions.getReferralLinkRequest())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReferralLink)
