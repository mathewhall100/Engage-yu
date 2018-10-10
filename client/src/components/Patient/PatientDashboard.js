import React, { Component } from 'react';
import { Link, Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import propTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import QuestionForm from './QuestionForm';
import history from '../../history';
import StartEndDate from './DashboardItems/StartEndDate';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },

    flex: {
        flexGrow: 1,
    },

    welcomeText: {
        marginRight: 20,
    },

    menuButton: {
        '&:hover': {
            backgroundColor: "#1a242b",
        },
        hover: {},
    },
});

class PatientDashboard extends Component {  
    state= {
        redirect : false
    }
    
    submit(values){
        

    }
    renderPage = () => {
        //console.log("In render page", this.props.patientData.closestDateTime);
        /* if current episode exist in props proceed to check for date and hour  */
        if(!this.props.patientData.closestDateTime){
            console.log("past the range");
            //this.props.history.push('/patient/complete')
        }

    
    }
    render () {
        const { handleSubmit, classes, pristine, submitting, patientData, patientData : {currentEpisode}, history } = this.props;
        //console.log("current episode : ", currentEpisode);
        //console.log("props in patient dashboard : ", this.props);
        this.props.patientData.closestDateTime  ? this.renderPage : null
        return (
                <div>
                    <div>
                        <div style={{backgroundColor: "#2d404b"}} />
                        <Typography component='h1' variant='headline' noWrap>
                            {this.props.title}
                        </Typography>
                        <Divider />
                        <Typography component='div'>
                            {currentEpisode ? <StartEndDate 
                                start_time={currentEpisode.start_time }  
                                start_date={currentEpisode.start_date }
                                end_time = {currentEpisode.end_time }
                                end_date = {currentEpisode.end_date }
                                requesting_provider_lastname = {currentEpisode.requesting_provider_lastname }
                                requesting_provider_firstname= {currentEpisode.requesting_provider_firstname }

                            /> : null }
                        </Typography>
                        
                        <Divider />
                        <Typography component='div' variant='headline'>
                            <QuestionForm  {...this.props} dataEntry = {this.state.closestDateTime} arrQuestions={this.props.patientData.currentEpisode ? this.props.patientData.currentEpisode.questions : null} />
                        </Typography>
                        <Divider />
                    </div>
                    
                </div >
        );
    }
}

function mapStatToProps(state){
    return {
        state
    }
}
PatientDashboard.propTypes = {
    classes : propTypes.object.isRequired,
    history: propTypes.shape({
        push: propTypes.func.isRequired
        }).isRequired,
}

PatientDashboard = connect(mapStatToProps)(PatientDashboard);
PatientDashboard = withRouter(PatientDashboard);

export default (PatientDashboard);
