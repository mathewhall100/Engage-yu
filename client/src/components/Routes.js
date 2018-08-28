import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Switch, Link} from "react-router-dom";
// import TestNav from "./testComponentsMH/testNav";
// import TestRoutes from "./testComponentsMH/testRoutes"
// import QuestionRoutes from './testComponentsMH/questionRoutes'
import Homepage from './Homepage';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import Callback from './Callback';
import SK from './SKBranch/patients';
import { login, logout, handleAuthentication, isAuthenticated, getProfile } from '../actions/AuthAction';

class Routes extends Component { 
    componentDidMount(){
        this.props.isAuthenticated();
    }

    render(){
        const {authenticated} = this.props
        return(
            <div className="App">

                <div className="App-header">
                    <h1>Engage-Yu: navbar</h1>
                    {authenticated ? <button onClick={this.props.logout}>Logout</button> : null}
                    <button><Link to='/'>Home </Link></button>
                </div>

                <Switch>
                    <Route exact path='/callback' render={props => <Callback></Callback>} />
                    <Route exact path='/dashboard' render={props => <Dashboard {...this.props}></Dashboard>} />
                    <Route exact path="/" render={props => <Homepage {...this.props}> </Homepage>} />
                    <Route exact path="/sk" render={props => <SK {...this.props}></SK>} />
                    <Route path="/notfound" component={NotFound} />
                    <Route component={NotFound} />
                </Switch>

                {/* <TestNav />
                <TestRoutes />
                <QuestionRoutes /> */}
                
            </div>
        );
    }
    
}

function mapStateToProps(state) {
    console.log("Route : State in main : ", state);
    const { authenticated, profile } = state.auth;
    return {
        authenticated, profile
    }
}


export default connect(mapStateToProps, { login, logout, handleAuthentication, isAuthenticated, getProfile},null, {pure: false})(Routes);