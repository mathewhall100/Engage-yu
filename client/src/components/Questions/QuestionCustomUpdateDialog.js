import React, { Component, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startCase, upperFirst, isEmpty } from 'lodash'
import moment from 'moment';
import { withStyles, withMobileDialog, Typography, Grid} from '@material-ui/core';
import RecordVoiceIcon from '@material-ui/icons/RecordVoiceOver';
import VideoCamIcon from '@material-ui/icons/Videocam';
import BtnAction from '../UI/Buttons/btnAction'
import FormText from './QuestionAddFormText'
import DialogCustom from '../UI/Dialogs/dialogCustom'
import ProviderName from '../UI/providerName'
import { loadProvider, loadQuestions } from '../../actions'
import providerAPI from '../../utils/provider'
import question_customAPI from '../../utils/question_custom'
import {validateIsRequired }from '../../logic/formValidations';


const styles = theme => ({
    editIcon: {
        marginLeft: "16px",
        position: "relative", 
        top: "4px",
        fontSize: "24px",
        color: "#666",
        float: "right",
        '&:hover': {
            color: theme.palette.primary.main,
            cursor: "pointer"
        }
    }, 
    moreIcons: {
        marginLeft: "16px",
        fontSize: "24px",
        color: "#666",
        '&:hover': {
            color: theme.palette.primary.main,
            cursor: "pointer"
        }
	}, 
	hint: {
		position: "relative", 
		left: "24px", 
		top: "32px",
		'&:hover': {
            color: theme.palette.primary.main,
			cursor: "pointer"
		}
	}
 
})


class QuestionCustomAddDialog extends Component {

	componentWillMount() {
        this.handleInitialize()
    }

	state = {
		open: true,
	};

	// Set initial states of form elements
	handleInitialize() {
        const { updateQuestion } = this.props
		const initData = {
			"question":  upperFirst(updateQuestion.question),
			"ans1": updateQuestion && updateQuestion.answers && upperFirst(updateQuestion.answers[0]),
			"ans2": updateQuestion && updateQuestion.answers && upperFirst(updateQuestion.answers[1]),
			"ans3": updateQuestion && updateQuestion.answers && upperFirst(updateQuestion.answers[2]),
			"ans4": updateQuestion && updateQuestion.answers && upperFirst(updateQuestion.answers[3]),
			"ans5": updateQuestion && updateQuestion.answers && upperFirst(updateQuestion.answers[4]),
			"hint1": updateQuestion && updateQuestion.hints && upperFirst(updateQuestion.hints[0]),
			"hint2": updateQuestion && updateQuestion.hints && upperFirst(updateQuestion.hints[1]),
			"hint3": updateQuestion && updateQuestion.hints && upperFirst(updateQuestion.hints[2]),
			"hint4": updateQuestion && updateQuestion.hints && upperFirst(updateQuestion.hints[3]),
			"hint5": updateQuestion && updateQuestion.hints && upperFirst(updateQuestion.hints[4])
		};
		this.props.initialize(initData);
	}

	//Handle form submission and save message
	submit(values) {
		console.log("Submitted values: ", values);
        const providerId = this.props.provider._id
        const questionId = this.props.updateQuestion._id
		const updObj = {
			question: values.question,
			answers: [values.ans1, values.ans2, values.ans3, values.ans4, values.ans5 ],
			hints: [values.hint1, values.hint2, values.hint3, values.hint4, values.hint5]
        }
        if (this.props.updateQuestionType === "custom") {
            providerAPI.updateQuestion(providerId, {questionId, questionData: {date_added: this.props.updateQuestion.date_added, ...updObj}} )
            .then(result => {
                console.log("result: ", result)
                this.props.dispatch(loadProvider(providerId))
            })                
            .catch(error => {
                console.log(error);
                console.log(error.response);
            })
        } else if (this.props.updateQuestionType === "shared") {
            question_customAPI.update(questionId, updObj)
            .then(result => {
                console.log("result: ", result)
                this.props.dispatch(loadQuestions());
            })                
            .catch(error => {
                console.log(error);
                console.log(error.response);
            })
        }
        
		this.handleClose()
    }
    

	handleClose = () => {
		this.props.dialogClose()
	};


