import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Homepage from '../pages/Homepage';
import Admin from '../pages/Admin';
import NotFound from '../pages/NotFound';

class Routes extends Component { 
    render(){
        return(
            <Switch>
                <Route exact path="/" render={props => <Homepage {...this.props}> </Homepage>} />
                <Route path='/admin' render={props => <Admin {...this.props}></Admin>} />
                <Route path="/notfound" component={NotFound} />  
                <Route component={NotFound} />
            </Switch>
        );
    }
    
}
export default (Routes);
