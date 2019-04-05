import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, withMobileDialog, Typography, Grid} from '@material-ui/core'
import BtnGroup from '../UI/Buttons/btnGroup'
import DialogSaveFailure from '../UI/Dialogs/dialogSaveFailure'
import DialogSaving from '../UI/Dialogs/dialogSaving'
import { loadCareGroup } from '../../actions'


class CareGroupSaveDialog extends React.Component {

	state = {
		open: true
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleRedirects = (btn) => {
		switch (btn) {
			case 'edit': 
				this.props.dispatch(loadCareGroup(this.props.newCareGroup._id))
				this.props.history.push({pathname: '/admin/caregroup/update'})
				break;
			default: 
				this.props.history.push({pathname: '/admin/dashboard'})
		}
	}

	render() {
		const { fullScreen, newCareGroup, loadingNewCareGroup, errorNewCareGroup} = this.props;

		if (errorNewCareGroup) 
			return <DialogSaveFailure text="An error ocurred and this Care Group  could not be added at this time." cancelUrl={"/admin/find"} /> 
		
        else if (loadingNewCareGroup && !isEmpty(newCareGroup)) 
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
						<Typography variant="subtitle1">New Care group successfully added with the following details:</Typography>
						<br /> <br />
						<Grid container spacing={24} >
							<Grid item xs={2}>
								<Typography variant="subtitle2" gutterBottom>Name:</Typography> 
							</Grid>
							<Grid item xs={10}>
								<Typography variant="subtitle2" gutterBottom>{newCareGroup.group_name}</Typography> 
							</Grid>
						</Grid>
						<br /> <br />
						<Typography variant="subtitle1">
							Click 'done' to return to dashboard or, if these details are incorrect, click 'edit' to make changes.
						</Typography>
					</DialogContent>
					<DialogActions style={{margin: "0 20px 20px 0"}}>
						<BtnGroup 
							btns={[
								{btn: "edit", type: "button", id: "0"},
								{btn: "done", type: "button", id: "1"}
							]} 
							handleActionBtns={this.handleRedirects} 
							/>
					</DialogActions>
				</Dialog>
	}
}

CareGroupSaveDialog.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
	console.log("State : ", state);
	return {
		newCareGroup: state.careGroupSave.info,
        loadingNewCareGroup: state.careGroupSave.loading,
        errorNewCareGroup: state.careGroupSave.error
	}
};

CareGroupSaveDialog = withRouter(CareGroupSaveDialog)
CareGroupSaveDialog = connect(mapStateToProps) (CareGroupSaveDialog)
export default withMobileDialog()(CareGroupSaveDialog);