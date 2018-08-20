import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import logo from "./logo.svg";
import "./App.css";
import TestNav from "./components/testComponentsMH/testNav";
import TestRoutes from "./components/testComponentsMH/testRoutes"
import QuestionRoutes from './components/testComponentsMH/questionRoutes'
import Main from './components/Main';
import Secret from './components/Secret';
import NotFound from './components/NotFound';
import Callback from './components/Callback';


const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

class App extends Component {
  render() {
    
    return (

      <Provider store={createStoreWithMiddleware(reducers)}>
        <Router>
          <div className="App">
                <div className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h2>Welcome to React, {this.props.name}</h2>
                </div>
            <Switch>
                <Route exact path='/callback' render={props => <Callback></Callback> } />
                <Route exact path='/secret' render={props => <Secret {...this.props}> </Secret>} />
                <Route exact path="/" render={props => <Main {...this.props}> </Main>  } />
                <Route exact path="/notfound" component={NotFound} />
                <Route component={NotFound} />
            </Switch>
            <TestNav />
            <TestRoutes />
            <QuestionRoutes />
            <TestRoutes />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
