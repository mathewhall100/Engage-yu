import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TestNav from "./components/testComponentsMH/testNav";
import TestRoutes from "./components/testComponentsMH/testRoutes"
import QuestionRoutes from './components/testComponentsMH/questionRoutes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <br />
        <br />

        <TestNav />  

        <br />
        <br />

        <p> ----------------------- </p>
        <TestRoutes />  
        <p> ----------------------- </p>

        <br />
        <br />

        <p> ----------------------- </p>
        <QuestionRoutes />  
        <p> ----------------------- </p>

      </div>
    );
  }
}

export default App;
