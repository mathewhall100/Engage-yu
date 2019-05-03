import React, { Component, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { startCase, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { withStyles, Dialog, DialogActions, DialogContent, DialogTitle, withMobileDialog,  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Checkbox, Typography, Grid, Tooltip} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import BtnGroup from '../UI/Buttons/btnGroup'
import FormSelect from '../UI/Forms/formSelect'
import ProviderSelect from '../UI/Forms/FormProviderSelect'
import DialogSaveFailure from '../UI/Dialogs/dialogSaveFailure'
import DialogSaving from '../UI/Dialogs/dialogSaving'
import ProviderName from '../UI/providerName'
import providerAPI from "../../utils/provider.js";
//import { emailReport } from '../../actions'

const styles = theme => ({
	expRoot: {
        width: '360px',
	},
	heading: {
		fontSize: theme.typography.pxToRem(16),
		fontWeight: theme.typography.fontWeightMedium,
		marginLeft: "15px"
    },
    deleteIcon: {
        margin: "4px 0 0 10px",
        fontSize: "24px",
        color: "#888",
        '&:hover': {
            color: theme.palette.primary.main,
            cursor: "pointer"
        }
    },
    expandIcon: {
        fontSize: "26px",
        '&:hover': {
            color: theme.palette.primary.main,
            cursor: "pointer"
        }
    },
    fwMedium: {
        fontWeight: 500
    }
});

class ReportEmailDialog extends Component {

    componentDidMount() {
        let providers = [];
        providerAPI.findAllByGroup(localStorage.getItem("user_provider_group_id"))
        .then(res => {
            console.log("res.data: ", res.data);       
            providers = res.data.providerList.map(provider => {
                let val = [
                    provider._id, 
                    provider.title,
                    provider.firstname,
                    provider.lastname,
                    provider.provider_role.role,
                    provider.provider_group.name,
                    provider.office.name,
                    provider.email
                ];
                return {
                    value: val,
                    text: <ProviderName title={val[1]} firstname={val[2]} lastname={val[3]} />,
                };
            })
            if (providers && providers.length > 0) {
                this.setState({providers: providers}, () => {this.getInitialRecipients()} )
            } 
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
            this.setState({providers: []})
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.recipients.length > 0 && nextProps.reportForm.values && nextProps.reportForm.values !== this.props.reportForm.values) {
            this.addRecipientToList(nextProps.reportForm.values)
        }
    }

	state = {
        providers: [],
        recipients: [],
		open: true
    };
    
    getPatient = () => {
        const { patientInfo } = this.props
        if (patientInfo) {return `${startCase(patientInfo.firstname)} ${startCase(patientInfo.lastname)}`}
    }

    getDiaryCard = () => {
        const reportEpisode = JSON.parse(localStorage.getItem("report_episode"))
        const start = moment(reportEpisode.start_date).format('MMMM Do YYYY')
        const end = moment(reportEpisode.end_date).format('MMMM Do YYYY')
        return `${start} - ${end}`
    }

    getInitialRecipients = () => {
        const { providers } = this.state
        const reportEpisode = JSON.parse(localStorage.getItem("report_episode"))
        let primProvider = providers.filter(provider => {return provider.value[0] === this.props.patientInfo.primary_provider.id})
        let reqProvider = providers.filter(provider => {return provider.value[0] === reportEpisode.requesting_provider.id}) 
        primProvider = [...primProvider[0].value, "(primary provider)"]
        reqProvider = [...reqProvider[0].value, "(requesting provider)"]
        let reportTos = []
        if (!isEmpty(reportEpisode.report_to)) {
            reportEpisode.report_to.map(to => {
                const reportTo = providers.filter(provider => {return provider.value[0] === to.id}) 
                reportTos.push(reportTo[0].value)
            })
        }
        this.setState({ recipients: [primProvider, reqProvider, ...reportTos] })
    }

    addRecipientToList = (recipient) => {
        let recipients = this.state.recipients
        if (!recipients.includes(recipient.provider)) {
            recipients.push(recipient.provider)
        }
        this.setState({recipients: recipients})
        this.props.reset('ReportEmailForm')
    }

    removeRecipientFromList = (recipient) => {
        let recipients = this.state.recipients
        if (recipients.includes(recipient)) {
            recipients.splice(recipients.indexOf(recipient), 1)
            this.setState({recipients: recipients})
        }
    }

	handleClose = () => {
		this.setState({ open: false });
	};

	handleBtns = (index) => {
        console.log("handleBtns: ", index)
		if (index === "send") {
            this.state.recipients.map(recipient => {return console.log("email: ", recipient[7])})
        }
        else if (index === "cancel") {
            this.handleClose()
        }

    }

	submit = (values) => {
        const { patientInfo } = this.props
		console.log("Submitted values: ", values)
		const patient = patientInfo ? `${startCase(patientInfo.firstname)} ${startCase(patientInfo.lastname)}` : null
        const { newProvider } = this.props
        const fullName = `Dr. ${newProvider.firstname} ${newProvider.lastname}`;
        const msg = {
            email: "mathew.hall100@gmail.com",  // email recipients
            name: "admin @engage-yu",
            subject: `${patient}: Diary card report for patent: `,
            text: "",
            html: `<H3>Diary Card report for ${patient} is ready to be veiwed</h3>
                    <p>Login to the Engage-Yu application to view the report and respond to the patient.</p>
                    <p>Regards</p>
                    <p>The Engage-Yu team</p>`,
            }
			//this.props.dispatch(emailReport(msg))
    }

	render() {
        const { classes, fullScreen, handleSubmit, errorReport, loadingReport, ReportEmail } = this.props;
        const { providers, recipients } = this.state
        
        const RenderReportEmailSuccess = () =>
            <Fragment />

        const RenderEmailRecipientPanel = (props) =>
            <ExpansionPanel className={classes.expRoot} >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>}>
                    <Typography variant="subtitle1">
                        <ProviderName title={props.recipient[1]} firstname={props.recipient[2]} lastname={props.recipient[3]} />
                        <span style={{marginLeft: "10px"}}>{props.recipient[8]}</span>
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails >
                    <Typography variant="subtitle2">
                        <table style={{marginTop: "-15px"}}>
                            <tbody>
                                <tr><td style={{width: "80px"}}>Email: </td><td>{props.recipient[7]}</td></tr>
                                <tr><td style={{width: "80px"}}>Office: </td><td>{props.recipient[6]}</td></tr>
                                <tr><td style={{width: "80px"}}>Role: </td><td>{props.recipient[4]}</td></tr>
                                <tr><td style={{width: "80px"}}>Care group: </td><td>{props.recipient[5]}</td></tr>
                            </tbody>
                        </table> 
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

		if (errorReport) 
            return <DialogSaveFailure text="An error ocurred and email could not be sent at this time." cancelUrl={"/admin/reportfull"} /> 
		
		if (loadingReport)
			return <DialogSaving />

        if (ReportEmail)
            <RenderReportEmailSuccess />
		
        return <Dialog
            fullScreen={fullScreen}
            open={this.state.open}
            disableBackdropClick 
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
            PaperProps={{
                style: {
                border: "2px solid #2d404b",
                borderRadius: "5px",
                padding: "20px 40px",
                width: "60%",
                }
            }}
            >
                <DialogTitle id="responsive-dialog-title">Email Report</DialogTitle>

                    <DialogContent>

                        <Typography variant="subtitle1">
                            The report on {this.getPatient()}'s diary card:  {this.getDiaryCard()} will be sent to the following recipients:
                            <br /> <br />
                        </Typography>
                        
                        <div style={{width: "360px"}}>
                            {recipients && recipients.map((recipient, idx) => {
                                return (
                                    <table key={idx}>
                                        <tbody>
                                            <tr>
                                                <td><RenderEmailRecipientPanel key={idx} recipient={recipient}/></td>
                                                <td>
                                                    <Tooltip title="Remove recipient from email list" placement="right" enterDelay={300}>
                                                        <DeleteIcon className={classes.deleteIcon} onClick={() => this.removeRecipientFromList(recipient)}/>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )
                            })} 
                            <br /><br />
                            <Typography variant="subtitle1" className={classes.fwMedium} inline>
                                Add recipient: 
                            </Typography>
                            <div style={{marginTop: "-26px", float: "right"}}>
                                <form>
                                    <FormSelect 
                                        name="provider" 
                                        label="Select recipient" 
                                        width="200" 
                                        items={providers} 
                                        value={providers[0]}
                                        helpText={false}
                                    />
                                </form>
                            </div>
                        </div>
                       
                    </DialogContent>

                    <DialogActions style={{margin: "0 20px 20px 0"}}>
                        <BtnGroup 
                            btns={[
                                {btn: "send", type: "button", id: "1"},
                                {btn: "cancel", type: "button", warning: true, id: "2"},
                            ]} 
                            handleBtns={this.handleBtns} 
                        />
                    </DialogActions>	

            </Dialog>	
	}
}

ReportEmailDialog.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

const formData = {
    form: 'ReportEmailForm', //unique identifier for this form   
}

const mapStateToProps = (state) => {
	console.log("State : ", state);
	return {
        patientInfo: state.patient.patient.patientInfo,
        // reportEmail: 
        // loadingReportEmail:
        // errorReportEmail:

        reportForm: state.form.ReportEmailForm
	}
};

ReportEmailDialog = withRouter(ReportEmailDialog)
ReportEmailDialog = reduxForm(formData)(ReportEmailDialog)
ReportEmailDialog = connect(mapStateToProps)(ReportEmailDialog)
ReportEmailDialog = withStyles(styles)(ReportEmailDialog)
export default withMobileDialog()(ReportEmailDialog);