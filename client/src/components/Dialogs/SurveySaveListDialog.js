import React from 'react';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Typography from '@material-ui/core/Typography';
import ActionBtn from '../Buttons/actionBtn'
import FormBox from '../Forms/FormBox'
import { validateIsRequired } from '../../logic/formValidations';
import providerAPI from "../../utils/provider.js";
import { providerAction } from '../../actions'

const styles = theme => ({
	textField: {
	width: "100%",
	}
})

class SurveySaveSuccessDialog extends React.Component {

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
		console.log("listObj: ", listObj)

		providerAPI.saveQuestionList(this.props.providerId, listObj)
			.then(res => {
				console.log("res.data: ", res.data)
				providerAPI.findById(this.props.providerId)
					.then(res => {
						console.log("res: ", res.data);
						this.props.providerAction(res.data);
					})
				this.handleClose()
			})
			.catch(err => {
				console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
				console.log(err);
			})
		}

	handleClose = () => {
		this.setState({open: false});
	};


	render() {
	const { fullScreen, classes, handleSubmit, pristine, questions } = this.props;

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
				width: "600px",
				maxWidth: "60%"
				}
			}}
			>
				<DialogTitle id="responsive-dialog-title">Create new custom question list</DialogTitle>

				<DialogContent>
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

					<form className={classes.formContainer} noValidate onSubmit={handleSubmit(this.submit.bind(this))}>

						<FormBox
						name="name"
						label="Name"
						rows="1"
						/>

						<br />

						<Typography variant="subtitle2" align="right">
						{`Saved by: Dr. ${localStorage.getItem("provider_first_name")} ${localStorage.getItem("provider_last_name")}`}
						</Typography>

						<br />

						<ActionBtn type="submit" disabled={pristine} text="save" />
						<span style={{marginLeft: "15px"}}>
							<ActionBtn text="cancel" handleAction={this.handleClose} />
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({providerAction}, dispatch);
}

SurveySaveSuccessDialog = connect(null, mapDispatchToProps)(SurveySaveSuccessDialog)
SurveySaveSuccessDialog = withRouter(SurveySaveSuccessDialog)
SurveySaveSuccessDialog = reduxForm(formData)(SurveySaveSuccessDialog)
SurveySaveSuccessDialog = withStyles(styles, { withTheme: true })(SurveySaveSuccessDialog)
export default withMobileDialog()(SurveySaveSuccessDialog);