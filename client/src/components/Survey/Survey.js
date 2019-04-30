import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card } from '@material-ui/core';
import { selectConsoleTitle, loadQuestions, loadProvider, saveSurvey } from '../../actions';
import SurveyPatientDetails from './SurveyPatientDetails';
import SurveyForm from './SurveyForm';


class Survey extends Component {  

    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Create New Diary Card", menuIndex: 2}));
        this.props.dispatch(loadQuestions());
        this.props.dispatch(loadProvider(localStorage.getItem("user_provider_id")));
        this.props.dispatch(saveSurvey("reset"))
    }

    render () {

        return (
            <Fragment>
                <SurveyPatientDetails /> 
                <br />
                <Card style={{padding: "40px"}}>
                    <SurveyForm />
                </Card>
            </Fragment>
        );
    }
}

Survey = connect(null)(Survey)
export default Survey;