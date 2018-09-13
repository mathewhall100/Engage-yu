import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset, reduxForm } from 'redux-form';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import FormText from '../Forms/FormText'
import FormTextFocused from '../Forms/FormTextFocused'
import FormTextPassword from '../Forms/FormTextPassword'
import FormSelect from '../Forms/FormSelect'
import FormRadio from '../Forms/FormRadio'

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
                this.renderRadioButtons(radioItems, index, item.question, item.hints)
            )         
            
        });
    }
    renderRadioButtons = (objQuestion, index, question, hints) => {
        return(
            <div>
                <label>{question}</label>
                <FormRadio 
                    name={"question"+index}
                    items={objQuestion}
                />
            </div>
            
        );
            
    }
    render(){
        const { handleSubmit, classes, pristine, submitting } = this.props;

        return(
            
            <div>
                <Card style={{padding: '20px'}}>
                    <form autoComplete='off' onSubmit={handleSubmit(this.submit.bind(this))}>
                        <Grid container spacing={24} >                            
                           <Grid item xs={24}>
                                 {this.props.arrQuestions ? this.renderQuestion() : null}
                           </Grid>
                           
                            <Grid item xs={4}>
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