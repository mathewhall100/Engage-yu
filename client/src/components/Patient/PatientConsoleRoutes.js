import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Switch, Link} from "react-router-dom";

import Dashboard from './PatientDashboard';
import PatientReport from './PatientReport';
import PhysicianInfo from './PhysicianInfo';
import AfterSurvey from './AfterSurvey';
import NotFound from '../NotFound';


class PatientConsoleRoutes extends Component { 

    render(){
        const {authenticated} = this.props
        return(
            <div className="App">

                <Switch>
                  <Route exact path="/patient" render={props => <Dashboard {...this.props}> </Dashboard>} />
                  <Route exact path='/patient/dashboard' render={props => <Dashboard {...this.props}></Dashboard>} />

                  <Route exact path='/patient/complete' render={props => <AfterSurvey {...this.props}></AfterSurvey>} />
                  <Route exact path='/patient/physician' render={props => <PhysicianInfo {...this.props}></PhysicianInfo>} />
                  <Route exact path='/patient/report' render={props => <PatientReport {...this.props}></PatientReport>} />

                  <Route path="/notfound" component={NotFound} />
                  <Route component={NotFound} />
              </Switch>

            </div>
        );
    }
    
}


export default (PatientConsoleRoutes);