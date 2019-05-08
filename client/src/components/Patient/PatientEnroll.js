import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { withStyles, Card, Grid, Typography} from '@material-ui/core';
import BtnAction from '../UI/Buttons/btnAction';
import ProviderSelect from '../UI/Forms/FormProviderSelect'
import FormText from '../UI/Forms/formText'
import FormTextFocused from '../UI/Forms/formTextFocused'
import FormTextPassword from '../UI/Forms/formTextPassword'
import FormRadio from '../UI/Forms/formRadio'
import PatientSaveDialog from './PatientSaveDialog'
import { selectConsoleTitle } from '../../actions/index';
import { patientSave } from "../../actions"
import { getHtmlMsg } from "./patientEnrollEmail"
import { mailer } from '../../actions'
import * as val from '../../logic/formValidations';


const styles = () => ({
    root: {
        padding: "40px 40px 40px 15%",
    },
});   


class PatientEnroll extends Component {

    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Enroll New Patient", menuIndex: 3}));
    }

    componentWillUnmount() {
        this.props.dispatch(patientSave("reset"))
    }

    //Handle form submission and save data to database
    submit(values) {
        console.log("Submitted values: ", values);
        // Save patient details to db
        this.props.dispatch(patientSave(values))
        // Send welcome email
        this.props.dispatch(mailer(getHtmlMsg(values)))
     }

    // Clear form entries and reset values using Redux Form 'reset'.
    handleClearForm = () => {
        this.props.reset('PatientEnrollForm')
    }

    handleCancelForm = () => {
        this.props.history.push({pathname: '/admin/patient/find'})
    }


    render() {

        const { handleSubmit, classes, pristine, submitting, newPatient, loadingNewPatient, errorNewPatient  } = this.props;

        const formComponents = [
            <FormTextFocused name="firstname" label="Firstname" width="270" />,
            <FormText name="lastname" label="Lastname" width="270" />,
            <FormText name="dob" label="DOB (mm-dd-yyyy or mm/dd/yyyy)" width="270" />,
            <div style={{position: "relative", top: "40px"}}><FormRadio name="gender" items={[{value: "male", label: "Male"},{value: "female", label: "Female"}]} /></div>,
            <FormText name="email"label="Email (john.doe@you.com" width="270" />,
            <FormText name="phone" label="Contact phone "width="270" />,
            <FormText name="hospId" label="Hospital Number" width="270" />,
            <div style={{position: "relative", top: "20px"}}><ProviderSelect /> </div>,
        ];

        return (
            <Card className={classes.root}>

                <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                    
                    <Grid container spacing={24} >
                        {formComponents.map((component, idx) => {
                            return(
                                <Grid item xs={6} key={idx} >
                                    {component}
                                </Grid>
                            )
                        })}
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" style={{width: "83%"}}>
                                <br />
                                To logon for the first time, this user will use thier email address and a temporary password. When they login, they will be prompted to change the temporary password to a more secure one of their choice. Please confirm the email address and enter a temporary password for this user.
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <FormText name="emailConfirm" label="Email" variant="standard" width="270" helpText={true}/>
                        </Grid>
                        <Grid item xs={6}>
                            <FormTextPassword name="password" label="Temporary password" variant="standard" width="270" helpText={true}/>
                        </Grid>
                    </Grid>

                    <br /> <br /> 

                    <BtnAction type="submit" disabled={submitting || pristine} text="submit" marginRight={true}/>
                    <BtnAction type="button" disabled={pristine} text="clear" warning={true} marginRight={true} handleAction={this.handleClearForm} />
                    <BtnAction type="button" text="cancel" warning={true} handleAction={this.handleCancelForm} />
                    
                </form>

                { (loadingNewPatient || errorNewPatient || !isEmpty(newPatient)) && <PatientSaveDialog /> }

            </Card>
        );
    };

};


function validate(values) {
    const errors = {}; // error accumulator
    errors.firstname = val.validateName(values.firstname, true)
    errors.lastname = val.validateName(values.lastname, true)
    errors.dob = val.validateDOB(values.dob, true)
    errors.hospId = val.validateHospId(values.hospId, true)
    errors.gender = val.validateGender(values.gender, true)
    errors.email = val.validateEmail(values.email, true)
    errors.phone = val.validatePhone(values.phone, true)
    errors.provider = val.validateIsRequired(values.provider)
    errors.status = val.validateStatus(values.status, true)
    errors.emailConfirm = val.validateEmails(values.email, values.emailConfirm) 
    errors.password = val.validatePassword(values.password, true)
    // If errors is empty, then form good to submit
    console.log("Errors: ", errors)
    return errors;
}

const mapStateToProps = (state) => {
    //console.log("State : ", state);
    return {
        newPatient: state.patientSave.info,
        loadingNewPatient: state.patientSave.loading,
		errorNewPatient: state.patientSave.error
    }
};

const formData = {
        form: 'PatientEnrollForm', //unique identifier for this form 
        validate     
}

PatientEnroll = reduxForm(formData)(PatientEnroll)
PatientEnroll = connect(mapStateToProps) (PatientEnroll)
PatientEnroll = withStyles(styles)(PatientEnroll)
export default PatientEnroll
