import React, { Component, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withStyles, Card, Grid, Typography} from '@material-ui/core';
import BtnAction from '../UI/Buttons/btnAction';
import FormText from '../UI/Forms/formText'
import FormTextFocused from '../UI/Forms/formTextFocused'
import { selectConsoleTitle, loadPatient } from '../../actions/index';
import patient_infoAPI from '../../utils/patient_info'
import DeletePt from './DeletePt'


const styles = theme => ({
    root: {
        padding: "40px 40px 40px 60px",
    },
})

class DeletePtFind extends Component {

    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Delete Patient", menuIndex: 8}));
    }

    state = {
        findError: null,
        infoPanel: false,
        success: false,
        failed: false,
    }

    submit(values) {
        console.log("Form submitted: ", values)
        this.setState({findError: null})
        const searchterm = {
            firstname: values.firstname.trim().toLowerCase(),
            lastname: values.lastname.trim().toLowerCase()
        }
        patient_infoAPI.findOne(searchterm)
        .then(res => {
            console.log("result: ", res.data)
            this.props.dispatch(loadPatient(res.data._id))
            this.setState({infoPanel: true})
        })
        .catch(err => {
            console.log(err)
            console.log(err.response)
            if (err.response.status === 400) { 
                this.setState({findError: "Sorry, no patient found with that name."})
            } else {
            this.setState({findError: "An error occurred and this action could not be performed. This may be temporary, so please try again later"}); 
            }
        })
    }

    handleCancelForm = () => {
        this.props.history.push({pathname: '/admin/patient/find'})
    }

    infoPanelClose = () => {
        this.setState({infoPanel: false})
    }

    resetForm = () => {
        this.props.reset('DeletePtFindForm')
    }

    render () {
        const { classes, handleSubmit, submitting, pristine } = this.props
        const { findError, infoPanel, success, failed } = this.state

        return (

            <Card className={classes.root}>
                <Typography variant="subtitle1" gutterBottom>Enter the name of the patient you wish to remove from the application.</Typography>

                <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                    <Grid container spacing={24}>
                        <Grid item xs={4}>
                            <FormTextFocused name="firstname" label="Firstname" width="250" helpText={false}/>
                        </Grid>
                        <Grid item xs={8}>
                            <FormText name="lastname" label="Lastname" width="250" helpText={false}/>
                        </Grid>
                    </Grid>
                    <br /> 
                    {findError && 
                        <Typography variant="subtitle1" gutterBottom>{findError}.</Typography>
                    }
                    <br /> 
                    {!infoPanel && <Fragment> 
                        <BtnAction type="submit" disabled={submitting || pristine} text="submit" marginRight={true}/>
                        <BtnAction type="button" text="cancel" warning={true} handleAction={this.handleCancelForm} />
                    </Fragment> }
                </form>

                {infoPanel && <DeletePt infoPanelClose={this.infoPanelClose} resetForm={this.resetForm}/> }

            </Card>
        )
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
        form: 'DeletePtFindForm', //unique identifier for this form 
}

DeletePtFind = reduxForm(formData)(DeletePtFind)
DeletePtFind = connect(mapStateToProps) (DeletePtFind)
DeletePtFind = withStyles(styles)(DeletePtFind)
export default DeletePtFind