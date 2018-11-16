import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import {Provider} from 'react-redux'

import './global-styles';
import './index.css';

import App from './App';
import store from './js/store/index';

import { BrowserRouter } from 'react-router-dom';


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const ROOT_NODE = document.getElementById('root');

render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    ,ROOT_NODE
);
