import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Switch, Link} from "react-router-dom";

import Dashboard from './Dashboard';
import EnrollPatient from './EnrollPatient';
import SurveyCreate from './Survey';
import Report from './Report';
import ReportPrepare from '../containers/ReportPrepare';
import NotFound from './NotFound';


class ConsoleRoutes extends Component { 

    render(){

        return(
            <div className="App">

                <Switch>
                  <Route exact path="/admin" render={props => <Dashboard {...this.props}> </Dashboard>} />
                  <Route exact path='/admin/dashboard' render={props => <Dashboard {...this.props}></Dashboard>} />
                  <Route exact path='/admin/enroll' render={props => <EnrollPatient {...this.props}></EnrollPatient>} />
                  <Route path='/admin/survey' render={props => <SurveyCreate {...this.props}></SurveyCreate>} />
                  <Route path='/admin/report/:id' render={props => <Report {...this.props}></Report>} />
                  <Route path='/admin/reportprep/:id' render={props => <ReportPrepare {...this.props}></ReportPrepare>} />
                  <Route path="/notfound" component={NotFound} />
                  <Route component={NotFound} />
              </Switch>

            </div>
        );
    }
    
}


export default (ConsoleRoutes);