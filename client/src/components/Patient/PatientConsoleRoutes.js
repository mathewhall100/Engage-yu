import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import Dashboard from './PatientDashboard';
import propTypes from 'prop-types';
import PatientReport from './PatientReport';
import PhysicianInfo from './PhysicianInfo';
import AfterSurvey from './AfterSurvey';
import HistorySurvey from './HistorySurvey';
import NotFound from '../NotFound';
import { fetchPatientData } from '../../actions/PatientAction';

import history from '../../history';

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
                    <Route exact path='/patient/history/:episode/:entry' render={props => <Dashboard {...this.props}></Dashboard>} />
                    <Route  path='/patient/complete' render={props => <AfterSurvey {...this.props}></AfterSurvey>} />
                    <Route  path='/patient/physician' render={props => <PhysicianInfo {...this.props}></PhysicianInfo>} />
                    <Route  path='/patient/history' render={props => <HistorySurvey {...this.props}></HistorySurvey>} />
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
PatientConsoleRoutes.propTypes = {
    history: propTypes.shape({
        push: propTypes.func.isRequired
        }).isRequired,
}
export default withRouter(connect(null, mapDispatchToProps) (PatientConsoleRoutes))