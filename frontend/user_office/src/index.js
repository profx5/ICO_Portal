import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';

import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducer from './js/reducers'
import Immutable from 'immutable'

import './styles/index.css';
import App from './App';

import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
import {createLogger} from 'redux-logger'

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

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger))
sagaMiddleware.run(rootSaga)

const ROOT_NODE = document.getElementById('root');

render(
    <Provider store={store}>
        <App />
    </Provider>
    ,ROOT_NODE
);
