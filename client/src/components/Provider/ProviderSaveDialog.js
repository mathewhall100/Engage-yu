import React, { Component, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, withMobileDialog, Typography } from '@material-ui/core'
import BtnGroup from '../UI/Buttons/btnGroup'
import FormCheckbox from '../UI/Forms/formCheckbox'
import DialogSaveFailure from '../UI/Dialogs/dialogSaveFailure'
import DialogSaving from '../UI/Dialogs/dialogSaving'
import ProviderName from '../UI/providerName'
import { providerName } from '../../logic/textFunctions'
import { mailer } from '../../actions'


class ProviderSaveDialog extends Component {

	state = {
		open: true
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleRedirect = () => {
		this.handleClose()
		this.props.history.push({pathname: '/admin/provider/find'})
	}

	submit = (values) => {
		console.log("Submitted values: ", values)
		// If email and password entered for new provider, send welcome email
		if (values.emailLoginCreds) {
			const { newProvider } = this.props
			const newProviderName = providerName(newProvider.title, newProvider.firstname, newProvider.lastname)
			const newProviderEmail = values.email
			const newProviderPwd = values.password
			const enrollingProvider = providerName(localStorage.getItem("user_provider_title"), localStorage.getItem("user_provider_firstname"), localStorage.getItem("user_provider_lastname"))
			const msg = {
				emailTo: newProvider.email,
				subject: `${newProviderName}: Welcome to Engage-yu`,
				text: `
					Dear ${newProviderName}

					Welcome to Engage-Yu

					You have been registered with the Engage-Yu application by your colleague, ${enrollingProvider}}. 
					
					You may now log in and use the application with the following credentials: 
						email : 	${newProviderEmail}
						password: 	${newProviderPwd}

					This password is temporary and you will be prompted to change it to a more secure passord of your choice when you first login. Note that before you can login, you must have verified your email address by following the instructions on a separate email we have sent you. 
					
					Regards
					The Engage-Yu team
				`
			}
			this.props.dispatch(mailer(msg))
		}
		this.handleRedirect()
	}

	render() {
		const { fullScreen, handleSubmit, newProvider, loadingNewProvider, errorNewProvider, enableLogin } = this.props;

		if (errorNewProvider) 
			return <DialogSaveFailure text="An error ocurred and this provider's details could not be saved at this time." cancelUrl={"/admin/provider/find"} /> 
		
		if (loadingNewProvider || isEmpty(newProvider))
			return <DialogSaving />
		
		return <Dialog
			fullScreen={fullScreen}
			open={this.state.open}
			disableBackdropClick 
			onClose={this.handleClose}
			aria-labelledby="responsive-dialog-title"
			PaperProps={{
				style: {
					border: "2px solid  #28353d",
					borderRadius: "5px",
					padding: "20px 40px",
					width: "800px",
                    minWidth: "600px",
                    maxWidth: "60%"
				}
			}}
			>
				<DialogTitle id="responsive-dialog-title">Success!</DialogTitle>

				<form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
					<DialogContent>
						<Typography variant="subtitle1">New provider successfully added with the following details:</Typography>
						<br /> <br />
							<Typography variant="subtitle2" gutterBottom>
								<table>
									<tbody>
										<tr><td>Name:</td><td><ProviderName 	
																	title={newProvider.title}
																	firstname={newProvider.firstname}
																	lastname={newProvider.lastname}
																/></td></tr>
										<tr><td>Role:</td><td>{newProvider.provider_role.role}</td></tr>
										<tr><td>Office:</td><td>{newProvider.office.name}</td></tr>
										<tr><td>Email:</td><td>{newProvider.email}</td></tr>
										<tr><td>Office phone:</td><td>{newProvider.phone_office}</td></tr>
										<tr><td>Care group:</td><td>{newProvider.provider_group.name}</td></tr>
									</tbody>
								</table>
							</Typography> 

						<br /> <br />

						{enableLogin && 
							<Fragment>
								<Typography variant="subtitle1" gutterBottom>
									New provider can login for the first time with their registered email address, {newProvider.email}, and temporary password. 
								</Typography>
								<FormCheckbox name="emailLoginCreds" label="emailLoginCreds" value={true}/>
								<Typography variant="subtitle2" inline gutterBottom> 
									Email new provider with login credentials? 
								</Typography>
							</Fragment> }

						{!enableLogin && 
							<Fragment>
								<Typography variant="subtitle1" gutterBottom>
									This provider will <strong>NOT HAVE</strong> permissions to login to the application themselves.
								</Typography>
							</Fragment> }

						<Typography  variant="subtitle1" gutterBottom>
							Provider details and login permissions can be edited and/or updated at any time using the 'manage provider' menu. 
						</Typography>
						<br />
					</DialogContent>

					<DialogActions style={{margin: "0 20px 20px 0"}}>
						<BtnGroup 
							btns={[{btn: "done", type: "submit", id: "1"}]} 
							handleBtns={this.handleRedirects} 
							/>
					</DialogActions>	

				</form>
			</Dialog>
	}
}

ProviderSaveDialog.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

const formData = {
    form: 'EmailNewProviderForm', //unique identifier for this form   
}

const mapStateToProps = (state) => {
	console.log("State : ", state);
	return {
		newProvider: state.providerSave.info,
        loadingNewProvider: state.providerSave.loading,
		errorNewProvider: state.providerSave.error,
	}
};

ProviderSaveDialog = withRouter(ProviderSaveDialog)
ProviderSaveDialog = reduxForm(formData)(ProviderSaveDialog)
ProviderSaveDialog = connect(mapStateToProps) (ProviderSaveDialog)
export default withMobileDialog()(ProviderSaveDialog);