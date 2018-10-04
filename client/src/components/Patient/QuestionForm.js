import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset, reduxForm } from 'redux-form';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import FormText from '../Forms/FormText';
import FormRadio from '../Forms/FormRadio';
import FormCheckBoxList from '../Forms/FormCheckboxList';
import FormButtonList from '../Forms/FormButtonList';
import ChkList from '../Forms/FormChkList';
import {submitForm} from '../../actions/PatientAction';
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
    submit(values){    
        console.log("Submitted values: ", values);
        let objSubmit = {}
        /*
        record_number: { type: Number, required: [true, "No record number"] },
        valid: { type: Boolean, default: false },
        day: { type: Number, required: [true, "No record day"] },
        time: { type: String, required: [true, "No record time"] },

        scheduled_datetime:  {type: Date, required: true},
        actual_datetime: Date,

        medication_adherance: { type: String, enum: ["yes", "no", "no meds", "unanswered", "not asked"] },

        data: [{ type: Boolean }],
        late: {type: Boolean, default: false},
        patient_comments: String
        */


    }

    renderQuestion = () => {        
        return this.props.arrQuestions.map((item, index) => {
            const radioItems = [];
            let objRadioItems = {};
            item.answers.map((answer, i) => {
                objRadioItems = {};
                objRadioItems.value = i;
                objRadioItems.label = answer;
                radioItems.push(objRadioItems);
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

        return(
            
            <div>
                <Card style={{padding: '20px'}}>
                    <form autoComplete='off' onSubmit={handleSubmit(this.submit.bind(this))}>
                        <Grid container spacing={12} >                            
                           <Grid item xs={12}>
                                 {this.props.arrQuestions ? this.renderQuestion() : null}
                           </Grid>
                           <Grid item>
                                <FormText name='comment' row={"4"} multiline={true} label='additional comment' />
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

function validate(values) {
    const errors = {};  
    return errors;
}
function mapStatsToProps(state) {
    return(state);
}
export default reduxForm({
    validate,
    form : 'PatientQuestionnaire',
})(
    connect(mapStatsToProps, { submitForm } )( withStyles(styles)(QuestionForm)
))