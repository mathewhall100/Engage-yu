import React, { Component, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, withMobileDialog, Typography, Grid} from '@material-ui/core'
import BtnGroup from '../UI/Buttons/btnGroup'
import FormCheckbox from '../UI/Forms/formCheckbox'
import DialogSaveFailure from '../UI/Dialogs/dialogSaveFailure'
import DialogSaving from '../UI/Dialogs/dialogSaving'
import { emailNewProvider } from '../../actions'


class ProviderSaveDialog extends Component {

	componentDidMount() {
		console.log("providerSaveDialog: ", this.props.enableLogin)
	}


	state = {
		open: true
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleRedirects = () => {
		this.handleClose()
		this.props.history.push({pathname: '/admin/provider/find'})
	}

	submit = (values) => {
		console.log("Submitted values: ", values)
		if (values.emailLoginCreds) {
			const { newProvider } = this.props
			const fullName = `Dr. ${newProvider.firstname} ${newProvider.lastname}`;
			const msg = {
				email: newProvider.email,
				name: "admin @engage-yu",
				subject: `${fullName}: Welcome to Engage-yu`,
				text: `
					${fullName}
					Welcome to Engage-Yu
					You have been registered with the Engage-Yu application by your colleague, Dr. ${localStorage.getItem("user_provider_firstname")} ${localStorage.getItem("user_provider_lastname")}. 
					You may now log in and use the application with the following credentials: 
						email : 	${newProvider.email}
						password: 	${newProvider.password}

					This passowod is temporary and you will be prompted to change it to a more secure passord of your choice when you first login. Note that before you can login, you must have verified your email address by following the instructions on a separate email we have sent you. 
					
					Regards
					The Engage-Yu team
					`
			}
			this.props.dispatch(emailNewProvider(msg))
		}
		this.handleRedirects()
	}

	render() {
		const { fullScreen, handleSubmit, newProvider, loadingNewProvider, errorNewProvider, enableLogin } = this.props;

		if (errorNewProvider) 
			return <DialogSaveFailure text="An error ocurred and this provider's details could not be saved at this time." cancelUrl={"/admin/provider/find"} /> 
		
		else if (loadingNewProvider || isEmpty(newProvider))
			return <DialogSaving />
		
		else
			return <Dialog
				fullScreen={fullScreen}
				open={this.state.open}
				disableBackdropClick 
				onClose={this.handleClose}
				aria-labelledby="responsive-dialog-title"
				PaperProps={{
					style: {
					padding: "40px",
					width: "60%",
					}
				}}
				>
					<DialogTitle id="responsive-dialog-title">Success!</DialogTitle>

					<form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
						<DialogContent>
							<Typography variant="subtitle1">New provider successfully added with the following details:</Typography>
							<br /> <br />
							<Grid container spacing={24} >
								<Grid item xs={6}>
									<Typography variant="subtitle2" gutterBottom>Name:</Typography> 
									<Typography variant="subtitle2" gutterBottom>Role:</Typography> 
									<Typography variant="subtitle2" gutterBottom>Office:</Typography> 
									<Typography variant="subtitle2" gutterBottom>Email:</Typography> 
									<Typography variant="subtitle2" gutterBottom>Office phone:</Typography> 
									<Typography variant="subtitle2" gutterBottom>Care group:</Typography> 
								</Grid>
								<Grid item xs={6}>
									<Typography variant="subtitle2" gutterBottom>{newProvider.firstname} {newProvider.lastname}</Typography> 
									<Typography variant="subtitle2" gutterBottom>{newProvider.provider_role.role}</Typography> 
									<Typography variant="subtitle2" gutterBottom>{newProvider.office.name}</Typography> 
									<Typography variant="subtitle2" gutterBottom>{newProvider.email}</Typography> 
									<Typography variant="subtitle2" gutterBottom>{newProvider.phone_office}</Typography> 
									<Typography variant="subtitle2" gutterBottom>{newProvider.provider_group.name}</Typography> 
								</Grid>
							</Grid>
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