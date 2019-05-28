import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CallBack from '../UI/callback'
import PropTypes from 'prop-types';
import { withMobileDialog, Typography } from '@material-ui/core'
import BtnGroup from '../UI/Buttons/btnGroup'
import DialogCustom from '../UI/Dialogs/dialogCustom'
import DialogError from '../UI/Dialogs/dialogError'
import { loadPatient } from '../../actions'
import ProviderName from '../UI/providerName'
import { getHtmlMsg } from "./patientEnrollEmail"
import { mailer } from '../../actions'

class PatientSaveDialog extends React.Component {

	componentWillReceiveProps(nextProps) {
		// Send welcome email
		if (nextProps.newPatient !== this.props.newPatient && nextProps.newPatient._id) {
			this.props.dispatch(mailer(getHtmlMsg(nextProps.newPatient)))
		} 
	}

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
		const { newPatient, loadingNewPatient, errorNewPatient} = this.props;
		
		if (loadingNewPatient) 
			return <CallBack text="Saving..." />
			
		if (errorNewPatient ) 
			return <DialogError />
						
		if (newPatient && newPatient.firstname) 
			return (
				<DialogCustom title="Patient Enrolled" width="800px">
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
									<tr>
										<td style={{width: "160px"}}>
											Primary provider:
										</td>
										<td>
											<ProviderName 
												title={newPatient.primary_provider.title} 
												firstname={newPatient.primary_provider.firstname} 
												lastname={newPatient.primary_provider.lastname} 
											/>
										</td>
									</tr>													
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

					<br /><br />

					<BtnGroup 
						btns={[
							{btn: "create diary card", type: "button", id: "0"},
							{btn: "edit details", type: "button", id: "1"},
							{btn: "done", type: "button", id: "2"}
						]} 
						handleBtns={this.handleRedirects} 
					/>

			</DialogCustom>	
		)
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