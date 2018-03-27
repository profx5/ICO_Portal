import {
    SHOW_INVEST_FORM,
    HIDE_INVEST_FORM,
} from '../types/InvestTypes'

const initialState = {
    showInvestForm: false
}

export function InvestReducer (state=initialState, {type, payload, ...action}) {
    switch(type) {
        case SHOW_INVEST_FORM: {
            return {
                ...state,
                showInvestForm: true
            }
        }
        case HIDE_INVEST_FORM: {
            return {
                ...state,
                showInvestForm: false
            }
        }
        default: {
            return state
        }

    }
}
