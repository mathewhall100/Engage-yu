import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import * as AuthService from '../services/AuthService'

import Homepage from '../views/Home';
import Account from '../components/Account/Account';
import Admin from '../views/Admin';
import CallBack from '../CallBack';
import EmailNotVerified from '../views/EmailNotVerified';
import TempPwdChange from '../views/TempPwdChange';
import NotFound from '../views/NotFound';
import LoginExpired from '../views/LoginExpired';
import NotAuthenticated from '../views/NotAuthenticated';

class Routes extends Component { 
    render(){
        return(
            <Switch>
                <Route exact path="/" render={props => <Homepage {...this.props}> </Homepage>} />
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
                }  />
                <Route path="/emailnotverified" component={EmailNotVerified} />
                <Route path="/temppwdchange" component={TempPwdChange} />
                <Route path='/callback' render={props => <CallBack {...this.props}></CallBack>} />
                <Route path="/notfound" component={NotFound} />  
                <Route path="/notauthenticated" component={NotAuthenticated} />  
                <Route component={NotFound} />
            </Switch>
        );
    }
    
}
export default (Routes);
