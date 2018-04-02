import {
    OPEN_MODAL_FOR_TRANSFER,
    CLOSE_MODAL_FOR_TRANSFER,
} from '../types/ModalWindowTypes'

export class ModalAction {
    static closeModal = () => ({type: CLOSE_MODAL_FOR_TRANSFER})

    static openModal = () => ({type: OPEN_MODAL_FOR_TRANSFER})
}

