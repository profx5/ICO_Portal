import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'
import {withRouter} from 'react-router';
import {media} from './../../utils/media';

import * as UIActions from './../../actions/UIActions';


class MobileNavSidebar extends React.Component {

    onClickCrossHandler = () => {
        this.props.closeMobileSidebar();
    }

    render() {
        return (
            <Sidebar>
                <Header>
                    <Cross onClick={this.onClickCrossHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M505.943 6.058c-8.077-8.077-21.172-8.077-29.249 0L6.058 476.693c-8.077 8.077-8.077 21.172 0 29.249 4.038 4.04 9.332 6.058 14.625 6.058 5.293 0 10.586-2.019 14.625-6.059L505.943 35.306c8.076-8.076 8.076-21.171 0-29.248z"/>
                            <path d="M505.942 476.694L35.306 6.059c-8.076-8.077-21.172-8.077-29.248 0-8.077 8.076-8.077 21.171 0 29.248l470.636 470.636c4.038 4.039 9.332 6.058 14.625 6.058 5.293 0 10.587-2.019 14.624-6.057 8.075-8.078 8.075-21.173-.001-29.25z"/>
                        </svg>
                    </Cross>
                    <Logo>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                            <g fill="#3172FD" fillRule="nonzero">
                                <path d="M20 8.889c2.689 0 4.889-2 4.889-4.445C24.889 2 22.689 0 20 0s-4.889 2-4.889 4.444c0 2.445 2.2 4.445 4.889 4.445z"/>
                                <path d="M27.097.889c0 .255.716 1.828.716 4.052 0 1.51-.326 2.825-.977 3.945.724.456 1.577 1.37 2.08 1.84 2.41 2.4 3.614 5.52 3.614 9.119s-1.205 6.718-3.614 9.118c-2.41 2.399-5.302 3.599-8.916 3.599-3.614 0-6.506-1.2-8.916-3.6-2.41-2.399-3.614-5.518-3.614-9.117 0-3.6 1.205-6.719 3.614-9.118.482-.48 1.576-1.267 1.876-1.461-.977-1.73-1.465-3.261-1.465-4.595 0-1.333.322-2.594.965-3.782-2.41.96-4.75 2.4-6.677 4.319C1.928 9.287 0 14.086 0 19.845c0 5.518 1.928 10.317 5.783 14.396C9.64 38.081 14.458 40 20 40s10.361-1.92 14.217-5.759C38.072 30.402 40 25.603 40 19.845c0-5.52-1.928-10.318-5.783-14.157-1.956-1.814-4.535-3.757-7.12-4.8z"/>
                            </g>
                        </svg>
                    </Logo>
                </Header>
                {this.props.children}
            </Sidebar>
        );
    }
}


const mapStateToProps = ({UI}) => ({})

const mapDispatchToProps = (dispatch) => ({
    closeMobileSidebar(payload) {
        dispatch(UIActions.closeMobileSidebar(payload))
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MobileNavSidebar));

const Sidebar = styled.aside`
    background: white;
    width: 226px;
    height: 100%;
    border-right: 1px solid #e6e8f1;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    ${media.smPlus} {
        display: none;
    }
    &:before {
        content: '';
        display: block;
        height: 1000px;
        width: 1000px;
        position: absolute;
        top: 0;
        left: 226px;
        background: rgb(1, 7, 29, .3);
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 2px solid rgba(230, 232, 242, .2);
    margin-bottom: 14px;
    padding: 16px 0;
    max-height: 63px;
`;

const Logo = styled.div`
    svg {
        height: 35px;
        width: auto;
    }
`;

const Cross = styled.div`
    padding: 0 20px;
    margin-right: 20px;
    position: relative;
    &:after {
        content: '';
        display: block;
        width: 1px;
        height: 120%;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(151, 151, 151, .2);;
    }
    svg {
        height: 26px;
        width: auto;
    }
`;
