import React, { Component, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { startCase, isEmpty, upperFirst } from 'lodash';
import PropTypes from 'prop-types';
import { withStyles, Dialog, DialogActions, DialogContent, DialogTitle, withMobileDialog,  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography,Tooltip} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import BtnGroup from '../UI/Buttons/btnGroup'
import BtnCloseIcon from '../UI/Buttons/btnCloseIcon'
import FormSelect from '../UI/Forms/formSelect'
import ProviderName from '../UI/providerName'
import CallBack from '../UI/callback'
import { loadProvidersByCareGroup, mailer } from '../../actions';


const styles = theme => ({
    expRoot: {
        width: "360px"
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
    closeIcon: {
		float: "right",
		position: 'relative', top: "-4px", left: "16px",
	},
    addRecipientBox: {
        width: "360px",
    }
});

class ReportEmailDialog extends Component {

    componentDidMount() {
        const id = localStorage.getItem("user_provider_group_id")
        if (this.props.providers && this.props.providers.length) {
            this.setState({providers: this.props.providers}, () => this.getInitialRecipients())
        } else {
            this.props.dispatch(loadProvidersByCareGroup(id))
        }
        this.props.dispatch(mailer("reset"))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.reportForm && this.props.reportForm && nextProps.reportForm.values !== this.props.reportForm.values) {
            this.addRecipientToList(nextProps.reportForm.values)
        }
        if (nextProps.providers && nextProps.providers.length && nextProps.providers !== this.props.providers) {
            this.setState({providers: nextProps.providers}, () => this.getInitialRecipients())
        }
    }

    componentWillUnmount() {
        this.props.dispatch(mailer("reset"))
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
        const episode = this.props.episode
        if (episode) {
            const start = moment(episode.start_date).format('MMMM Do YYYY')
            const end = moment(episode.end_date).format('MMMM Do YYYY')
            return `${start} - ${end}`
        }
    }

    getInitialRecipients = () => {
        const { providers } = this.state
        const episode = this.props.episode
        let reportTos = [];
        if (!isEmpty(episode.report_to)) {
            reportTos = episode.report_to.map(to => {
                return providers.filter(provider => {return provider.value[0] === to.id})[0].value
            })
        }
        this.setState({ recipients: [...reportTos] })
    }

    addRecipientToList = (recipient) => {
        const { recipients } = this.state;
        if (recipient && !recipients.includes(recipient.provider)) {
            this.setState({recipients: [...recipients, recipient.provider]})
            this.props.reset('ReportEmailForm') 
        }
    }

    removeRecipientFromList = (recipient) => {
        const { recipients } = this.state
        const index = recipients.findIndex(r => r[0] === recipient[0])
        this.setState({recipients: [...recipients.slice(0,index), ...recipients.slice(index+1)] })
    }

	handleClose = () => {
		this.setState({ open: false });
	};

	handleBtns = (index) => {
		if (index === "send") {
            const { patientInfo } = this.props
            const patient = patientInfo ? `${startCase(patientInfo.firstname)} ${startCase(patientInfo.lastname)}` : null
            const emailTo = this.state.recipients.map(recipient => {return recipient[8]})
            console.log("email To: ", emailTo)
            const msg = {
                email: emailTo, 
                name: "admin @engage-yu",
                subject: `${patient}: Diary card report for patent: `,
                text: "",
                html: `<H3>Diary Card report for ${patient} is ready to be veiwed</h3>
                        <p>Login to the Engage-Yu application to view the report and respond to the patient.</p>
                        <p>Regards</p>
                        <p>The Engage-Yu team</p>`,
                }
                this.props.dispatch(mailer(msg))
        }
        else if (index === "cancel" || index === "finish") {
            this.handleClose()
        } else null
    }

    getRecipientName = (recipient) => {
        let addOn = "";
        if (recipient[0] === this.props.patientInfo.primary_provider.id) {
            addOn = "(primary provider)"
        } else if (recipient[0] === this.props.episode.requesting_provider.id) {
            addOn = "(requesting provider)"
        } else {addOn = ""}
        return  <Fragment>
                    <ProviderName 
                        title={recipient[1]} 
                        firstname={recipient[2]} 
                        lastname={recipient[3]} />
                    <span style={{marginLeft: "10px"}}>{addOn}</span>
                </Fragment>
    }
           

	render() {
        const { classes, fullScreen, errorMail, loadingMail, mail } = this.props;
        const { providers, recipients } = this.state
        
        const RenderEmailRecipientPanel = (props) =>
            <ExpansionPanel className={classes.expRoot} >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>}>
                    <Typography variant="subtitle1">
                        {this.getRecipientName(props.recipient)}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails >
                    <Typography variant="subtitle2">
                        <table style={{marginTop: "-15px"}}>
                            <tbody>
                                <tr><td style={{width: "80px"}}>Email: </td><td>{props.recipient[8]}</td></tr>
                                <tr><td style={{width: "80px"}}>Office: </td><td>{startCase(props.recipient[7])}</td></tr>
                                <tr><td style={{width: "80px"}}>Role: </td><td>{upperFirst(props.recipient[4])}</td></tr>
                                <tr><td style={{width: "80px"}}>Care group: </td><td>{startCase(props.recipient[6])}</td></tr>
                            </tbody>
                        </table> 
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>


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

                <span className={classes.closeIcon}><BtnCloseIcon handleBtnClick={this.handleClose}/></span>
                
                <DialogTitle id="responsive-dialog-title">Email Report</DialogTitle>

                    <DialogContent>
                        {loadingMail ? 
                            <CallBack text="Sending email..." fallbackText="For some reason, email is taking time to send. You can wait here for confirmation or click done to continue."/>
                            :
                            errorMail ?
                                <Typography variant="subtitle1" align="justify">
                                    Unfortuneately, a problem was encountered and some or all of the recipients may not have recieved an email. Please check with the recipiemts or try to sens another email.
                                </Typography>
                                :
                                mail.accepted && mail.accepted.length > 0 ? 
                                    <Typography variant="subtitle1" align="justify">
                                        Emails successfully sent
                                    </Typography>
                                    :
                                    <Fragment>
                                        <Typography variant="subtitle1" align="justify">
                                            The report on {this.getPatient()}'s diary card:  {this.getDiaryCard()} will be sent to the following recipients:
                                            <br /> <br />
                                        </Typography>
                                    
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
                                        <div className={classes.addRecipientBox}>
                                            <Typography variant="subtitle1" style={{fontWeight: 500}}inline>
                                                Add recipient: 
                                            </Typography>
                                            <div style={{margin: "-26px 0 0 20px", float: "right"}}>
                                                <form>
                                                    <FormSelect 
                                                        name="provider" 
                                                        label="Select recipient" 
                                                        width="200" 
                                                        items={providers} 
                                                        value={providers[1]}
                                                        helpText={false}
                                                    />
                                                </form>
                                            </div>
                                        </div>
                                    </Fragment>
                        }
                     
                    </DialogContent>

                    <DialogActions style={{margin: "0 20px 20px 0"}}>
                        {loadingMail || errorMail || (mail.accepted && mail.accepted.length > 0) ?
                             <BtnGroup 
                                btns={[
                                    {btn: "finish", type: "button", id: "2"},
                                ]} 
                             handleBtns={this.handleBtns} 
                            />
                            :
                            <BtnGroup 
                                btns={[
                                    {btn: "send", type: "button", id: "1"},
                                    {btn: "cancel", type: "button", warning: true, id: "2"},
                                ]} 
                                handleBtns={this.handleBtns} 
                            />
                        }
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
        episode: state.reportEpisode,
        providers: state.providersByGroup.listProviders,
        loadingProviders: state.providersByGroup.loading,
        errorProviders: state.providersByGroup.error,
        mail: state.mailer.mail,
        loadingMail: state.mailer.loading,
        errorMail: state.mailer.error,
        reportForm: state.form.ReportEmailForm
	}
};

ReportEmailDialog = withRouter(ReportEmailDialog)
ReportEmailDialog = reduxForm(formData)(ReportEmailDialog)
ReportEmailDialog = connect(mapStateToProps)(ReportEmailDialog)
ReportEmailDialog = withStyles(styles)(ReportEmailDialog)
export default withMobileDialog()(ReportEmailDialog);