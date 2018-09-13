import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import { bindActionCreators } from 'redux';
import Dashboard from './PatientDashboard';
import PatientReport from './PatientReport';
import PhysicianInfo from './PhysicianInfo';
import AfterSurvey from './AfterSurvey';
import NotFound from '../NotFound';
import { fetchPatientData } from '../../actions/PatientAction';

class PatientConsoleRoutes extends Component { 
    componentDidMount() {
        this.props.fetchPatientData();
    }

    render(){
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
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchPatientData
    }, dispatch);
}

export default connect(null, mapDispatchToProps) (PatientConsoleRoutes)