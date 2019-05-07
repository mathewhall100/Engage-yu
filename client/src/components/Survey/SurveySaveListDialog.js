import React from 'react';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withMobileDialog, Typography} from '@material-ui/core';
import BtnAction from '../UI/Buttons/btnAction'
import FormBox from '../UI/Forms/formBox'
import DialogCustom from '../UI/Dialogs/dialogCustom'
import { validateIsRequired } from '../../logic/formValidations';
import providerAPI from "../../utils/provider.js";
import { loadProvider } from '../../actions'

class SurveySaveQuestionListDialog extends React.Component {

	state = {
		open: true,
	};

	//Handle form submission and save message
	submit(values) {
		console.log("Submitted values: ", values);
		const { questions } = this.props
		const listObj = {
			list_name: values.name,
			date_created: new Date(),
			list_questions: [...questions]
		}
		providerAPI.saveQuestionList(this.props.providerId, listObj)
			.then(res => {
				console.log("res.data: ", res.data)
				this.props.dispatch(loadProvider(this.props.providerId));
				this.handleClose("saved")
			})
			.catch(err => {
				console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
				console.log(err);
			})
		}

	handleClose = (saved) => {
		this.setState({open: false});
		this.props.saveListClose(saved)
	};


	render() {
		const { handleSubmit, pristine, questions } = this.props;

		return (
			<DialogCustom title="Create new custom question list" width="600px">

				<Typography variant="subtitle1" gutterBottom>List questions: 
					<br />
					<table>
						<tbody>
							{questions.map((question, index) => {
								return (
									<Typography variant="subtitle2">
										<tr>
											<td style={{width: "20px", verticalAlign: "top"}} >Q{index+1}.</td>
											<td>{question.question}</td>
										</tr>
									</Typography> 
								)
							}) }
						</tbody>
					</table>
				</Typography>

				<br /><br />
				
				<Typography variant="subtitle1" gutterBottom>Enter a name for this custom question list</Typography> 

				<form noValidate onSubmit={handleSubmit(this.submit.bind(this))}>
					<FormBox name="name" label="Name" rows="1" />
					<br />
					<Typography variant="subtitle2" align="right">
						{`Saved by: Dr. ${localStorage.getItem("user_provider_firstname")} ${localStorage.getItem("user_provider_lastname")}`}
					</Typography>
					<br />
					<BtnAction type="submit" disabled={pristine} text="save" marginRight={true}/>
					<BtnAction text="cancel" handleAction={this.handleClose} warning={true}/>
				</form>

			</DialogCustom> 
		);
	}
}

function validate(values) {
	const errors = {}; 
	errors.title = validateIsRequired(values.title)
	errors.msg = validateIsRequired(values.msg)
	console.log("Errors: ", errors)
	return errors;
}

SurveySaveQuestionListDialog.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

const formData = {
	form: 'MessageForm', //unique identifier for this form
	validate    
}

SurveySaveQuestionListDialog = withRouter(SurveySaveQuestionListDialog)
SurveySaveQuestionListDialog = reduxForm(formData)(SurveySaveQuestionListDialog)
export default withMobileDialog()(SurveySaveQuestionListDialog);