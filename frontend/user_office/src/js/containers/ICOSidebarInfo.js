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
        
        const {endTime, humanizeEndTime} = this.props;
        let endDate = moment(new Date(endTime * 1000)),
            humanizedEndTime = moment(endDate).format("ddd MMM DD YYYY");
        humanizeEndTime(humanizedEndTime);
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
    endTime: ICOInfo.getIn(['currentPhase', 'endTime']),
    humanizedEndTime: ICOInfo.get('humanizedEndTime')
})

const mapDispatchToProps = (dispatch) => ({
    humanizeEndTime(payload) {
        dispatch(ICOInfoActions.humanizeEndTime(payload))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(ICOSidebarInfo)


// STYLES