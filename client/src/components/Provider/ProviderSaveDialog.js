import React, { Component, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { withMobileDialog, Typography } from '@material-ui/core'
import BtnAction from '../UI/Buttons/btnAction'
import FormCheckbox from '../UI/Forms/formCheckbox'
import DialogCustom from '../UI/Dialogs/dialogCustom'
import DialogError from '../UI/Dialogs/dialogError'
import CallBack from '../UI/callback'
import ProviderName from '../UI/providerName'
import { getHtmlMsg } from "./providerAddEmail"
import { mailer } from '../../actions'


class ProviderSaveDialog extends Component {

	state = {
		open: true
	};

	submit = (values) => {
		console.log("Submitted values: ", values)
		// If email and password entered for new provider, send welcome email
		if (values.emailLoginCreds) {
			this.props.dispatch(mailer(getHtmlMsg(this.props.newProvider)))
		}
		this.props.history.push({pathname: '/admin/provider/find'})
	}

	render() {
		const { handleSubmit, newProvider, loadingNewProvider, errorNewProvider, enableLogin } = this.props;

		if (errorNewProvider) 
			return <DialogError text="An error ocurred and this provider's details could not be saved at this time." cancelUrl={"/admin/provider/find"} /> 
		
		if (loadingNewProvider || isEmpty(newProvider))
			return <CallBack text="Saving..." />

		return (
			<DialogCustom title="Success!" width="800px">
				<form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>

					<Typography variant="subtitle1">New provider successfully added with the following details:</Typography>
					<br /> <br />

					<Typography variant="subtitle2" gutterBottom>
						<table>
							<tbody>
								<tr>
									<td>Name:</td>
									<td><ProviderName 	
											title={newProvider.title}
											firstname={newProvider.firstname}
											lastname={newProvider.lastname}
										/>
									</td>
								</tr>
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
						</Fragment>
					}

					{!enableLogin && 
						<Typography variant="subtitle1" gutterBottom>
							This provider will <strong>NOT HAVE</strong> permissions to login to the application themselves.
						</Typography>
					 }

					<Typography  variant="subtitle1" gutterBottom>
						Provider details and login permissions can be edited and/or updated at any time using the 'manage provider' menu. 
					</Typography>
					<br /><br />

					<BtnAction type="submit" text="Done" />

				</form>
			</DialogCustom>
		)
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