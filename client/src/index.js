import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import reducers from './reducers';
import { connect } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import "./index.css";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';


const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </BrowserRouter>
    </Provider>
    
, document.getElementById('root'));
registerServiceWorker();