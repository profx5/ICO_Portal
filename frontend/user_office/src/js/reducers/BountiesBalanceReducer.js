import { createReducer } from 'redux-act';
import * as actions from './../actions/BountiesBalanceActions';
import {Map} from 'immutable'


const initialState = Map({
    isBountiesBalanceLoading: false,
    currency: null,
    balance: null,
    nextStage: null,
    bounties: Map({
        currentValue: null,
        thresholdValue: null,
        canTransfer: false
    }),
    transfer: Map({
        success: null,
        error: null,
    }),
    transferIsLoading: false
});


export const BountiesBalanceReducer = createReducer({
    [actions.getBountiesRequest]: (state = initialState) => state.set('isBountiesBalanceLoading', true),
    [actions.getBountiesFailed]: (state = initialState) => state.set('isBountiesBalanceLoading', false),
    [actions.getBountiesSuccess]: (state = initialState, payload) => {
        return state
            .get('bounties')
            .merge({...payload})
            .set('isBountiesBalanceLoading', false)
    },

    [actions.postTransferRequest]: (state = initialState) => state.set('transferIsLoading', true),
    [actions.postTransferFailed]: (state = initialState) => state.set('transferIsLoading', false),
    [actions.postTransferSuccess]: (state = initialState, payload) => {
        return state
            .set('transferIsLoading', false)
            .get('transfer')
            .merge({...payload})
    }
}, initialState)


