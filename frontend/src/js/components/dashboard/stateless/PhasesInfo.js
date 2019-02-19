import React from 'react';
import styled from 'styled-components';
import {media} from 'js/utils/media';


const PhasesInfo = () => {

    return (
        <div className="visible-smMinus">
            <Head>Chronology of phases:</Head>
            <Phase active={false} passed={true} next={false}>
                <div className="PhasesInfo_phaseName">Soft cap</div>
                <div className="PhasesInfo_phaseRate">1 OGD = 2 USD</div>
            </Phase>
            <Phase active={true} passed={false} next={false}>
                <div className="PhasesInfo_phaseName">Phase 1</div>
                <div className="PhasesInfo_phaseRate">1 OGD = 2 USD</div>
            </Phase>
            <Phase active={false} passed={false} next={true}>
                <div className="PhasesInfo_phaseName">Phase 2</div>
                <div className="PhasesInfo_phaseRate">1 OGD = 2 USD</div>
            </Phase>
            <Phase active={false} passed={false} next={false}>
                <div className="PhasesInfo_phaseName">Phase 3</div>
                <div className="PhasesInfo_phaseRate">1 OGD = 2 USD</div>
            </Phase>
            <Phase active={false} passed={false} next={false}>
                <div className="PhasesInfo_phaseName">Hard cap</div>
                <div className="PhasesInfo_phaseRate">1 OGD = 2 USD</div>
            </Phase>
        </div>
    )
}


export default PhasesInfo;

const Head = styled.div`
    color: rgba(0, 0, 0, .7);
    font-size: 16px;
    margin-bottom: 20px;
    ${media.xs} {
        font-size: 12px;
    }
`;

const Phase = styled.div`
    position: relative;
    &:not(:last-of-type) {
        margin-bottom: 20px;
    }
    &:after {
        content: '${props => (props.active && '(In progress)') || (props.next && '(Comming soon)')}';
        font-size: 16px;
        position: absolute;
        top: 0;
        right: 0;
        opacity: ${props => props.next && '0.4'};
        ${media.xs} {
            font-size: 12px;
        }
    }
    .PhasesInfo_phaseName {
        font-size: 16px;
        ${media.xs} {
            font-size: 12px;
        }
    }
    .PhasesInfo_phaseRate {
        color: ${props => (props.active || props.passed) ? 'rgb(57, 125, 255)' : 'rgba(20, 20, 20,.4)'};
        ${media.xs} {
            font-size: 14px;
        }
    }
`;
