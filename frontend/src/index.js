import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import {Provider} from 'react-redux'

import GlobalStyles from 'GlobalStyles';
import 'index.css';

import App from './App';
import store from 'js/store/index';

import { BrowserRouter } from 'react-router-dom';


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const ROOT_NODE = document.getElementById('root');

render(
    <React.Fragment>
        <GlobalStyles/>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.Fragment>
    ,ROOT_NODE
);
