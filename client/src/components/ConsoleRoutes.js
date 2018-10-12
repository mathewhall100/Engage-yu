import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from './Dashboard';
import FindPatient from './FindPatient';
import EditPatient from './EditPatient';
import EnrollPatient from './EnrollPatient';
import SurveyCreate from './Survey';
import Report from './Report';
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