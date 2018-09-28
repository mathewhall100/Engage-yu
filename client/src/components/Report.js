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

        this.props.selectConsoleTitle({title: "Report Page"});
        const id = this.props.match.params.id
        //console.log("params: ", id)
        this.props.fetchPatientData(id);
    }

    render () {
        
        return (

            <div>

                <ReportPatientDetails />

                <br />
                
                <ReportDisplayData /> 

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
    console.log(auth);
    return (auth);
}

Report = connect(mapStateToProps, mapDispatchToProps) (Report)
Report = withRouter(Report)
export default Report;
