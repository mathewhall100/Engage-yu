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
import {submitForm, editActiveStatus, findActiveByID} from '../../actions/PatientAction';
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
    state= {
            redirect : false,
            question : 0,
    };
    componentDidMount() {
        console.log("in did mount, the props is : ", this.props);
        this.props.findActiveByID(this.props.patientData.currentEpisode.active_record_id);
    }
    submit(values){    
        console.log("Submitted values: ", values);
        //let webURL= window.location.href; 
        //console.log("URL : " + webURL);
        let episodeEntry, episode, patientDataID, entry, activeStatus, activeID; 
        let objSubmit = {};
        let objActive = {};
        objSubmit.data = [];
        objSubmit.valid = true;
        objSubmit.actual_datetime = moment().format();
        
        let numQuestions = this.props.patientData.currentEpisode.num_questions;
        patientDataID = this.props.patientData.patientDataID; 
        activeID = this.props.patientData.currentEpisode.active_record_id;
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
        objActive = {
            last_entry : moment(),
            status : activeStatus,
            num_entries : parseInt(this.props.patientData.active.num_entries)+1
        }
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
        setTimeout(this.props.submitForm(patientDataID, objSubmit.episode, objSubmit._id, activeStatus, objSubmit), 500);
        setTimeout(this.props.editActiveStatus(activeID, objActive),500);
        this.setState({redirect : true})
    }

    changeQuestionState = (newState) => {
        this.setState({
            question : newState,
        })
    }
    renderQuestion = () => {        
        const { handleSubmit, classes, pristine, submitting } = this.props;
        let testQuestion = [
            {
                "answers": [
                    "on",
                    "on, troubling dyskinesia",
                    "on, non-troubling dyskinesia",
                    "off",
                    "asleep"
                ],
                "hints": [],
                "_id": "5ba06cbf7e13203e2c118f1a",
                "question": "How do you feel at this time?"
            },
            {
                "answers": [
                    "yes",
                    "yes, a little",
                    "no",
                    "not really",
                    "asleep"
                ],
                "hints": [],
                "_id": "5ba06cbf7e13203e2c116f1a",
                "question": "Are you currently feeling cold?"
            }
        ]
        return this.props.arrQuestions.map((item, index) => {
            //return testQuestion.map((item, index) => {
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
                <div style={{textAlign: "center", display : `${this.state.question === index ? "block" : "none"}`}}>
                    <FormButtonList
                        hints={item.hints}
                        items={radioItems}
                        name={item.question}
                        index={index}
                        
                    />
                    {this.state.question < this.props.arrQuestions.length -1 ? 
                        <Button type='button' className={classes.submitBtn} onClick={event => this.changeQuestionState(index+1) } >Next Question</Button>
                    :
                        null
                    }
                    {this.state.question === this.props.arrQuestions.length - 1 ?
                        <Button type="submit" disabled={submitting || pristine} className={classes.submitBtn}>Submit</Button>
                        :
                        null
                    }

                    
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
QuestionForm = connect(mapStatsToProps, { submitForm, editActiveStatus, findActiveByID})(QuestionForm);
QuestionForm = reduxForm(formData)(QuestionForm);
QuestionForm = withStyles(styles)(QuestionForm);
QuestionForm = withRouter(QuestionForm);

export default QuestionForm;