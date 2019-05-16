import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { startCase } from 'lodash'
import moment from 'moment';
import { withStyles, Card, Grid, Typography } from '@material-ui/core';
import DialogCustom from '../UI/Dialogs/dialogCustom'
import BtnCloseIcon from '../UI/Buttons/btnCloseIcon';
import BtnAction from '../UI/Buttons/btnAction';
import FormText from '../UI/Forms/formText'
import { loadPatient } from '../../actions'
import { providerName } from '../../logic/textFunctions'
import CallBack from '../UI/callback'
import patient_infoAPI from "../../utils/patient_info"


const styles = () => ({
    root: {
        padding: "20px 40px"
    },
    fwMedium: {
        fontWeight: 500,
      },
    hrStyled: {
        opacity: 0.2
    },
    handleBtnIcon: {
        fontSize: "20px", 
    },
})

class DeletePtDisplay extends PureComponent {  
    
    componentWillUnmount() {
        this.props.dispatch(loadPatient("reset"))
    }

    state = {
        activeCards: false
    };

    findNumSurveys = (filter) => {
        const { patientData } = this.props
        if (patientData && patientData.episodes) {
            const activeCards = patientData.episodes.filter(episode => episode.status === filter).length
            if (activeCards) {this.setState({activeCards: true}) }
            return activeCards
        } else {
            this.setState({activeCards: false})
            return null
        }
    }

    authToDelete = (index) => {
        const { patientInfo } = this.props
        const loggedInProviderId = localStorage.getItem("user_provider_id")
        if (patientInfo && patientInfo._id) {
            if (patientInfo.primary_provider.id === loggedInProviderId || patientInfo.enrolled_by.id === loggedInProviderId) {
                return true
            } else {
                return false
            }
        }
    }

    submit(values) {
        console.log("submitted: ", values)
        const { patientInfo } = this.props
        if (values.lastname === patientInfo.lastname) {
            patient_infoAPI.delete(patientInfo._id)
            .then(res => {
                console.log("result: ", res.data)
                this.setState ({success: true})   // update success dialog
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
                this.setState({failed: true}); // update failed dialog
            })
        } else this.props.reset("Confirmform")
    }

    handleClose = () => {
        this.props.infoPanelClose()
    }

    handleCancel = () => {
        this.setState({failed: false})
        this.props.infoPanelClose()
        this.props.resetForm()
    }

    handleRedirect = () => {
        this.props.history.push({pathname: '/admin/patient/find'})
    }

