import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CallBack from '../UI/callback'
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, withMobileDialog, Typography, Grid} from '@material-ui/core'
import BtnGroup from '../UI/Buttons/btnGroup'
import DialogSaveFailure from '../UI/Dialogs/dialogSaveFailure'
import DialogSaving from '../UI/Dialogs/dialogSaving'
import { loadPatient } from '../../actions'


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
					padding: "40px",
					 maxWidth: "60%"
					}
				}}
				>
					{errorNewPatient && <DialogContent>
							Error: {errorNewPatient.message}
					</DialogContent>}

					{loadingNewPatient && <DialogContent>
						<CallBack text="Saving..." />
					</DialogContent>}
						
					{newPatient && newPatient.firstname && <Fragment>
						<DialogTitle id="responsive-dialog-title">Success!</DialogTitle>
						<DialogContent>
							<Typography variant="subtitle1">New patient successfully enrolled with the following details:</Typography>
							<br /><br />
							<Grid container spacing={24} >
								<Grid item xs={6}>
									<Typography variant="subtitle2" gutterBottom>Name:</Typography> 
									<Typography variant="subtitle2" gutterBottom>DOB: </Typography>
									<Typography variant="subtitle2" gutterBottom>Gender</Typography>
									<Typography variant="subtitle2" gutterBottom>Email: </Typography>
									<Typography variant="subtitle2" gutterBottom>Contact phone: </Typography>
									<Typography variant="subtitle2" gutterBottom>Hospital number:</Typography>
									<Typography variant="subtitle2" gutterBottom>Primary provider:</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant="subtitle2" gutterBottom>{newPatient.firstname} {newPatient.lastname}</Typography>
									<Typography variant="subtitle2" gutterBottom>{newPatient.dob}</Typography>
									<Typography variant="subtitle2" gutterBottom>{newPatient.gender}</Typography>
									<Typography variant="subtitle2" gutterBottom>{newPatient.email}</Typography>
									<Typography variant="subtitle2" gutterBottom>{newPatient.phone}</Typography>
									<Typography variant="subtitle2" gutterBottom>{newPatient.hospital_id}</Typography>
									<Typography variant="subtitle2" gutterBottom>{`Dr. ${newPatient.primary_provider_firstname} ${newPatient.primary_provider_lastname}`}</Typography>
								</Grid>
							</Grid>
							<br /><br />
							<Typography variant="subtitle1" >
								<strong>An email wil be sent to {newPatient.email} with the temporary password so that they can login to to the application.</strong> 
							</Typography>
							<br />
							<Typography variant="subtitle1">
								Click 'done' to return to dashboard, 'create Diary' to create a new diary exercise for this patient or, if any of the details above are incorrect, click 'edit' to make changes.
							</Typography>
						</DialogContent>
						<DialogActions style={{margin: "0 20px 20px 0"}}>
							<BtnGroup 
								btns={[
									{btn: "create diary card", type: "button", id: "0"},
									{btn: "edit", type: "button", id: "1"},
									{btn: "done", type: "button", id: "2"}
								]} 
								handleActionBtns={this.handleRedirects} 
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