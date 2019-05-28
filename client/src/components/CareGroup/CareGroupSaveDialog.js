import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { startCase, isEmpty } from 'lodash'
import PropTypes from 'prop-types';
import { withMobileDialog, Typography, Grid} from '@material-ui/core'
import BtnGroup from '../UI/Buttons/btnGroup'
import CallBack from '../UI/callback'
import { loadCareGroup } from '../../actions'
import DialogError from '../UI/Dialogs/dialogError';
import DialogCustom from '../UI/Dialogs/dialogCustom'


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
		const { newCareGroup, loadingNewCareGroup, errorNewCareGroup} = this.props;

		if (errorNewCareGroup) 
			return <DialogError /> 
		
        if (loadingNewCareGroup && !isEmpty(newCareGroup)) 
			return <CallBack text="Saving..." />
		
		return (
			<DialogCustom title="Success!" width="800px">
				<Typography variant="subtitle1">New Care group successfully added with the following details:</Typography>
				<br /> <br />
				<Grid container spacing={24} >
					<Grid item xs={2}>
						<Typography variant="subtitle2" gutterBottom>Name:</Typography> 
					</Grid>
					<Grid item xs={10}>
						<Typography variant="subtitle2" gutterBottom>{startCase(newCareGroup.group_name)}</Typography> 
					</Grid>
				</Grid>
				<br /> <br />
				<Typography variant="subtitle1">
					Click 'done' to return to dashboard or, if these details are incorrect, click 'edit' to make changes.
				</Typography>
				<br /><br />
				<BtnGroup 
					btns={[
						{btn: "edit", type: "button", id: "0"},
						{btn: "done", type: "button", id: "1"}
					]} 
					handleBtns={this.handleRedirects} 
				/>
			</DialogCustom>
		)
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