import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from '../components/Dashboard';
import FindPatient from '../components/FindPatient';
import EditPatient from '../components/EditPatient';
import EnrollPatient from '../components/EnrollPatient';
import SurveyCreate from '../components/Survey';
import Report from '../components/Report';
import Provider from '../components/Provider';
import ProviderEnrollForm from '../components/ProviderEnrollForm';
import CareGroup from '../components/CareGroup';
import CareGroupAdd from '../components/CareGroupAdd';
import NotFound from '../pages/NotFound';


class ConsoleRoutes extends Component { 

    render(){
        return(
            <Switch>
                <Route exact path="/admin" component={Dashboard} />
                <Route exact path='/admin/dashboard' component={Dashboard} />
                <Route exact path='/admin/find' render={props => <FindPatient {...this.props}></FindPatient>} />
                <Route exact path='/admin/enroll' render={props => <EnrollPatient {...this.props}></EnrollPatient>} />
                <Route exact path='/admin/provider' render={props => <Provider {...this.props}> </Provider>} />
                <Route exact path='/admin/providerenroll' render={props => <ProviderEnrollForm {...this.props}></ProviderEnrollForm>} />
                <Route exact path='/admin/caregroup' render={props => <CareGroup {...this.props}></CareGroup>} />
                <Route exact path='/admin/caregroupadd' render={props => <CareGroupAdd {...this.props}></CareGroupAdd>} />
                <Route path='/admin/survey/:id' render={props => <SurveyCreate {...this.props}></SurveyCreate>} />
                <Route path='/admin/report/:id' render={props => <Report {...this.props}></Report>} />
                <Route path='/admin/updatepatient/:id' render={props => <EditPatient {...this.props}></EditPatient>} />
                <Route path="/notfound" component={NotFound} />
                <Route component={NotFound} />
            </Switch>
        );
    }
    
}

export default (ConsoleRoutes);