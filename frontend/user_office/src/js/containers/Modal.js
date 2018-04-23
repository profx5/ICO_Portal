import React, {Component, Children} from 'react'
import {createPortal} from 'react-dom'
import {connect} from 'react-redux'
import {func} from 'prop-types'
import {ModalAction} from '../actions/ModalWindowAction'

const body = document.querySelector('body')

class Modal extends Component {
    static propTypes = {
        children: func.isRequired
    }
    constructor(props) {
        super(props)
        this.nodeElement = document.createElement('div')
        this.nodeElement.setAttribute("id", "portal");
    }

    componentDidMount() {
        body.appendChild(this.nodeElement)
    }

    componentWillUnmount() {
        body.removeChild(this.nodeElement)
    }
    
    render() {
        const {children, closeModal, isModalOpened} = this.props
        const childrenWidthProps = children.call(null, closeModal)

        return isModalOpened && createPortal(
            <div className='overlay-wrapper in-middle'>
                <div className='modal-wrapper'>
                    {Children.only(childrenWidthProps)}
                </div>
            </div>
        , this.nodeElement)
    }
}

const mapStateToProps = ({modals}) => ({
    isModalOpened: modals.get('isModalOpened')
})

const mapDispatchToProps = (dispatch) => ({
    closeModal() {
        dispatch( ModalAction.closeModal() )
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
