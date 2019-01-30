import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import createAppStore from './store'
import { PersistGate } from 'redux-persist/es/integration/react'
import App from "./App";

const { persistor, store } = createAppStore()
const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <PersistGate persistor={persistor} loading={<div>Loading...</div>} >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
    
, document.getElementById('root'));

registerServiceWorker();