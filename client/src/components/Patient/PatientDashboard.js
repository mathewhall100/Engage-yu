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
    renderPage = (currentEpisode) => {
    console.log("In render page", currentEpisode);
        /* if current episode exist in props proceed to check for date and hour  */
        if(currentEpisode){
            let today = moment().utc();
            let todayTime = moment().format("HH:mm");
            let setTimeBeforeToday = moment(moment().format('YYYY-MM-DD') + "T" + moment(currentEpisode.start_time, "HHmm").format("HH:mm")).format("YYYY-MM-DDTHH:mm");
            let setTimeAfterToday = moment(moment().format('YYYY-MM-DD') + "T" + moment(currentEpisode.end_time, "HHmm").format("HH:mm")).format("YYYY-MM-DDTHH:mm");
            let newTime = moment().format("YYYY-MM-DDTHH:mm");
            console.log("start and end date : ",moment(moment().format("YYYY-MM-DDTHH:mm"), "YYYY-MM-DDTHH:mm"), moment(currentEpisode.start_date).utc(), moment(currentEpisode.end_date).utc());
            console.log("start and end time : ", setTimeBeforeToday, setTimeAfterToday);
            let dateInrange = moment(moment().format("YYYY-MM-DDTHH:mm"), "YYYY-MM-DDTHH:mm").isBetween(moment(currentEpisode.start_date, "YYYY-MM-DDTHH:mm"), moment(currentEpisode.end_date, "YYYY-MM-DDTHH:mm"), null, '[]');
            let timeInrange = moment(newTime, "YYYY-MM-DDTHH:mm").isBetween(moment(setTimeBeforeToday, "YYYY-MM-DDTHH:mm"), moment(setTimeAfterToday, "YYYY-MM-DDTHH:mm"), null, '[]');
            console.log(`date in range ? ${dateInrange} , time in range ? ${timeInrange}`)
            if(dateInrange && timeInrange) {
                console.log("proceed to check for the closest time");
                let newObj = _.mapKeys(currentEpisode.record, 'record_number');
                let closestTime = Infinity, closest;
                newObj = _.filter(newObj, (o) => {
                    return (o.valid===false && moment(o.scheduled_datetime, "YYYY-MM-DDTHH:mm").isSame(moment(), 'd'));
                });
                newObj.forEach( (d) => {
                    if(Math.abs(moment(d.scheduled_datetime).diff(moment())) < closestTime){
                        closestTime = Math.abs(moment(d.scheduled_datetime).diff(moment()))
                        closest = d
                    }
                })
                console.log("Closest entry : " , closest);
                this.setState({dataEntry : closest}, () => console.log(this.state.closest))                
                
            }else{
                console.log("past the range");
                
                //this.props.history.push('/patient/complete')
            }
        }

    
    }
    render () {
        const { handleSubmit, classes, pristine, submitting, patientData, patientData : {currentEpisode}, history } = this.props;
        console.log("current episode : ", currentEpisode);
        console.log("props in patient dashboard : ", this.props);
        { currentEpisode ? this.renderPage(currentEpisode) : null }
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
                            <QuestionForm dataEntry = {this.state.dataEntry} arrQuestions={this.props.patientData.currentEpisode ? this.props.patientData.currentEpisode.questions : null} />
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
export default connect(mapStatToProps)(PatientDashboard)
