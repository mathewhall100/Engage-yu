import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
});


class PatientDashboard extends Component {  
    renderQuestions= (questions) => {
        console.log(questions);
        if(questions){
            return _.map(questions, (question,index) => {
                console.log(_.values(question).join(''));
                return(
                <p>{_.values(question).join('')}</p>
                );
            })
        }
    }
    renderStartEndDateTime = (currentEpisode) =>{
        if(currentEpisode){
            return(
                <p>
                    You are filling questionnaires for this period {moment(currentEpisode.start_date).format('YYYY-MM-DD')} {moment(currentEpisode.start_time, "hhmm").format('hh:mm A')} - {moment(currentEpisode.end_date).format('YYYY-MM-DD')} {moment(currentEpisode.end_time, "hhmm").format('hh:mm A')}
                    <br />
                    This questionnaire is conducted by Dr {currentEpisode.requesting_provider_firstname} {currentEpisode.requesting_provider_lastname}
                </p>
            )
        }
    }
    submit(values){

    }
    render () {
        const { handleSubmit, classes, pristine, submitting, patientData } = this.props;
        console.log("props in patient dashboard : ", this.props);
        return (
                <div>
                    <div>
                        <div style={{backgroundColor: "#2d404b"}} />
                        <Typography component='h1' variant='headline' noWrap>
                            {this.props.title}
                        </Typography>
                        <Divider />
                        {(()=>{
                            if(this.props.patientData.currentEpisode){
                                if(this.props.patientData.currentEpisode.start_date ){
                                    return(
                                        <Typography component='div' variant='container'>
                                            {this.renderStartEndDateTime(this.props.patientData.currentEpisode)}
                                        </Typography>
                                        
                                    )
                                }
                            }
                        })()}
                        
                        <Divider />
                        <Typography component='div' variant='headline'>
                            <QuestionForm arrQuestions={this.props.patientData.currentEpisode ? this.props.patientData.currentEpisode.questions : null} />
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
    classes : propTypes.object.isRequired
}
export default connect(mapStatToProps) (PatientDashboard)
