import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducer from './js/reducers'
import Immutable from 'immutable'

import './global-styles';
import './index.css';

import App from './App';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
import {createLogger} from 'redux-logger'

import store from './js/store/index';

const ROOT_NODE = document.getElementById('root');

render(
    <Provider store={store}>
        <App />
    </Provider>
    ,ROOT_NODE
);
