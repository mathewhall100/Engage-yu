import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { login, logout, handleAuthentication, isAuthenticated, getProfile } from '../actions/AuthAction';

import Homepage from './Homepage';
import Admin from './Admin';
import Callback from './Callback';
import NotFound from './NotFound';

import SK from './SKBranch/patients';
//import MH from './MHBranch/tests'


class Routes extends Component { 
    componentDidMount(){
        this.props.isAuthenticated();
    }

    render(){
        const {authenticated} = this.props
        return(
            <div className="App">

                <Switch>
                    <Route exact path="/" render={props => <Homepage {...this.props}> </Homepage>} />    
                    <Route path='/admin' render={props => <Admin {...this.props}></Admin>} />
                    <Route exact path='/callback' render={props => <Callback></Callback>} />
                    <Route exact path="/sk" render={props => <SK {...this.props}></SK>} />
                    {/* <Route exact path="/mh" render={props => <MH {...this.props}></MH>} /> */}
                    <Route path="/notfound" component={NotFound} />
                    <Route component={NotFound} />
                </Switch>

            </div>
        );
    }
    
}

function mapStateToProps(state) {
    //console.log("Route : State in main : ", state);
    const { authenticated, profile } = state.auth;
    return {
        authenticated, profile
    }
}


export default connect(mapStateToProps, { login, logout, handleAuthentication, isAuthenticated, getProfile},null, {pure: false})(Routes);