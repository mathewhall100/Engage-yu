import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from '../components/Dashboard';
import FindPatient from '../components/FindPatient/FindPatient';
import UpdatePatient from '../components/UpdatePatient/UpdatePatient';
import EnrollPatient from '../components/Enroll/EnrollPatient';
import SurveyCreate from '../components/Survey';
import Report from '../components/Report/Report';
import Provider from '../components/Provider/Provider';
import CareGroup from '../components/CareGroup/CareGroup';
import NotFound from '../pages/NotFound';

export default class AdminRoutes extends Component { 

    render(){
        return(
            <Switch>
                <Route exact path="/admin" component={Dashboard} />
                <Route exact path='/admin/dashboard' component={Dashboard} />
                <Route exact path='/admin/find' component={FindPatient} />
                <Route exact path='/admin/enroll' component={EnrollPatient} />
                <Route path='/admin/provider' component={Provider} />
                <Route path='/admin/caregroup' component={CareGroup} />
                <Route exact path='/admin/updatepatient' component={UpdatePatient} />
                <Route exact path='/admin/survey' component={SurveyCreate} />
                <Route exact path='/admin/report' component={Report} />
                <Route path="/notfound" component={NotFound} />
                <Route component={NotFound} />
            </Switch>
        );
    }
    
}
