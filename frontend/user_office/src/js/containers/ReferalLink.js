import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getIn, Map} from 'immutable'
//actions
import {Referal} from '../actions/ReferalsAction'
//components
import Button from '../components/Button'

class ReferalLink extends Component {
    state = {
        urlSting: this.props.referal_link || this.props.statusMessage
    }

    static defaultProps = {
        statusMessage: 'click to get referal link'
    }

    componentDidUpdate(prevProps, prevState) {
        const {isLinkLoading} = this.props
        const {urlSting} = this.state

        if( !isLinkLoading && prevProps.isLinkLoading  ) {
            this.setState((state) => ({ ...state, urlSting: "The referal link dont ready yet" }))
        }
    }

    render() {

        const {
            getReferalLinkRequest,
            isLinkLoading,
            referal_link
         } = this.props

        const {urlSting} = this.state

        return (
            <div>
                <Button 
                    text='get referal link' 
                    primary={true}
                    onClick={getReferalLinkRequest}
                />
                <div>
                    <span>{ isLinkLoading ? ' loading ... ' : urlSting }</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({referals}) => ({
    referal_link: referals.getIn(['link', 'url']),
    isLinkLoading: referals.getIn(['link', 'isLoading'])
})

const mapDispatchToProps = (dispatch) => ({
    getReferalLinkRequest() {
        dispatch(Referal.getReferalLinkRequest())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReferalLink)
