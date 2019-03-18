import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from '../Dashboard/Dashboard';
import FindPatient from '../Patient/FindPatient';
import UpdatePatient from '../Patient/UpdatePatient';
import EnrollPatient from '../Patient/EnrollPatient';
import SurveyCreate from '../Survey/Survey';
import Report from '../Report/Report';
import Provider from '../Provider/Provider';
import CareGroup from '../CareGroup/CareGroup';
import NotFound from '../Pages/NotFound';

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
                <Route path='/admin/report' component={Report} />
                <Route path="/notfound" component={NotFound} />
                <Route component={NotFound} />
            </Switch>
        );
    }
    
}
