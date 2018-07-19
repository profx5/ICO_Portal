import React from 'react';
import {connect} from 'react-redux'

import styled from 'styled-components';

import { Link } from 'react-router-dom';
import * as UIActions from './../actions/UIActions';
class Nav extends React.Component {

    get_elem = (t) => {
        const {setCurrentRoute} = this.props;
        setCurrentRoute(t);
    };

    render() {
        const {currentRoute} = this.props;

        return (
            <Wrapper>
                <IconLink active={1 === currentRoute} onClick={this.get_elem.bind(this, 1)} to="/user_office">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24">
                      <g fill="#3172FD">
                        <path d="M27.334 5.525L14.434.087a1.117 1.117 0 0 0-.867 0L.666 5.525A1.08 1.08 0 0 0 0 6.52c0 .433.264.823.668.993l12.901 5.402a1.117 1.117 0 0 0 .862 0l12.9-5.402c.406-.17.669-.56.669-.993a1.08 1.08 0 0 0-.666-.994zM14 10.745L3.896 6.516 14 2.255l10.104 4.26L14 10.745zm13.91 6.858c-.239-.505-.886-.739-1.443-.522L14 21.922l-12.467-4.84c-.559-.218-1.204.017-1.444.521-.24.505.02 1.09.577 1.307l12.9 5.01a1.2 1.2 0 0 0 .868 0l12.9-5.01c.558-.217.816-.802.577-1.307z"/>
                        <path d="M27.912 11.608c-.239-.508-.884-.744-1.443-.528L14 15.913 1.532 11.08c-.559-.216-1.205.02-1.443.528s.022 1.096.58 1.312l12.9 5a1.196 1.196 0 0 0 .863 0l12.9-5c.559-.216.819-.804.58-1.312z"/>
                      </g>
                    </svg>
                </IconLink>
                <IconLink active={2 === currentRoute} onClick={this.get_elem.bind(this, 2)} to="/user_office/transactions">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="33">
                      <g fill="#3172FD">
                        <path d="M24 0c-5.817 0-12 1.874-12 5.348v4.278c0 .59.489 1.07 1.09 1.07.603 0 1.092-.48 1.092-1.07V8.51c2.315 1.431 6.137 2.184 9.818 2.184 3.68 0 7.503-.753 9.818-2.184v1.115c0 1.046-2.683 2.714-7.728 3.127a1.076 1.076 0 0 0-.995 1.155c.046.558.524.98 1.085.98.032 0 .06-.002.093-.005 2.841-.233 5.671-.954 7.545-2.124v1.145c0 .913-1.977 2.226-5.644 2.862a1.073 1.073 0 0 0-.884 1.238 1.087 1.087 0 0 0 1.263.867c2.22-.383 3.995-1.01 5.265-1.806v1.117c0 .913-1.977 2.227-5.644 2.862a1.073 1.073 0 0 0-.884 1.238 1.087 1.087 0 0 0 1.263.867c2.22-.383 3.995-1.012 5.265-1.806v1.117c0 .913-1.977 2.227-5.644 2.862a1.073 1.073 0 0 0-.884 1.238 1.087 1.087 0 0 0 1.263.867c2.22-.383 3.995-1.012 5.265-1.806v1.117c0 1.046-2.683 2.714-7.728 3.127a1.076 1.076 0 0 0-.995 1.155c.046.559.524.98 1.085.98.032 0 .06-.002.093-.004C31.115 31.598 36 29.82 36 26.738V5.348C36 1.874 29.817 0 24 0zm0 8.556c-5.993 0-9.818-1.901-9.818-3.208 0-1.307 3.825-3.209 9.818-3.209 5.993 0 9.818 1.902 9.818 3.209 0 1.307-3.825 3.208-9.818 3.208z"/>
                        <path d="M12 13c-5.817 0-12 1.947-12 5.556v8.888C0 31.054 6.183 33 12 33s12-1.947 12-5.556v-8.888C24 14.946 17.817 13 12 13zm9.818 14.444c0 1.358-3.825 3.334-9.818 3.334-5.993 0-9.818-1.976-9.818-3.334v-1.157c2.315 1.486 6.137 2.269 9.818 2.269 3.68 0 7.503-.783 9.818-2.27v1.158zm0-4.444c0 1.358-3.825 3.333-9.818 3.333-5.993 0-9.818-1.975-9.818-3.333v-1.158c2.315 1.487 6.137 2.27 9.818 2.27 3.68 0 7.503-.783 9.818-2.27V23zM12 21.889c-5.993 0-9.818-1.976-9.818-3.333 0-1.358 3.825-3.334 9.818-3.334 5.993 0 9.818 1.976 9.818 3.334 0 1.357-3.825 3.333-9.818 3.333z"/>
                      </g>
                    </svg>
                </IconLink>
                <IconLink active={4 === currentRoute} onClick={this.get_elem.bind(this, 4)} to="/user_office/support">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                      <g fill="#3172FD">
                        <circle cx="15.5" cy="23.5" r="1.5"/>
                        <path d="M16 0C7.157 0 0 7.156 0 16c0 8.843 7.156 16 16 16 8.843 0 16-7.156 16-16 0-8.843-7.156-16-16-16zm0 29.5C8.539 29.5 2.5 23.462 2.5 16 2.5 8.539 8.538 2.5 16 2.5c7.461 0 13.5 6.038 13.5 13.5 0 7.461-6.038 13.5-13.5 13.5z"/>
                        <path d="M16 8c-2.757 0-5 2.222-5 4.952 0 .684.56 1.238 1.25 1.238s1.25-.554 1.25-1.238c0-1.365 1.121-2.476 2.5-2.476 1.378 0 2.5 1.111 2.5 2.476 0 1.366-1.122 2.477-2.5 2.477-.69 0-1.25.554-1.25 1.238v3.095c0 .684.56 1.238 1.25 1.238s1.25-.554 1.25-1.238v-2.014c2.154-.551 3.75-2.492 3.75-4.796C21 10.222 18.757 8 16 8z"/>
                      </g>
                    </svg>
                </IconLink>
            </Wrapper>
        );
    }
}

const mapStateToProps = ({UI}) => ({
    currentRoute: UI.get('currentRoute'),
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentRoute(route_index) {
        dispatch(UIActions.setCurrentRoute(route_index));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Nav)




const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
`;

const IconLink = styled(Link)`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    border-bottom: ${props => props.bordered ? '1px solid rgba(250,251,252,.2)' : 'unset'};
    border-right: ${props => props.active ? '3px solid #3172fd' : 'none'};
    background: ${props => props.active ? 'rgba(255,255,255,.2)' : 'unset'};
    height: ${props => props.logo ? '100px' : '40px'};
    opacity: ${props => props.active ? '1': '0.4'};
    margin-bottom: ${props => props.marginBottom || '43px'}
`;
