import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment'
import { withStyles, Dialog, DialogContent, DialogTitle, withMobileDialog, Typography} from '@material-ui/core';
import BtnAction from '../UI/Buttons/btnAction'
import BtnLink from '../UI/Buttons/btnLink'
import FormBox from '../UI/Forms/formBox'
import { validateIsRequired } from '../../logic/formValidations';
import patient_dataAPI from "../../utils/patient_data.js";

const styles = theme => ({
  textField: {
	width: "100%",
  }
})

class SurveySaveSuccessDialog extends Component {

	state = {
		open: true,
	};

	//Handle form submission and save message
	submit(values) {
		console.log("Submitted values: ", values);

		const msgObj = {
			sender_role: "provider",
			sender_ref: localStorage.getItem("provider_id"),
			sender_id:  localStorage.getItem("provider_id"),
			sender_firstname: localStorage.getItem("provider_first_name"),
			sender_lastname: localStorage.getItem("provider_last_name"),
		
			msg_date: new Date(),
			msg_title: values.title,
			msg_body: values.msg,
		}
		console.log("msgObj: ", msgObj)

		patient_dataAPI.insertMsg(this.props.patientDataId, msgObj)
        .then(res => {
					console.log("res.data: ", res.data)
					this.props.history.push('/admin/find')
        })
        .catch(err => {
					console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
					console.log(err);
					this.setState({failed: true}); // save success dialog
        })
        
	}

	handleClose = () => {
		this.setState({ open: false });
	};


  render() {
	const { fullScreen, classes, handleSubmit, pristine } = this.props;

	return (
		<Dialog
			fullScreen={fullScreen}
			open={this.state.open}
			disableBackdropClick 
			onClose={this.handleClose}
			aria-labelledby="responsive-dialog-title"
			PaperProps={{
				style: {
				padding: "40px",
				maxWidth: "60%"
				}
			}}
			>
				<DialogTitle id="responsive-dialog-title">Success!</DialogTitle>
				<DialogContent>

					<Typography variant="subtitle1" gutterBottom>New diary card successfully created for {this.props.name} and due to start {moment(this.props.episodeStart).format("MMM Do YYYY")}. This entry will appear in the active diary cards as 'pending' and become 'active' once the patient logs in and starts to enter information.</Typography>
					<br />
					<Typography variant="subtitle1" gutterBottom>Enter an optional message for the patient when they first interact with this diary card.</Typography> 

					<form className={classes.formContainer} noValidate onSubmit={handleSubmit(this.submit.bind(this))}>

						<br />

						<FormBox
						name="title"
						label="RE:"
						rows="1"
						/>

						<br />

						<FormBox
						name="msg"
						label="Enter message"
						rows="3"
						/>		

						<br />
						
						<Typography variant="subtitle2" align="right">
						{`Sender: Dr. ${localStorage.getItem("provider_first_name")} ${localStorage.getItem("provider_last_name")} on ${moment().format('MMMM Do YYYY, h:mm a')}`}
						</Typography>

						<br />

						<BtnAction type="submit" disabled={pristine} text="send" />
						<span style={{marginRight: "15px"}}>
						<BtnLink text="no thanks" url="/admin/find" />
						</span>
					</form>

				</DialogContent>

			</Dialog>
		);
  	}
}

function validate(values) {
    console.log("Error values: ", values) // -> { object containing all values of form entries } 
    const errors = {}; // error accumulator
    // validate inputs from 'values'
	errors.title = validateIsRequired(values.title)
	errors.msg = validateIsRequired(values.msg)
    // If errors is empty, then form good to submit
    console.log("Errors: ", errors)
    return errors;
}

SurveySaveSuccessDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const formData = {
	form: 'messageForm', //unique identifier for this form
	validate,    
}

SurveySaveSuccessDialog = withRouter(SurveySaveSuccessDialog)
SurveySaveSuccessDialog = reduxForm(formData)(SurveySaveSuccessDialog)
SurveySaveSuccessDialog = withStyles(styles, { withTheme: true })(SurveySaveSuccessDialog)
export default withMobileDialog()(SurveySaveSuccessDialog);