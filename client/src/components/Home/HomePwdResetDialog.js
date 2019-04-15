import React from 'react';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles, Dialog, DialogContent, DialogTitle, withMobileDialog, Typography} from '@material-ui/core';
import BtnAction from '../UI/Buttons/btnAction'
import FormBox from '../UI/Forms/formBox'
import { validateEmail } from '../../logic/formValidations';
import authAPI from '../../utils/auth'

const styles = theme => ({
	textField: {
	width: "100%",
	}
})

class HomePwdResetDialog extends React.Component {

	state = {
		open: true,
		dialogContent: "form"
	};

	//Handle form submission and save message
	submit(values) {
        console.log("Submitted values: ", values);
        authAPI.passwordReset({
            email: values.email
        })
        .then(res => {
			console.log("res: ", res)
			this.setState({dialogContent: "sent"})
        })
        .catch(err => {
			console.log("Err: ", err)
			if (err.code === "401") {this.setState({dialogContent: "invalid"})}
				else this.setState({dialogContent: "error"})
		})
		this.handleClose()
	}

	handleClose = () => {
		this.setState({open: false});
	};


	render() {
	const { fullScreen, classes, handleSubmit, pristine } = this.props;
	const { dialogContent } = this.state

	const RenderResetSent = () => 
		<DialogContent>
			<Typography variant="subtitle2" gutterbottom>Email sent</Typography>
			<Typography variant="subtitle2" gutterbottom>Please check your inbox for a password reset emial and follow the instructions on the email to reset your password.</Typography>
		</DialogContent>

	const RenderResetError= () => 
		<DialogContent>
			<Typography variant="subtitle2" gutterbottom>An error occurred</Typography>
			<Typography variant="subtitle2" gutterbottom>Unfortuneately an error occurred and your password cannot be reset at this time.</Typography>
		</DialogContent>

	const RenderAddressError = () => 
		<DialogContent>
			<Typography variant="subtitle2" gutterbottom>Email not recognised</Typography>
			<Typography variant="subtitle2" gutterbottom>The email address entered was not recognised.</Typography>
		</DialogContent>


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
				<DialogTitle id="responsive-dialog-title">Reset Passsword</DialogTitle>

				{dialogContent === "form" && 
					<DialogContent>
						<Typography variant="subtitle2" gutterBottom>Enter the email adress which you use to login in to to the application. if it matches, we will send a password reset email to this address.</Typography> 
						<br /><br />
						<Typography variant="subtitle2" gutterBottom>Enter email address: </Typography> 
						<form className={classes.formContainer} noValidate onSubmit={handleSubmit(this.submit.bind(this))}>
							<FormBox
							name="email"
							label="Email"
							rows="1"
							/>
							<br />
							{dialogContent === "form" && <BtnAction type="submit" disabled={pristine} text="reset" marginRight={true}/>}
							<BtnAction text="cancel" handleAction={this.handleClose} warning={true}/>
						</form>
					</DialogContent>}

				{dialogContent === "sent"  && <RenderResetSent />}

				{dialogContent === "error"  && <RenderResetError />}

				{dialogContent === "invalid"  && <RenderAddressError />}

	
			</Dialog>
		);
	}
}

function validate(values) {
	console.log("Error values: ", values) 
	const errors = {}; // error accumulator
	errors.email = validateEmail(values.email, true)
	console.log("Errors: ", errors)
	return errors;
}

HomePwdResetDialog.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

const formData = {
	form: 'PwdResetForm', //unique identifier for this form
	validate,    
}

HomePwdResetDialog = withRouter(HomePwdResetDialog)
HomePwdResetDialog = reduxForm(formData)(HomePwdResetDialog)
HomePwdResetDialog = withStyles(styles, { withTheme: true })(HomePwdResetDialog)
export default withMobileDialog()(HomePwdResetDialog);