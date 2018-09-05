import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import { login, logout, handleAuthentication, isAuthenticated, getProfile } from '../actions/AuthAction';

import Dashboard from './Dashboard';
import EnrollPatient from './EnrollPatient';
import NotFound from './NotFound';


class ConsoleRoutes extends Component { 
    componentDidMount(){
        this.props.isAuthenticated();
    }

    render(){
        const {authenticated} = this.props
        return(
            <div className="App">

                <Switch>
                  <Route exact path="/admin" render={props => <Dashboard {...this.props}> </Dashboard>} />
                  <Route exact path='/admin/dashboard' render={props => <Dashboard {...this.props}></Dashboard>} />
                  <Route exact path='/admin/enroll' render={props => <EnrollPatient {...this.props}></EnrollPatient>} />
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


export default connect(mapStateToProps, { login, logout, handleAuthentication, isAuthenticated, getProfile},null, {pure: false})(ConsoleRoutes);