import React from 'react';
import {connect} from 'react-redux';

import Utils from './../utils/index';

import * as ICOInfoActions from './../actions/ICOInfoActions';

import ICOPhaseInfo from './../components/ICOPhaseInfo';
import Button from './../components/Button';



class ICOSidebarInfo extends React.Component {

    componentDidUpdate() {
        const {endTime, humanizeEndTime} = this.props;

        humanizeEndTime(Utils.humanizeUTCTime(endTime, 'ddd MMM DD YYYY'));
    }

    render() {
        const {phaseName, bonusPercents, humanizedEndTime} = this.props;
        return (
            <div>
                <ICOPhaseInfo phaseName={phaseName} discount={bonusPercents} endDate={humanizedEndTime}/>
                <Button text='Buy TKN'/>
            </div>
        );
    }
}

const mapStateToProps = ({ICOInfo, Phase}) => ({

    phaseName: Phase.get('name'),
    bonusPercents: Phase.get('bonus_percents'),

    endTime: Phase.get('end_date'),
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