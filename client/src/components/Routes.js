import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Switch, Link} from "react-router-dom";
// import TestNav from "./testComponentsMH/testNav";
// import TestRoutes from "./testComponentsMH/testRoutes"
// import QuestionRoutes from './testComponentsMH/questionRoutes'
import Homepage from './Homepage';
import Admin from './Admin';
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

                <Switch>
                    <Route path='/admin' render={props => <Admin {...this.props}></Admin>} />
                    <Route exact path='/callback' render={props => <Callback></Callback>} />
                    <Route exact path="/" render={props => <Homepage {...this.props}> </Homepage>} />
                    <Route exact path="/sk" render={props => <SK {...this.props}></SK>} />
                    <Route path="/notfound" component={NotFound} />
                    <Route component={NotFound} />
                </Switch>

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