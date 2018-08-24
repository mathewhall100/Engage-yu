import React, { Component } from "react";
import { withRouter, Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';

import "./App.css";

import Routes from './components/Routes';
import history from './history';



const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

class App extends Component {
  render() {
    
    return (

      <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={history}>
          <Routes/>
        </Router>
      </Provider>
    );
  }
}

export default withRouter(App);
