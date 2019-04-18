import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from '../components/Login/LoginForm';
import LoginEmailNotVerified from '../components/Login/LoginEmailNotVerified';
import LoginPwdNotVerified from '../components/Login/LoginPwdNotVerified';
import LoginPwdReset from '../components/Login/LoginPwdReset';
import LoginNotFound from '../components/Login/LoginNotFound';


export default class LoginRoutes extends Component { 

    render(){
        return(
            <Switch>
                <Route exact path='/' component={LoginForm} />
                <Route exact path='/login' component={LoginForm} />
                <Route exact path='/login/form' component={LoginForm} />
                <Route exact path='/login/notverified-email' component={LoginEmailNotVerified} />
                <Route exact path='/login/notverified-pwd' component={LoginPwdNotVerified} />
                <Route exact path='/login/pwdreset' component={LoginPwdReset} />
                <Route component={LoginNotFound} />
            </Switch>
        );
    } 
}

