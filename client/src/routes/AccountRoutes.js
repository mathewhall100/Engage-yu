import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Account from '../components/Account/Account';
import NotFound from '../views/NotFound';

export default class AccountRoutes extends Component { 

    render(){
        return(
            <Switch>
                <Route exact path="/account" component={Account} />
                <Route component={NotFound} />
            </Switch>
        );
    }
    
}