	render() {
		const { classes, handleSubmit, pristine, newQuestion } = this.props;

		return (
			<DialogCustom title="Add A New Custom Question" width="800px" closeIcon={false}>
<				form noValidate onSubmit={handleSubmit(this.submit.bind(this))}>

                    <Grid container spacing={0}>
						<Grid item xs={10}>
							{ newQuestion ? 
								<FormText name="question" label="Question" variant="outlined"  width="90%" />
								:
								<FormText name="question" label="Question" openFocus={true} variant="outlined" width="90%" /> 
							}
						</Grid>	
						<Grid item xs={2}>
							<span style={{position: "relative", left: "16px", top: "30px"}}>
								<RecordVoiceIcon className={classes.moreIcons}/>
								<VideoCamIcon className={classes.moreIcons}/>   
							</span>
						</Grid>
						<Grid item xs={10} style={{margin: "0", paddingLeft: "16px"}}>
							{newQuestion ? 
								<FormText name="ans1" label="Answer 1" variant="outlined" openFocus={true} width="90%" color="green"/>   
								:
								<FormText name="ans1" label="Answer 1 " variant="outlined"  width="90%" color="green"/> 
							}
						</Grid>
						<Grid item xs={2}>
							<Typography variant="button" className={classes.hint} inline> add hint</Typography> 
						</Grid>
			
						<Grid item xs={10} style={{margin: "0", paddingLeft: "16px"}}>
							<FormText name="ans2" label="Answer 2 (max 80 characters)" variant="outlined" width="90%" color="yellow"/>
						</Grid>	
						<Grid item xs={2}>
							<Typography variant="button" className={classes.hint} inline>add hint</Typography> 
						</Grid>

						<Grid item xs={10} style={{margin: "0", paddingLeft: "16px"}}>
							<FormText name="ans3" label="Answer 3 (max 80 characters)" variant="outlined"  width="90%" color="orange"/>
						</Grid>	
						<Grid item xs={2}>
							<Typography variant="button" className={classes.hint} inline>add hint</Typography> 
						</Grid>	

						<Grid item xs={10} style={{margin: "0", paddingLeft: "16px"}}>
							<FormText name="ans4" label="Answer 4 (max 80 characters)" variant="outlined"  width="90%" color="red"/>
						</Grid>	
						<Grid item xs={2}>
							<Typography variant="button" className={classes.hint} inline> add hint</Typography> 
						</Grid>	

						<Grid item xs={10} style={{margin: "0", paddingLeft: "16px"}}>
							<FormText name="ans5" label="Answer 5 (max 80 characters)" variant="outlined"  width="90%" color="grey"/>
						</Grid>	
						<Grid item xs={2}>
							<Typography variant="button" className={classes.hint} inline> add hint</Typography> 
						</Grid>
						<Grid item xs={10}> 
							<br />
							<Typography variant="subtitle2" align="right" style={{width: "90%"}}>
								Added by:&nbsp;
								<ProviderName title={localStorage.getItem("user_provider_title")} firstname={localStorage.getItem("user_provider_firstname")} lastname={localStorage.getItem("user_provider_lastname")} />
								<br />
								on {moment().format('MMMM Do YYYY, h:mm a')}
							</Typography>
						</Grid>
						<Grid item xs={2}>
						</Grid>
					</Grid>

					<BtnAction type="submit" disabled={pristine} text="save" marginRight={true}/>
					<BtnAction text="cancel (no changes)" handleAction={this.handleClose} warning={true} />
				</form>

			</DialogCustom>
		)
	}
}


QuestionCustomAddDialog.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
	console.log("State : ", state);
	return {
		provider: state.provider.provider
	}
};

function validate(values) {
	const errors = {}; // error accumulator
    errors.question = validateIsRequired(values.question)
    errors.ans1 = validateIsRequired(values.ans1)
    errors.ans2 = validateIsRequired(values.ans2)
    errors.ans3 = validateIsRequired(values.ans3)
    errors.ans4 = validateIsRequired(values.ans4)
    errors.ans5 = validateIsRequired(values.ans5)
    console.log("Errors: ", errors)
    return errors;
}

const formData = {
    form: 'QuestionCustomAddForm',
    validate  
}

QuestionCustomAddDialog = connect(mapStateToProps)(QuestionCustomAddDialog)
QuestionCustomAddDialog = withRouter(QuestionCustomAddDialog)
QuestionCustomAddDialog = reduxForm(formData)(QuestionCustomAddDialog)
QuestionCustomAddDialog = withStyles(styles)(QuestionCustomAddDialog)
export default withMobileDialog()(QuestionCustomAddDialog);