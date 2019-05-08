import React, { Component, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withMobileDialog, Typography} from '@material-ui/core';
import BtnAction from '../UI/Buttons/btnAction'
import BtnActionLink from '../UI/Buttons/btnActionLnk'
import FormBox from '../UI/Forms/formBox'
import DialogError from '../UI/Dialogs/dialogError'
import CallBack from '../UI/callback'
import DialogCustom from '../UI/Dialogs/dialogCustom'
import ProviderName from '../UI/providerName'
import { validateIsRequired } from '../../logic/formValidations';
import patient_dataAPI from "../../utils/patient_data.js";


class SurveySaveDialog extends Component {

	state = {
		open: true,
	};

	//Handle form submission and save message
	submit(values) {
		console.log("Submitted values: ", values);

		const msgObj = {
			msg_id: "requested",
			msg_date: new Date(),
			msg_title: values.title,
			msg_body: values.msg,
		}
		patient_dataAPI.insertMsg(
			this.props.patientDataId, 
			{newEpisodeId: this.props.survey.newEpisodeId, msg: msgObj}
		)
		.then(res => {
			console.log("res.data: ", res.data)
			this.handleClose()
			this.props.history.push('/admin/patient/find')
		})
		.catch(err => {
			console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
			console.log(err);
			this.setState({failed: true}); // open failed dialog
		})
	}

	getStart = (date) => {
		switch (date) {
			case "today": 
				return moment(moment()).format('MMMM Do YYYY')
			case "tomorrow":
				return moment(moment().add(1, "d")).format('MMMM Do YYYY')
			default: return moment(date).format('MMMM Do YYYY')
		}
	}

	handleClose = () => {
		this.setState({ open: false });
		this.props.saveListClose()
	};


	render() {
		const { handleSubmit, pristine, survey, errorSurvey, loadingSurvey, name } = this.props;

		if (errorSurvey) 
			return <DialogError text="This diary card could not be completed at this time." cancelurl={"/admin/patient/find"} /> 
		
		if (loadingSurvey) 
			return <CallBack text="saving..." />

		return (
			<DialogCustom title="Success!" width="800px" closeIcon={false}>

				<Typography variant="subtitle1" gutterBottom>
					New diary card successfully created for <b>{name}</b> and due to start {this.getStart(survey.start)}. This entry will appear in the active diary cards as 'pending' and become 'active' once the patient logs in and starts to enter information.
					<br /> <br />
					Enter an optional message for the patient when they first interact with this diary card.
				</Typography> 

				<form noValidate onSubmit={handleSubmit(this.submit.bind(this))}>
					<br />
					<FormBox name="title" label="RE:" rows="1"/>
					<br />
					<FormBox name="msg" label="Enter message" rows="3"/>		
					<br />
					<Typography variant="subtitle2" align="right">
						{`Sender: ${<ProviderName title={localStorage.getItem("user_provider_title")} firstname={localStorage.getItem("user_provider_firstname")} lastname={localStorage.getItem("user_providerr_lastname")} />} on ${moment().format('MMMM Do YYYY, h:mm a')}`}
					</Typography>
					<br />
					<BtnAction type="submit" disabled={pristine} text="send" marginRight={true}/>
					<BtnActionLink text="skip" url="/admin/patient/find" warning={true} />
				</form>

			</DialogCustom>
		)
	}
}

function validate(values) {
	const errors = {}; 
	errors.title = validateIsRequired(values.title)
	errors.msg = validateIsRequired(values.msg)
	return errors;
}

SurveySaveDialog.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
	console.log("State : ", state);
	return {
			survey: state.survey.survey,
			errorSurvey: state.survey.error,
			loadingSurvey: state.survey.loading
		}
};

const formData = {
	form: 'messageForm', //unique identifier for this form
	validate    
}

SurveySaveDialog = connect(mapStateToProps)(SurveySaveDialog)
SurveySaveDialog = withRouter(SurveySaveDialog)
SurveySaveDialog = reduxForm(formData)(SurveySaveDialog)
export default withMobileDialog()(SurveySaveDialog);