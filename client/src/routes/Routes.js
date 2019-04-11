import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import * as AuthService from '../services/AuthService'

import Homepage from '../views/Home';
import Admin from '../views/Admin';
import CallBack from '../CallBack';
import NotFound from '../views/NotFound';
import LoginExpired from '../views/LoginExpired';
import NotAuthenticated from '../views/NotAuthenticated';

class Routes extends Component { 
    render(){
        return(
            <Switch>
                <Route exact path="/" render={props => <Homepage {...this.props}> </Homepage>} />
                <Route path='/admin' component={
                    AuthService.isAuthenticated() 
                    ? Admin 
                    : AuthService.authenticationExpired 
                        ? LoginExpired 
                        : NotAuthenticated
                    } 
                />
                {/* <Route path='/admin' component={Admin} /> */}
                <Route path='/callback' render={props => <CallBack {...this.props}></CallBack>} />
                <Route path="/notfound" component={NotFound} />  
                <Route path="/notauthenticated" component={NotAuthenticated} />  
                <Route component={NotFound} />
            </Switch>
        );
    }
    
}
export default (Routes);
