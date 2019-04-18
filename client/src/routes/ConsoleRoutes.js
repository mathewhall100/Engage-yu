import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from '../components/Dashboard/Dashboard';
import Patient from '../components/Patient/Patient';
import Survey from '../components/Survey/Survey';
import Report from '../components/Report/Report';
import Provider from '../components/Provider/Provider';
import CareGroup from '../components/CareGroup/CareGroup';
import NotFound from '../components/UI/notFound';

export default class AdminRoutes extends Component { 

    render(){
        return(
            <Switch>
                <Route exact path="/admin" component={Dashboard} />
                <Route exact path='/admin/dashboard' component={Dashboard} />
                <Route path='/admin/patient' component={Patient} />  
                <Route exact path='/admin/survey' component={Survey} />
                <Route path='/admin/report/:Id' component={Report} />                
                <Route exact path='/admin/questions' component={NotFound} />
                <Route path='/admin/provider' component={Provider} />
                <Route path='/admin/caregroup' component={CareGroup} />
                <Route exact path='/admin/delete' component={NotFound} />
                <Route exact path='/admin/settings' component={NotFound} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}
