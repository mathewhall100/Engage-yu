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
    fullScreen :  {
        display: 'flex',
        justifyContent : 'center',
        height: "100%"
    }
});

class PatientDashboard extends Component {  
    state= {
        redirect : false
    }
    render () {
        console.log("Patient Dashboard : " , this.props.patientData);
        const { handleSubmit, classes, pristine, submitting, patientData, patientData : {currentEpisode}, history } = this.props;
        const { redirect } = this.state;
        if (redirect) {
            const url = `/patient/complete`
            return <Redirect to={url} no_survey={true}/>;
        }
        return (
            <Typography component='div' className={classes.fullScreen}>
                <div>
                {(!_.isEmpty(patientData.closest) && patientData.closest.in_future === false )|| !_.isEmpty(this.props.match.params)? 
                    <div>
                            <div>You are filling in diary for : {moment(patientData.closest.scheduled_datetime).format("MM-DD-YYYY hh:mma")}</div>
                    <Divider />
                        <Typography component='div' variant='headline'>
                            <QuestionForm  {...this.props} dataEntry={this.state.closestDateTime} arrQuestions={this.props.patientData.currentEpisode ? this.props.patientData.currentEpisode.questions : null} />
                        </Typography>
                    <Divider />
                    </div>
                
                : 
                    <div>
                        <Typography component='div' variant='headline'>
                            {(!_.isEmpty(patientData.closest) && patientData.closest.in_future) ? 
                            <div>
                                Your next entry is at {moment(patientData.closest.scheduled_datetime).format("MM-DD-YYYY hh:mma")}. <br />
                                Check in later!
                            </div>
                            :
                            <div>
                                You do not have any diary due at this time. Please check back soon! 
                            </div>
                            }
                            
                        </Typography>
                    </div>
                    }
                </div>
            </Typography>
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
PatientDashboard = withStyles(styles)(PatientDashboard);

export default PatientDashboard;
