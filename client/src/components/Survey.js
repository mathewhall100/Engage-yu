import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Card from '@material-ui/core/Card';

import SurveyForm from '../containers/SurveyForm'
import { selectConsoleTitle, fetchSurveyQuestions, fetchSurveyPatientDetails } from '../actions'
import SurveyPatientDetails from '../containers/SurveyPatientDetails';

class Survey extends Component {  

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Create new diary card"});
        this.props.fetchSurveyQuestions()
        const params = this.props.match.params.id
        console.log("surveyparams: ", params)
        this.props.fetchSurveyPatientDetails(params);
        this.setState({patientId: params})
    }

    state = {
        patientId: ""
    }

    render () {

        const { patientId } = this.state
        
        return (
            <div>

                <SurveyPatientDetails /> <br />

                <Card style={{paddingLeft: "40px", paddingTop: "20px"}}>
                    <SurveyForm patientId={patientId}/>
                </Card >
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, fetchSurveyPatientDetails, fetchSurveyQuestions }, dispatch);
}

function mapStateToProps({auth}){
    console.log(auth);
    return (auth);
}

Survey = connect(mapStateToProps, mapDispatchToProps)(Survey)
Survey = withRouter(Survey)
export default Survey;