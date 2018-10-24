import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from './Dashboard';
import FindPatient from './FindPatient';
import EditPatient from './EditPatient';
import EnrollPatient from './EnrollPatient';
import SurveyCreate from './Survey';
import Report from './Report';
import Provider from './Provider';
import ProviderEnrollForm from './ProviderEnrollForm';
import CareGroup from './CareGroup';
import CareGroupAdd from './CareGroupAdd';
import NotFound from './NotFound';


class ConsoleRoutes extends Component { 

    render(){
        return(
            <div className="App">

                <Switch>
                  <Route exact path="/admin" render={props => <Dashboard {...this.props}> </Dashboard>} />
                  <Route exact path='/admin/dashboard' render={props => <Dashboard {...this.props}></Dashboard>} />
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

            </div>
        );
    }
    
}

export default (ConsoleRoutes);