import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import * as AuthService from '../services/AuthService';
import Login from '../views/Login';
import Admin from '../views/Admin';
import CallBack from '../CallBack';
import LoginExpired from '../views/LoginExpired';
import NotAuthenticated from '../views/NotAuthenticated';

class Routes extends Component { 
    render(){
        return(
            <Switch>
                <Route exact path="/" render={props => <Login {...this.props}> </Login>} />
                <Route path="/login" render={props => <Login {...this.props}> </Login>} />

                <Route exact path="/account" render={
                    AuthService.isAuthenticated() 
                    ? props => <Admin account={true}></Admin>
                    : AuthService.authenticationNone()
                        ? props => <NotAuthenticated {...this.props}></NotAuthenticated>
                        : AuthService.authenticationExpired()
                            ? props => <LoginExpired {...this.props}></LoginExpired> 
                            : props => <NotAuthenticated {...this.props}></NotAuthenticated>
                } />

                <Route path='/admin' component={
                    AuthService.isAuthenticated() 
                    ? Admin 
                    : AuthService.authenticationNone()
                        ? NotAuthenticated
                        : AuthService.authenticationExpired()
                            ? LoginExpired 
                            : NotAuthenticated
                } />

                <Route path='/callback' render={props => <CallBack {...this.props}></CallBack>} /> 
                <Route component={Login} />
            </Switch>
        );
    }
    
}
export default (Routes);
