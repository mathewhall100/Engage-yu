import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import App from "./App";
// import { configureStore } from './store'
// import { persistStore } from 'redux-persist'
//import { PersistGate } from 'redux-persist/lib/integration/react'

// const { store, persistor } = configureStore()



ReactDOM.render(
    <Provider store={store}>
        {/* <PersistGate persistor={persistStore(store)}> */}
            <BrowserRouter>
                <App />
            </BrowserRouter>
        {/* </PersistGate> */}
    </Provider>
    
, document.getElementById('root'));

registerServiceWorker();

