import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { reset, reduxForm } from 'redux-form';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import FormText from '../Forms/FormText';
import FormRadio from '../Forms/FormRadio';
import FormCheckBoxList from '../Forms/FormCheckboxList';
import FormButtonList from '../Forms/FormButtonList';
import ChkList from '../Forms/FormChkList';
import {submitForm, editActiveStatus} from '../../actions/PatientAction';
const styles = theme => ({
    submitBtn: {
        marginRight: 20,
        color: "#ffffff",
        backgroundColor: "#2d404b",
        '&:hover': {
            backgroundColor: "#28353d",
        },
        '&:disabled': {
            color: 'grey'
        },
        hover: {},
        disabled: {},
    },
    cancelBtn: {
        marginRight: 20,
        color: "#ffffff",
        textDecoration: "none",
        backgroundColor: "#c62828",
        '&:hover': {
            backgroundColor: "#871c1c",
        },
        hover: {},
    },
    cancelLnk: {
        textDecoration: "none",
    },
});


class QuestionForm extends Component {
    state= {redirect : false};
    submit(values){    
        console.log("Submitted values: ", values);
        //let webURL= window.location.href; 
        //console.log("URL : " + webURL);
        let episodeEntry, episode, patientDataID, entry, activeStatus; 
        let objSubmit = {};
        objSubmit.data = [];
        objSubmit.valid = true;
        objSubmit.actual_datetime = moment().format();
        
        let numQuestions = this.props.patientData.currentEpisode.num_questions;
        patientDataID = this.props.patientData.patientDataID; 
        //console.log("num questions : ", numQuestions);


        for(let i = 0; i < numQuestions ; i++){
            let data = {};
            data.question_number = i;
            data.question_answers= [];
            console.log("working on question number " + data.question_number);
            
            //console.log(data.question_number);
                for (let j = 0; j <= 4; j++) {
                    if (values[data.question_number] === j) {
                        data.question_answers.push(true);
                    } else {
                        data.question_answers.push(false);
                    }
                }    
                console.log("Data : ", data);
                objSubmit.data.push(data);
        }
        
        console.log(objSubmit.data);
        if(!_.isEmpty(this.props.match.params)){
            console.log("found previous record")
            objSubmit._id = this.props.patientData.episodes[this.props.match.params.episode].records[this.props.match.params.entry]._id;
            objSubmit.scheduled_datetime = this.props.patientData.episodes[this.props.match.params.episode].records[this.props.match.params.entry].scheduled_datetime;
            objSubmit.day = this.props.patientData.episodes[this.props.match.params.episode].records[this.props.match.params.entry].day;
            objSubmit.time = this.props.patientData.episodes[this.props.match.params.episode].records[this.props.match.params.entry].time;
            objSubmit.episode = this.props.match.params.episode;
            objSubmit.record_number = this.props.match.params.entry;
            objSubmit.late = true;
            
        }else{
            console.log("new record")
            objSubmit.episode = parseInt(this.props.patientData.episodes[this.props.patientData.episodes.length - 1].episode_number);
            objSubmit.day = this.props.patientData.closest.day;
            objSubmit.time = this.props.patientData.closest.time;
            objSubmit.late = false;
            objSubmit.record_number = this.props.patientData.closest.record_number;
            objSubmit._id = this.props.patientData.closest._id;
            objSubmit.scheduled_datetime = this.props.patientData.closest.scheduled_datetime;
            
        }
        if (parseInt(objSubmit.record_number) === parseInt(this.props.patientData.episodes[this.props.patientData.episodes.length - 1].expected_num_records - 1)) {
            activeStatus = 'awaiting review'
        } else {
            activeStatus = 'active';
        } 
        console.log("activeStatus : " + activeStatus);
        /* if(webURL.includes("/patient/history")){

            episodeEntry = webURL.split('/patient/history/').pop();
            episode = episodeEntry.substr(0, episodeEntry.indexOf("/"));
            objSubmit.episode = episode;
            entry = episodeEntry.split('/').pop();
            objSubmit.record_number = entry
            objSubmit.late = true;
        }else{
            objSubmit.episode = this.props.patientData.episodes[this.props.patientData.episodes.length-1];
            objSubmit.late = false;
            objSubmit.record_number = this.props.patientData.closest.record_number;
            objSubmit._id = this.props.patientData.closest._id;
            objSubmit.scheduled_datetime = this.props.patientData.closest.scheduled_datetime;


        } */
        setTimeout(this.props.submitForm(patientDataID, objSubmit.episode, objSubmit._id, objSubmit), 500);
        setTimeout(this.props.editActiveStatus(patientDataID),500);
        this.setState({redirect : true})
    }

    renderQuestion = () => {        
        return this.props.arrQuestions.map((item, index) => {
            //console.log(item);
            const radioItems = [];
            let objRadioItems = {};
            item.answers.map((answer, i) => {
                //console.log(answer);
                objRadioItems = {};
                objRadioItems.value = i;
                objRadioItems.label = answer;
                radioItems.push(objRadioItems);
                //console.log(radioItems);
            })
            return(
                <div>
                    <FormButtonList
                        hints={item.hints}
                        items={radioItems}
                        name={item.question}
                        index={index}
                        
                    />
                    <hr />
                </div>  
            )
        });
    }
    
    render(){
        const { handleSubmit, classes, pristine, submitting } = this.props;
        console.log("props in question form : ", this.props);
        const { redirect } = this.state;
        if (redirect) {
            const url = `/patient/complete`;
            return <Redirect to={url} episode={this.state.episode} entry={this.state.entry} />;
        }
        return(
            
            <div>
                <Card style={{padding: '20px'}}>
                    <form autoComplete='off' onSubmit={handleSubmit(this.submit.bind(this))}>
                        <Grid container spacing={12} >                            
                           <Grid item xs={12}>
                                 {this.props.arrQuestions ? this.renderQuestion() : null}
                           </Grid>
                           <Grid>
                             
                           </Grid>
                           
                            <Grid item xs={12}>
                                <Button type="submit" disabled={submitting || pristine} className={classes.submitBtn}>Submit</Button>
                            </Grid>
                            <Grid item xs={8}></Grid>
                        </Grid>
                    </form>
                </Card>
            </div>
        );
    }
        
}

const formData = {
    form: 'PatientQuestionnaire', //unique identifier for this form 
    validate,
}

function validate(values) {
    //console.log("Error values: ", values) 
    const errors = {};  
    return errors;
}
function mapStatsToProps(state) {
    return(state);
}
QuestionForm = connect(mapStatsToProps, {submitForm, editActiveStatus})(QuestionForm);
QuestionForm = reduxForm(formData)(QuestionForm);
QuestionForm = withStyles(styles)(QuestionForm);
QuestionForm = withRouter(QuestionForm);

export default QuestionForm;