    render () {
        const { patientInfo, error, loading, classes, handleSubmit } = this.props
        const { activeCards, success, failed } = this.state

        const getInfoH = (patientInfo) => { return [
            {caption: "Hospital number", info: patientInfo.hospital_id},
            {caption: "DOB", info: patientInfo.dob},
            {caption: "Enrolled", info: moment(patientInfo.date_enrolled).format("MMM Do YYYY")},
            {caption: "Status", info: patientInfo.status},
            {caption: "", info: ""},
            {caption: "", info: ""}
        ]};
        const getInfoV = (patientInfo) => { return [
             ["Email", "Contact phone", "Primary provider", "Care group"],
             [patientInfo.email, patientInfo.phone, providerName(patientInfo.primary_provider.title, patientInfo.primary_provider.firstname, patientInfo.primary_provider.lastname), startCase(`${patientInfo.provider_group.name}`)],
             ["Active diary cards", "Pending diary cards", "Awaiting review", "Actioned"],
             [this.findNumSurveys("active"), this.findNumSurveys("pending"),this.findNumSurveys("awaiting review"), this.findNumSurveys("actioned")]
        ]};

        if (error) {
            return <Typography variant="subtitle1">"Patient cannot be deleted at this time. This may be temporary, so please try again later"/></Typography>
        }

        if (loading || !(patientInfo && patientInfo._id)) {
            return <CallBack fallBackText="Patient cannot be deleted at this time. This may be temporary, so please try again later"/>
        }


        return (
        
            <Card className={classes.root}>

                <Typography variant="h6" inline>{startCase(patientInfo.firstname)} {startCase(patientInfo.lastname)}</Typography>
                <BtnCloseIcon handleBtnClick={this.handleClose} />

                <br />
                
                <Grid container spacing={24}>
                    {getInfoH(patientInfo).map((info, idx) => {
                        return <Grid item xs={2} key={idx}>
                            <Typography variant="caption">{info.caption}</Typography>
                            <Typography variant="subtitle1" className={classes.fwMedium}>{info.info}</Typography>
                        </Grid>
                    }) }
                </Grid>

                <br />

                <Grid container spacing={24}>
                    {getInfoV(patientInfo).map((iArray, index) => {
                        return  <Grid item xs={index%2 ? 4 : 2} key={index}>
                            {iArray.map((i, idx) => {
                                return (
                                    <Typography variant="subtitle1" key={idx} className={index%2 ? classes.fwMedium : null}>{i}</Typography>
                                )
                            } )}
                        </Grid> 
                    }) }    
                </Grid>

                <br /> <hr className={classes.hrStyled}/> <br />   

                {activeCards && 
                    <Typography variant="subtitle1" color='error'>
                        This patient cannot be removed right now because they have diary cards that are either pending, active or awaiting review. Please review the outstanding dairy cards and mark all to either cancelled, actioned or archived before returning to delete this patient. 
                    </Typography>
                }

                {!this.authToDelete() && !activeCards &&
                    <Typography variant="subtitle1" color='error'>
                        Sorry you are not authorised to delete this patient's account. Only the patient's primary provider, the provider who enrolled them or an administrator can delete a patient's account.  
                    </Typography>
                }

                {patientInfo && !activeCards && this.authToDelete() && 
                    <Fragment>
                        <Typography variant="h5" gutterBottom>Delete This Patient</Typography>
                        <Typography variant="subtitle1" color='error' inline >
                            Note that this action cannot be undone and this patient will be permanently removed from the application. They can be re-enrolled via the enroll patient page but their diary cards to date will not be recovered.
                        </Typography>
                        <form noValidate onSubmit={handleSubmit(this.submit.bind(this))}>
                            <span style={{ marginRight: "20px"}}> 
                                <FormText type="text" name="lastname" label="Enter patient lastname to delete" variant="outlined" width="320" helpText={false} />
                            </span>
                            <span style={{position: "relative", top: "38px"}}>
                                <BtnAction type="submit" disabled={false} text="delete" marginRight={true} warning={true} />
                                <BtnAction type ="button" disabled={false} text="cancel" marginRight={true} handleAction={this.handleCancel} />
                            </span>
                        </form>
                    </Fragment>
                }

                <br />

                {success && 
                    <DialogCustom title="Success!" width="600px">
                        <Typography variant="subtitle1">
                            Patient successfully removed from the application.
                        </Typography>
                        <br /><br />
                        <BtnAction text="close" style={{float: "right"}} handleAction={this.handleRedirect} />
                    </DialogCustom>
                }

                {failed && 
                    <DialogCustom title="Failed!" width="600px">
                        <Typography variant="subtitle1">
                            A problem occurred and patient {patientInfo.firstname} {patientInfo.lastname} could not be removed at this time. Please check that this is an appropriate action and try again if required. If the problem persists, contact the system administrator.
                        </Typography>
                        <br /><br />
                        <BtnAction text="close" handleAction={this.handleCancel} />
                        <br/>
                    </DialogCustom>
                }

            </Card>
        );
    }
}


const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        patientInfo: state.patient.patient.patientInfo,
        patientData: state.patient.patient.patientData,
        error: state.patient.error,
        loading: state.patient.loading,
    }
};

const formData = {
    form: 'DeletePtConfirmForm', //unique identifier for this form 
}

DeletePtDisplay = reduxForm(formData)(DeletePtDisplay)
DeletePtDisplay = withRouter(DeletePtDisplay)
DeletePtDisplay = connect(mapStateToProps)(DeletePtDisplay)
DeletePtDisplay = withStyles(styles)(DeletePtDisplay)
export default DeletePtDisplay;
