import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import { selectConsoleTitle, fetchSurveyQuestions, fetchReportPatientData, providerAction } from '../../actions'
import SurveyPatientDetails from './SurveyPatientDetails';
import SurveyForm from './SurveyForm'


class Survey extends Component {  

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Create New Diary Card"});

        let patientInfo, patientData
        let url = `/api/patient_info/find/${localStorage.getItem("patient_id")}`
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

        let defaultQuestion, customQuestions
        url = `/api/question_default`
        axios.get(url)
        .then( res => {
            defaultQuestion = res.data;
            axios.get('/api/question_custom')
            .then( res => {
                customQuestions = res.data
                console.log("axios defaultQuestion: ", defaultQuestion)
                console.log("axios customQuestions: ", customQuestions)
                this.props.fetchSurveyQuestions(defaultQuestion, customQuestions)
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
        })

        let provider
        url = `/api/provider/${localStorage.getItem("provider_id")}`
        axios.get(url)
        .then(res => {
            provider = res.data
            console.log("axios provider: ", provider);
            this.props.providerAction(provider);
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
        })
    }

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
    return bindActionCreators({ selectConsoleTitle, fetchReportPatientData, fetchSurveyQuestions, providerAction}, dispatch);
}

function mapStateToProps({auth}){
    //console.log(auth);
    return (auth);
}

Survey = connect(mapStateToProps, mapDispatchToProps)(Survey)
Survey = withRouter(Survey)
export default Survey;