import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import { selectConsoleTitle, loadQuestions, loadProvider } from '../../actions';
import SurveyPatientDetails from './SurveyPatientDetails';
import SurveyForm from './SurveyForm';


class Survey extends Component {  

    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Create New Diary Card"}));
        this.props.dispatch(loadQuestions());
        this.props.dispatch(loadProvider(localStorage.getItem("provider_id")));
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

Survey = connect(null)(Survey)
export default Survey;