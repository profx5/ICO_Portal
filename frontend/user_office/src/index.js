import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';
//redux
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducer from './js/reducers'
import thunk from 'redux-thunk'

import './styles/index.css';
import './vendor/bootstrap.css';
import App from './App';
//saga
import createSagaMiddleware from 'redux-saga'
//sagas
import rootSaga from './saga'
//logger
import {createLogger} from 'redux-logger'
//middlewares
const sagaMiddleware = createSagaMiddleware()
const logger = createLogger();

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
//store
const store = createStore(reducer, applyMiddleware(sagaMiddleware, thunk, logger))
sagaMiddleware.run(rootSaga)

const ROOT_NODE = document.getElementById('root');

render(
    <Provider store={store}>
        <App />
    </Provider>
    ,ROOT_NODE
);
