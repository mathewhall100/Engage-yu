import React, { Component, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles, Dialog, DialogContent, DialogTitle, withMobileDialog, Typography} from '@material-ui/core';
import BtnAction from '../UI/Buttons/btnAction'
import FormBox from '../UI/Forms/formBox'
import CallBack from '../UI/callback'
import { validateIsRequired } from '../../logic/formValidations';
import { updateEpisodeStatus, loadPatient } from '../../actions'
import ProviderName from '../UI/providerName'

const styles = theme => ({
	textField: {
	width: "100%",
	}
})

class ReportStatusUpdateDialog extends Component {
	componentDidMount() {
		this.props.dispatch(updateEpisodeStatus("reset"))
	}

	state = {
		open: true,
		msgActionConfirmed: false
	};

	//Handle form submission and save 
	submit(values) {
		this.props.dispatch(updateEpisodeStatus(values, this.props.newStatus, this.props.patientDataId, this.props.episode._id ))
		this.setState({msgActionConfirmed: true})
	}

	handleConfirm = () => {
		const values = null
		this.props.dispatch(updateEpisodeStatus(values, this.props.newStatus, this.props.patientDataId, this.props.episode._id ))
		this.setState({msgActionConfirmed: true})
	}

	handleDone = () => {
		this.props.dispatch(loadPatient(this.props.patientId))
		this.props.dispatch(updateEpisodeStatus("reset"))
		this.handleClose()
	}

	handleClose = () => {
		this.setState({open: false});
	};


	render() {
	const { fullScreen, classes, handleSubmit, pristine, update, errorUpdate, loadingUpdate, newStatus } = this.props;
	const { msgActionConfirmed } = this.state;

	return (
		<Dialog
			fullScreen={fullScreen}
			open={this.state.open}
            onClose={this.handleClose}
            disableBackdropClick 
			aria-labelledby="responsive-dialog-title"
			PaperProps={{
				style: {
				padding: "40px",
				width: "800px",
				maxWidth: "60%"
				}
			}}
			>
				{newStatus === "actioned" && <DialogTitle id="responsive-dialog-title">MARK DIARY CARD AS ACTIONED</DialogTitle> }
				{newStatus === "archived" && <DialogTitle id="responsive-dialog-title">ARCHIVE DIARY CARD'</DialogTitle> }
				{newStatus === "cancelled" && <DialogTitle id="responsive-dialog-title">CANCEL DIARY CARD</DialogTitle> }

					<DialogContent>
						{errorUpdate ? 
							<Fragment>
								<br /> <br />
								<Typography variant="subtitle1" gutterBottom>
									Unfortuneately an error occurred and the requested action coulod not be performed. Please go back and try again.
								</Typography>
								<br /> <br />
								<BtnAction text="close" handleAction={this.handleClose} />
							</Fragment>
							:
							loadingUpdate ?
								<CallBack />
								:
								update && msgActionConfirmed ?
									<Fragment>
										<br /> <br />
										<Typography variant='h6'>SUCCESS!</Typography>
										<br />
										<Typography variant="subtitle1" gutterBottom>
											{newStatus === "actioned" && "Diary card actioned." }
											{newStatus === "archived" && "Diary card archived." }
											{newStatus === "cancelled" && "Diary card cancelled." }
										</Typography>
										<br /> <br />
										<BtnAction text="done" handleAction={this.handleDone} />
									</Fragment>
									:
									<Fragment>
										<Typography variant="subtitle1" gutterBottom>
											{newStatus === "actioned" && "Optional patient message, for example to report back to them your analysis of their diary card or make a recommendation based on the results."}
											{newStatus === "archived" && "Click 'achive' to archive this diary card. Archived dairy cards can always be found in searches and reviewed via the archived panel of the report page but will no longer show up on the dashboard."}
											{newStatus === "cancelled" && "Optional patient message, for example to let the patient know the diary card has been cancelled."}
										</Typography>
										<br /><br />

										{(newStatus === "actioned" || newStatus === "cancelled") && 
											<Fragment>
												<Typography variant="subtitle1" gutterBottom>Enter message</Typography> 

												<form className={classes.formContainer} noValidate onSubmit={handleSubmit(this.submit.bind(this))}>
													<FormBox name="title" label="Title" rows="1" />
													<FormBox name="msg" label="Message" rows="3" />
													<br />
													<Typography variant="subtitle2" align="right">
														Sent by: <ProviderName title={localStorage.getItem("user_provider_title")} firstname={localStorage.getItem("user_provider_firstname")} lastname={localStorage.getItem("user_provider_lastname")}/>
													</Typography>
													<br />
													<BtnAction type="submit" disabled={pristine} text="confirm action and send message" marginRight={true}/>
													<BtnAction type="button" text="confirm action (no message)" handleAction={this.handleConfirm} marginRight={true}/>
													<BtnAction type="button" text="cancel action" handleAction={this.handleClose} warning={true}/>
												</form>
											</Fragment>
										}

										{newStatus === "archived" && 
											<Fragment>
												<br /> <br />
												<BtnAction type="button" text="confirm archive" handleAction={this.handleConfirm} marginRight={true}/>
												<BtnAction type="button" text="cancel" handleAction={this.handleClose} warning={true} />
											</Fragment>
										}
									</Fragment>
						}
					</DialogContent>

			</Dialog>
		);
	}
}

function validate(values) {
	console.log("Error values: ", values) 
	const errors = {}; // error accumulator
	errors.title = validateIsRequired(values.title)
	errors.msg = validateIsRequired(values.msg)
	console.log("Errors: ", errors)
	return errors;
}

ReportStatusUpdateDialog.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

const formData = {
	form: 'MessageForm', //unique identifier for this form
	validate,    
}

const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        update: state.episodeStatusUpdate.update,
        loadingUpdate: state.episodeStatusUpdate.loading,
		errorUpdate: state.episodeStatusUpdate.error,
    }
};

ReportStatusUpdateDialog = withRouter(ReportStatusUpdateDialog)
ReportStatusUpdateDialog = reduxForm(formData)(ReportStatusUpdateDialog)
ReportStatusUpdateDialog = connect(mapStateToProps, null)(ReportStatusUpdateDialog)
ReportStatusUpdateDialog = withStyles(styles, { withTheme: true })(ReportStatusUpdateDialog)
export default withMobileDialog()(ReportStatusUpdateDialog);