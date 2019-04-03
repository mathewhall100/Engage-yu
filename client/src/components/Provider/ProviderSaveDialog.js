import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, withMobileDialog, Typography, Grid} from '@material-ui/core'
import BtnGroup from '../UI/Buttons/btnGroup'
import DialogSaveFailure from '../UI/Dialogs/dialogSaveFailure'
import DialogSaving from '../UI/Dialogs/dialogSaving'
import { loadProvider } from '../../actions'


class ProviderSaveDialog extends React.Component {

	state = {
		open: true
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleRedirects = (btn) => {
		switch (btn) {
			case 'edit': 
				this.props.dispatch(loadProvider(this.props.newProvider._id))
				this.props.history.push({pathname: '/admin/provider/update'})
				break;
			default: 
				this.props.history.push({pathname: '/admin/dashboard'})
		}
	}

	render() {
		const { fullScreen, newProvider, loadingNewProvider, errorNewProvider} = this.props;

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
					width: "60%"
					}
				}}
				>
					<DialogTitle id="responsive-dialog-title">Success!</DialogTitle>
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
						<Typography variant="subtitle1">>
							Click 'done' to return to dashboard or, if any of the details above are incorrect, click 'edit' to make changes.
						</Typography>
					</DialogContent>
					<DialogActions style={{margin: "0 20px 20px 0"}}>
						<BtnGroup 
							btns={[
								{btn: "edit", id: "0"},
								{btn: "done", id: "1"}
							]} 
							handleActionBtns={this.handleRedirects} 
							/>
					</DialogActions>
				</Dialog>
		
	}
}

ProviderSaveDialog.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
	console.log("State : ", state);
	return {
		newProvider: state.providerSave.info,
        loadingNewProvider: state.providerSave.loading,
        errorNewProvider: state.providerSave.error
	}
};

ProviderSaveDialog = connect(mapStateToProps) (ProviderSaveDialog)
export default withMobileDialog()(ProviderSaveDialog);