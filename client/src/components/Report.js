import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import ReportPatientDetails from '../containers/ReportPatientDetails';
import ReportDisplayData from '../containers/ReportDisplayData';
import ReportListSurveys from '../containers/ReportListSurveys';

import { selectConsoleTitle } from '../actions/index';
import { fetchPatientData } from '../actions/index';


class Report extends Component {  
    
    componentDidMount() {

        this.props.selectConsoleTitle({title: "Report"});

        const param = this.props.match.params.id
        const patient = param.slice(0, param.indexOf("&"))
        this.props.fetchPatientData(patient);

        this.state.episode = param.slice(-param.indexOf("&"))
        //console.log("params: ", param)
        //console.log("patient: ", patient)
        //console.log("episode: ", episode)
    }

    state = {
        episode: ""
    }

    render () {
        
        return (

            <div>

                <ReportPatientDetails />

                <br />
                
                <ReportDisplayData episode={this.state.episode}/> 

                <br />

                <ReportListSurveys />

            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, fetchPatientData}, dispatch);
}

function mapStateToProps({auth}){
    //console.log(auth);
    return (auth);
}

Report = connect(mapStateToProps, mapDispatchToProps) (Report)
Report = withRouter(Report)
export default Report;
