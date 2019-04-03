import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withStyles, Card, Grid, Typography} from '@material-ui/core';
import BtnAction from '../UI/Buttons/btnAction';
import ProviderSelect from '../UI/Forms/FormProviderSelect'
import FormText from '../UI/Forms/formText'
import FormTextFocused from '../UI/Forms/formTextFocused'
import FormRadio from '../UI/Forms/formRadio'
import PatientSaveDialog from './PatientSaveDialog'
import { selectConsoleTitle } from '../../actions/index';
import { patientSave } from "../../actions"
import * as val from '../../logic/formValidations';


const styles = () => ({
    root: {
        padding: "40px 40px 40px 15%",
    },
});   


class PatientEnroll extends Component {

    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Enroll New Patient"}));
    }

    componentWillUnmount() {
        this.props.dispatch(patientSave("reset"))
    }


     //Handle form submission and save data to database
    submit(values) {
        console.log("Submitted values: ", values);
        this.props.dispatch(patientSave(values))
     }

    // Clear form entries and reset values using Redux Form 'reset'.
    handleClearForm = () => {
        this.props.reset('PatientEnrollForm')
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
            <Typography variant="subtitle2" style={{width: "95%"}}><br />Asign a temporary passsword for this patient now which they will use, together with their email address, to login for the first time.</Typography>,
            <div />,
            <FormText type="password" name="password1" label="Password" width="270" />,
            <FormText type="password" name="password2" label="Re-enter Password" width="270" />,
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
                    </Grid>

                    <br /> <br /> 

                    <BtnAction type="submit" disabled={submitting || pristine} text="submit" marginRight={true}/>
                    <BtnAction type="button" disabled={pristine} text="clear" warning={true} handleAction={this.handleClearForm} />
                    
                </form>

                { (loadingNewPatient || errorNewPatient || newPatient._id) && <PatientSaveDialog /> }

            </Card>
        );
    };

};


function validate(values) {
    console.log("Error values: ", values) // -> { object containing all values of form entries } 
    const errors = {}; // error accumulator
    // validate inputs from 'values'
    errors.firstname = val.validateName(values.firstname, true)
    errors.lastname = val.validateName(values.lastname, true)
    errors.dob = val.validateDOB(values.dob, true)
    errors.hospId = val.validateHospId(values.hospId, true)
    errors.gender = val.validateGender(values.gender, true)
    errors.email = val.validateEmail(values.email, true)
    errors.phone = val.validatePhone(values.phone, true)
    errors.provider = val.validateIsRequired(values.provider)
    errors.status = val.validateStatus(values.status, true)
    errors.password1 = val.validatePassword(values.password1, true)
    errors.password2 = val.validatePasswords(values.password1, values.password2)
    // If errors is empty, then form good to submit
    console.log("Errors: ", errors)
    return errors;
}

const mapStateToProps = (state) => {
    console.log("State : ", state);
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
