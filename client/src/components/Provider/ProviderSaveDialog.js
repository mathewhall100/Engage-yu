import React, { Fragment } from 'react';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, withMobileDialog, Typography, Grid} from '@material-ui/core'
import BtnGroup from '../UI/Buttons/btnGroup'
import FormCheckbox from '../UI/Forms/formCheckbox'
import DialogSaveFailure from '../UI/Dialogs/dialogSaveFailure'
import DialogSaving from '../UI/Dialogs/dialogSaving'
import { emailNewProvider } from '../../actions'


class ProviderSaveDialog extends React.Component {

	state = {
		open: true
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleRedirects = (btn) => {
		this.props.history.push({pathname: '/admin/dashboard'})
	}

	submit = (values) => {
		console.log("Submitted values: ", values)
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

				This passowod is temporary and you will be prompted to cahnge it to a more secure passord of your choice when you first login. 
				Note that you will also recieve a separate email from our authorization system asking you to confirm your email address. 
				
				Regards
				The Engage-Yu team
				`
		}
		this.props.dispatch(emailNewProvider(msg))
		this.handleClose()
	}

	render() {
		const { fullScreen, handleSubmit, newProvider, loadingNewProvider, errorNewProvider, enableLogin } = this.props;

		if (errorNewProvider) 
			return <DialogSaveFailure text="An error ocurred and this provider's details could not be saved at this time." cancelUrl={"/admin/find"} /> 
		
		else if (loadingNewProvider && !newProvider._id) 
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
									<Typography variant="subtitle2" gutterBottom>{newProvider.role}</Typography> 
									<Typography variant="subtitle2" gutterBottom>{newProvider.office.name}</Typography> 
									<Typography variant="subtitle2" gutterBottom>{newProvider.email}</Typography> 
									<Typography variant="subtitle2" gutterBottom>{newProvider.phone[0].number}</Typography> 
									<Typography variant="subtitle2" gutterBottom>{newProvider.provider_group_name}</Typography> 
								</Grid>
							</Grid>
							<br /> <br />

							{enableLogin && <Fragment>
								<Typography variant="subtitle1" gutterBottom>
									New provider can login for the first time with their registered email address, {newProvider.email}, and temporary password. 
								</Typography>
								
									<FormCheckbox name="includePwd" label="includePwd" value={true}/>
									<Typography variant="subtitle2" inline gutterBottom> 
										Email new provider with login credentials. 
									</Typography>
							
								
							</Fragment> }

							{!enableLogin && <Fragment>
								<Typography variant="subtitle1" gutterBottom>
									This provider will NOT HAVE permissions to login to the application themselves.
								</Typography>
							</Fragment> }

							<Typography  variant="subtitle1" gutterBottom>
								If any provider details and login permissions can be edited and/or updated by using the manage provider menu. 
							</Typography>
							<br />
						</DialogContent>

						<DialogActions style={{margin: "0 20px 20px 0"}}>
							<BtnGroup 
								type="submit"
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