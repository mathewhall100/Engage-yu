import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import Card from '@material-ui/core/Card';

import SurveyForm from './SurveyForm'
import { selectConsoleTitle, fetchSurveyQuestions, fetchReportPatientData } from '../../actions'
import SurveyPatientDetails from './SurveyPatientDetails';

class Survey extends Component {  

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Create New Diary Card"});
        this.props.fetchSurveyQuestions()

        let patientInfo, patientData
        const url = `/api/patient_info/find/${localStorage.getItem("patient_id")}`
        axios.get(url)
        .then( res => {
            patientInfo = res.data
            axios.get(`/api/patient_data/${patientInfo.patient_data_id}`)
            .then( res => {
                patientData = res.data
                console.log("axios patientInfo: ", patientInfo)
                console.log("axios patientData: ", patientData)
                this.props.fetchReportPatientData(patientInfo, patientData)
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
        })  
    };

    render () {

        return (
            <React.Fragment>

                <SurveyPatientDetails /> <br />

                <Card style={{padding: "40px"}}>
                    <SurveyForm />
                </Card>

            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, fetchReportPatientData, fetchSurveyQuestions }, dispatch);
}

function mapStateToProps({auth}){
    //console.log(auth);
    return (auth);
}

Survey = connect(mapStateToProps, mapDispatchToProps)(Survey)
Survey = withRouter(Survey)
export default Survey;