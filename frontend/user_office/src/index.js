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
//store
const store = createStore(reducer, applyMiddleware(thunk))

const ROOT_NODE = document.getElementById('root');

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

render(
    <Provider store={store}>
        <App />
    </Provider>
    ,ROOT_NODE
);
