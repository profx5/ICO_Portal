import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import $ from 'jquery';

import Utils from './../utils/index';

import * as KYCActions from './../actions/KYCActions';

import Button from './../components/Button';
import VerificationStages from './../components/VerificationStages';
import VerificationState from './../components/VerificationState';



class VerificationInfo extends React.Component {

    constructor() {
        super();
        this.addStageOffset = 250;
    }

    stageTracker = () => {
        let stickyElOffset = $('.VerificationInfo').offset(),
            sectionName, $section, sectionOffset;
        const addStageOffset = this.addStageOffset;

        $('[data-bind-to]').each(function(index, item) {
            sectionName = $(item).data('bind-to');
            $section = $(`.${sectionName}`);
            sectionOffset = $section.offset();
            if (stickyElOffset.top >= (sectionOffset.top - addStageOffset) &&
                stickyElOffset.top <= (sectionOffset.top + $section.height())) {
                    $('[data-bind-to]').removeClass('active');
                    $(`[data-bind-to=${sectionName}]`).addClass('active');
            }
        });
    }

    stageClickHandler = event => {
        const addStageOffset = this.addStageOffset;
        let $el = $(event.currentTarget);
        let valToScroll = $(`.${$el.data('bind-to')}`).offset().top - addStageOffset;
        console.log(this.addStageOffset)
        $('body,html').animate({
            'scrollTop': valToScroll + 'px'
        })
    }

    componentDidMount() {
        $(window).on('scroll', Utils.throttle(this.stageTracker,30));
    }

    render() {
        const {status, verificationStages, stages} = this.props;

        return (
            <Wrapper className="VerificationInfo">
                <VerificationStages stageClickHandler={this.stageClickHandler} boundSections={verificationStages} stages={stages}/>
                <ButtonWrapper>
                    <Button type="submit" text="Send data"/>
                </ButtonWrapper>
                <VerificationState kycState={status}/>
            </Wrapper>
        )
    }
};


const mapStateToProps = ({KYC}) => ({
    status: KYC.get('state')
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
    width: 165px;
    margin-bottom: 60px;
`;