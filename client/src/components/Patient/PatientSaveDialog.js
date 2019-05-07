import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CallBack from '../UI/callback'
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, withMobileDialog, Typography } from '@material-ui/core'
import BtnGroup from '../UI/Buttons/btnGroup'
import DialogSaveFailure from '../UI/Dialogs/dialogSaveFailure'
import DialogSaving from '../UI/Dialogs/dialogSaving'
import { loadPatient } from '../../actions'
import ProviderName from '../UI/providerName'

class PatientSaveDialog extends React.Component {

	state = {
		open: true
	};

	handleRedirects = (btn) => {
		switch (btn) {
			case 'create diary card': 
				this.props.dispatch(loadPatient(this.props.newPatient._id))
				this.props.history.push({pathname: '/admin/survey'})
				break;
			case 'edit':
				this.props.dispatch(loadPatient(this.props.newPatient._id))
				this.props.history.push({pathname: '/admin/patient/update'})
				break;
			default: 
				this.props.history.push({pathname: '/admin/dashboard'})
		}
	}

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { fullScreen, newPatient, loadingNewPatient, errorNewPatient} = this.props;

		if (errorNewPatient) 
			return <DialogSaveFailure text="An error ocurred and this patient's details could not be saved at this time." cancelUrl={"/admin/find"} /> 
		
		else if (loadingNewPatient && !newPatient._id) 
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
						border: "2px solid  #28353d",
						borderRadius: "5px",
						padding: "20px 40px",
						width: "800px",
						minWidth: "600px",
						maxWidth: "60%"
					}
				}}
				>
					{errorNewPatient && 
						<DialogContent>
							Error: {errorNewPatient.message}
						</DialogContent>}

					{loadingNewPatient &&
						<DialogContent>
							<CallBack text="Saving..." />
						</DialogContent>}
						
					{newPatient && newPatient.firstname && <Fragment>
						<DialogTitle id="responsive-dialog-title">Success!</DialogTitle>
						<DialogContent>
							<Typography variant="subtitle1">New patient successfully enrolled with the following details:</Typography>
							<br /><br />
								<Typography variant="subtitle2" gutterBottom>
									<table>
										<tbody>
											<tr><td style={{width: "160px"}}>Name:</td><td>{newPatient.firstname} {newPatient.lastname}</td></tr>
											<tr><td style={{width: "160px"}}>DOB:</td><td>{newPatient.dob}</td></tr>
											<tr><td style={{width: "160px"}}>Gender:</td><td>{newPatient.gender}</td></tr>
											<tr><td style={{width: "160px"}}>Email:</td><td>{newPatient.email}</td></tr>
											<tr><td style={{width: "160px"}}>Contact phone:</td><td>{newPatient.phone}</td></tr>
											<tr><td style={{width: "160px"}}>Hospital Number:</td><td>{newPatient.hospital_id}</td></tr>
											<tr><td style={{width: "160px"}}>Primary provider:</td><td><ProviderName 
																											title={newPatient.primary_provider.title} 
																											firstname={newPatient.primary_provider.firstname} 
																											lastname={newPatient.primary_provider.lastname} 
																										/></td></tr>													
										</tbody>
									</table>
								</Typography>
							<br /><br />
							<Typography variant="subtitle1" style={{fontWeight: 500}} >
								An email has been sent to {newPatient.email} with the temporary password so that they can login to to the application.
							</Typography>
							<br />
							<Typography variant="subtitle1">
								Click 'done' to return to dashboard, 'create Diary' to create the first diary card exercise for this patient or, if any of the details above are incorrect, click 'edit' to make changes.
							</Typography>
						</DialogContent>
						<DialogActions style={{margin: "0 20px 20px 0"}}>
							<BtnGroup 
								btns={[
									{btn: "create diary card", type: "button", id: "0"},
									{btn: "edit details", type: "button", id: "1"},
									{btn: "done", type: "button", id: "2"}
								]} 
								handleBtns={this.handleRedirects} 
							/>
						</DialogActions>
					</Fragment> }

			</Dialog>	
	}
}

PatientSaveDialog.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
	//console.log("State : ", state);
	return {
		newPatient: state.patientSave.info,
		loadingNewPatient: state.patientSave.loading,
		errorNewPatient: state.patientSave.error
	}
};

PatientSaveDialog = withRouter(PatientSaveDialog)
PatientSaveDialog = connect(mapStateToProps) (PatientSaveDialog)
export default withMobileDialog()(PatientSaveDialog);