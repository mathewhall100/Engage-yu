import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from "./registerServiceWorker";
//import Auth from './Auth';
import Auth from './services/auth0';

// ReactDOM.render(<App />, document.getElementById("root"));
// registerServiceWorker();

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));
