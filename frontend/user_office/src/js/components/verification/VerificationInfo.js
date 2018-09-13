import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import $ from 'jquery';
import Utils from './../../utils/index';

import VerificationStages from './components/VerificationStages';
import VerificationState from './components/VerificationState';
import Button from './../common/Button';

import PreloadIcon from './../../../img/preload-white.svg';


class VerificationInfo extends React.Component {

    constructor() {
        super();
        this.addStageOffset = 250;
    }

    stageTracker = () => {
        let sectionName, $section, sectionOffset;
        const addStageOffset = this.addStageOffset;

        $('[data-bind-to]').each(function(index, item) {
            sectionName = $(item).data('bind-to');
            $section = $(`.${sectionName}`);
            sectionOffset = $section.offset();
            if ($('.VerificationInfo').offset().top >= (sectionOffset.top - addStageOffset) &&
                $('.VerificationInfo').offset().top <= (sectionOffset.top + $section.height())) {
                    $('[data-bind-to]').removeClass('active');
                    $(`[data-bind-to=${sectionName}]`).addClass('active');
            }
        });
    }

    stageClickHandler = event => {
        const addStageOffset = this.addStageOffset;
        let $el = $(event.currentTarget);
        let valToScroll = $(`.${$el.data('bind-to')}`).offset().top - addStageOffset;
        $('body,html').animate({
            'scrollTop': valToScroll + 'px'
        })
    }

    componentDidMount() {
        $(window).on('scroll', Utils.throttle(this.stageTracker,30));
    }

    getKYCTicket = () => {
        const { tickets } = this.props;
        return tickets.filter(item => item.title.startsWith('KYC request for user'));
    }

    render() {
        const {status, verificationStages, stages, btnText, isSubmiting, type} = this.props;
        let kyc_ticket = this.getKYCTicket();
        let kyc_ticket_id = null;
        if (kyc_ticket[0]) {
            kyc_ticket_id = kyc_ticket[0].id;
        }
        let btn_text = !isSubmiting ? status === 'WAITING' ? 'Update data' : btnText : 'Submitting...';
        let KYCStatus = type !== '' && status;
        return (
            <Wrapper className="VerificationInfo">
                <VerificationStages stageClickHandler={this.stageClickHandler} boundSections={verificationStages} stages={stages}/>
                    {status !== 'APPROVED' &&
                    
                    <ButtonWrapper>
                        <Button type="submit" text={btn_text} icon={isSubmiting && PreloadIcon}/>
                    </ButtonWrapper>
                    }
                <VerificationState kycState={KYCStatus} kycTicketId={kyc_ticket_id}/>
            </Wrapper>
        )
    }
};


const mapStateToProps = ({KYC, tickets}) => ({
    status: KYC.get('state'),
    isSubmiting: KYC.get('isSubmiting'),
    tickets: tickets.get('results'),
    type: KYC.get('type'),
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(VerificationInfo)


const Wrapper = styled.div`
    margin-left: 38px;
    max-width: 315px;
    position: sticky;
    top: 20px;
`;

const ButtonWrapper = styled.div`
    width: 190px;
    height: 45px;
    margin-bottom: 60px;
`;
