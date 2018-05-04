import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

import Utils from './../utils/index';

import * as ICOInfoActions from './../actions/ICOInfoActions';

import ICOPhaseInfo from './../components/ICOPhaseInfo';
import Button from './../components/Button';



class ICOSidebarInfo extends React.Component {

    componentDidUpdate() {
        const {startTime, endTime, humanizeEndTime, updateTimer} = this.props;
        humanizeEndTime(Utils.humanizeUTCTime(endTime, 'ddd MMM DD YYYY'));
    }

    render() {
        const {phaseName, discountPercent, humanizedEndTime} = this.props;
        return (
            <div>
                <ICOPhaseInfo phaseName={phaseName} discount={discountPercent} endDate={humanizedEndTime}/>
                <Button text='Buy TKN'/>
            </div>
        );
    }
}

const mapStateToProps = ({ICOInfo}) => ({

    phaseName: ICOInfo.getIn(['currentPhase', 'name']),
    discountPercent: ICOInfo.getIn(['currentPhase', 'discountPercent']),
    startTime: ICOInfo.getIn(['currentPhase', 'startTime']),
    endTime: ICOInfo.getIn(['currentPhase', 'endTime']),
    humanizedEndTime: ICOInfo.get('humanizedEndTime'),
    countdownTime: ICOInfo.get('countdownTime')
})

const mapDispatchToProps = (dispatch) => ({
    humanizeEndTime(payload) {
        dispatch(ICOInfoActions.humanizeEndTime(payload))
    },
    updateCountdown(payload) {
        dispatch(ICOInfoActions.updateCountdown(payload))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(ICOSidebarInfo)


// STYLES