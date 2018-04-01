import {
    OPEN_MODAL_FOR_TRANSFER,
    CLOSE_MODAL_FOR_TRANSFER,
} from '../types/ModalWindowTypes'

import {Map} from 'immutable'

const initialState = Map({
    isModalOpened: false
})

export function ModalWindowReducer(state=initialState, {type, ...action}) {
    switch(type) {
        case OPEN_MODAL_FOR_TRANSFER: {
            return state.set('isModalOpened', true)
        }
        case CLOSE_MODAL_FOR_TRANSFER: {
            return state.set('isModalOpened', false)
        }
        default: {
            return state
        }
    }
}
