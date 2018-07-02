import {createStore, applyMiddleware} from 'redux'
import Immutable from 'immutable'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './../../saga'
import {createLogger} from 'redux-logger'

import reducer from './../reducers'


const sagaMiddleware = createSagaMiddleware()
const logger = createLogger({

    stateTransformer: (state) => {
        let newState = {};

        for (var i of Object.keys(state)) {
            if (Immutable.Iterable.isIterable(state[i])) {
                newState[i] = state[i].toJS();
            } else {
                newState[i] = state[i];
            }
        };

        return newState;
    }
});


export const store = createStore(
    reducer, 
    applyMiddleware(sagaMiddleware, logger))

sagaMiddleware.run(rootSaga)

export default store;