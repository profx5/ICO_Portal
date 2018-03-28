import {
    SHOW_INVEST_FORM,
    HIDE_INVEST_FORM,
} from '../types/InvestTypes'

import {Map} from 'immutable'

const initialState = Map({
    showInvestForm: false
})

export function InvestReducer (state=initialState, {type, payload, ...action}) {
    switch(type) {
        case SHOW_INVEST_FORM: {
            return state.set("showInvestForm", true)
        }
        case HIDE_INVEST_FORM: {
            return state.set("showInvestForm", false)
           
        }
        default: {
            return state
        }

    }
}
