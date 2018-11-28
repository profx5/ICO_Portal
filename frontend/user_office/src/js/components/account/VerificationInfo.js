import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import $ from 'jquery';
import Utils from './../../utils/index';
import {media} from './../../utils/media';

import VerificationStages from './components/VerificationStages';


class VerificationInfo extends React.Component {

    constructor() {
        super();
        this.addStageOffset = 470;
    }

    stageTracker = () => {
        let sectionName, $section, sectionHeight, sectionOffset;
        const addStageOffset = this.addStageOffset;

        $('[data-bind-to]').each(function(index, item) {
            sectionName = $(item).data('bind-to');
            $section = $(`.${sectionName}`);
            sectionHeight = $section.height();
            sectionOffset = $section.offset();
            if ($('.VerificationInfo').offset().top >= (sectionOffset.top - addStageOffset) &&
                $('.VerificationInfo').offset().top <= (sectionOffset.top + sectionHeight)) {
                    $('[data-bind-to]').removeClass('active');
                    $(`[data-bind-to="${sectionName}"]`).addClass('active');
            }
        });
    }

    stageClickHandler = event => {
        const addStageOffset = this.addStageOffset;
        let $el = $(event.currentTarget);
        let valToScroll = $(`.${$el.data('bind-to')}`).offset().top - addStageOffset;
        $('body,html').animate({
            'scrollTop': `${valToScroll}px`
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
        const {verificationStages, stages} = this.props;
        return (
            <Wrapper className={`VerificationInfo ${this.props.className}`}>
                <VerificationStages stageClickHandler={this.stageClickHandler} boundSections={verificationStages} stages={stages}/>
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

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(VerificationInfo)

const Wrapper = styled.div`
    margin: 0 38px;
    max-width: 315px;
    position: sticky;
    top: 20px;
    ${media.sm} {
        flex-basis: 100%;
    }
`;
