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
    render(){
        console.log("routes props : " , this.props);
        return(
            <div className="App">

                <Switch>
                    <Route exact path="/" render={props => <Homepage {...this.props}> </Homepage>} />    
                    <Route path='/admin' render={props => <Admin {...this.props}></Admin>} />
                    <Route exact path='/callback' render={props => <Callback></Callback>} />
                    <Route exact path="/sk" render={props => <SK {...this.props} title='Dashboard' ></SK>} />
                    <Route exact path='/sk/survey' render={props => <SK {...this.props}  title='Survey' ></SK>} />
                    <Route exact path='/sk/physician' render={props => <SK {...this.props} title='Physician' ></SK>} />
                    <Route path="/notfound" component={NotFound} />
                    <Route component={NotFound} />
                </Switch>

            </div>
        );
    }
    
}
export default (Routes);
