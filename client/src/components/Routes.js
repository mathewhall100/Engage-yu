import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Switch, Redirect, Link } from "react-router-dom";
import logo from "../logo.svg";
import TestNav from "./testComponentsMH/testNav";
import TestRoutes from "./testComponentsMH/testRoutes"
import QuestionRoutes from './testComponentsMH/questionRoutes'
import Main from './Main';
import Secret from './Secret';
import NotFound from './NotFound';
import Callback from './Callback';
import { login, logout, handleAuthentication, isAuthenticated, getProfile } from '../actions/AuthAction'

class Routes extends Component { 
    componentDidMount(){
        this.props.isAuthenticated()
    }
    AuthenticatedRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            this.props.isAuthenticated === true ?
                <Component {...props} />
                :
                <Redirect to='/' />
        )} />
    );

    render(){
        const {authenticated} = this.props
        return(
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React, {this.props.name}</h2>
                </div>
                <Switch>
                    <Route exact path='/callback' render={props => <Callback></Callback>} />
                    <Route exact path='/secret' render={props => <Secret {...this.props}></Secret>} />
                    <Route exact path="/" render={props => <Main {...this.props}> </Main>} />
                    <Route exact path="/notfound" component={NotFound} />
                    <Route component={NotFound} />
                </Switch>
                <TestNav />
                <TestRoutes />
                <QuestionRoutes />
                <TestRoutes />
                <hr/>
                {authenticated ? <button onClick={this.props.logout}>Logout</button> : null}
                
            </div>
        );
    }
    
}

const mapStateToProps = (state) => {
    console.log("State in main : ", state);
    const { authenticated, profile } = state.auth
    return {
        authenticated, profile
    }
}


export default connect(mapStateToProps, { login, logout, handleAuthentication, isAuthenticated, getProfile })(Routes);