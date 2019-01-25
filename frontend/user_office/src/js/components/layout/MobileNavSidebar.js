import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom';
import {media} from 'js/utils/media';

import * as UIActions from 'js/actions/UIActions';


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
                    <Logo to="/user_office" onClick={this.onClickCrossHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 34" width="22">
                            <path fill="#3172FD" fillRule="evenodd" d="M25.7943.4v7.392h-8.64V34h-7.68V7.792h-8.64V.4z"/>
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

const Logo = styled(Link)`
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
