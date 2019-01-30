import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Homepage from './components/Homepage';
import Admin from './components/Admin';
import Callback from './components/Callback';
import NotFound from './NotFound';

class Routes extends Component { 
    render(){
        return(
            <div className="App">
                <Switch>
                    <Route exact path="/" render={props => <Homepage {...this.props}> </Homepage>} />
                    <Route path='/admin' render={props => <Admin {...this.props}></Admin>} />
                    <Route path='/callback' render={props => <Callback></Callback>} />
                    <Route path="/notfound" component={NotFound} />  
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
    
}
export default (Routes);
