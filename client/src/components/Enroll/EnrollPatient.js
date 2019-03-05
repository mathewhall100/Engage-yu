import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { reset, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startCase } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ActionBtn from '../Buttons/actionBtn';
import FormText from '../Forms/FormText'
import FormTextFocused from '../Forms/FormTextFocused'
import FormSelect from '../Forms/FormSelect'
import FormRadio from '../Forms/FormRadio'
import Dialog from '../Dialogs/simpleDialog'
import EnrollSuccessDialog from '../Dialogs/EnrollSuccessDialog.js'
import { selectConsoleTitle } from '../../actions/index';
import providerAPI from "../../utils/provider.js";
import patient_infoAPI from "../../utils/patient_info.js";
import patient_dataAPI from "../../utils/patient_data.js";
import { validateName, validateDOB, validateGender, validateHospId, validateEmail, validatePhone, validateStatus, validatePassword, validatePasswords } from '../../logic/formValidations';


const styles = () => ({
    root: {
        padding: "40px 40px 40px 15%",
    },
});   


class EnrollPatient extends Component {

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Enroll New Patient"});

        // On component mount, fetch names of all providers in provider group to populate primary provider form field
        let selectItems = [];
        providerAPI.findAllByGroup(localStorage.getItem("provider_group_id"))
        .then(res => {
            console.log("res.data: ", res.data);        
            res.data.providerList.map((provider, idx) => {
                selectItems.push({
                    value: idx,
                    text: `Dr ${startCase(provider.firstname)} ${startCase(provider.lastname)}`,
                    id: provider._id, 
                    group_ref: provider.provider_group_ref,
                    group_id: provider.provider_group_id,
                    group_name: provider.provider_group_name,
                })
            })
            console.log("selectItems: ", selectItems)
            if (selectItems && selectItems.length < 1) {
                selectItems = this.defaultProviderList()
            }
            this.setState({providers: selectItems})
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
            this.setState({providers: this.defaultProviderList()})
        })
    };

    comonentWillReceiveProps(nextProps) {
        this.setState({
            enrollSuccess: false,
            enrollFailed: false
        })
    }

    defaultProviderList = () => {
        console.log("default provider list")
        return [{
            value: 0,
            text: `Dr ${startCase(localStorage.getItem("provider_first_name"))} ${startCase(localStorage.getItem("provider_last_name"))}`,
            id: localStorage.getItem("provider._id"), 
            group_ref: localStorage.getItem("provider_group_ref"),
            group_id: localStorage.getItem("provider_group_ref"),
            group_name: localStorage.getItem("provider_group_name")
            },{
            value: 1,
            text: `N/A (enter later)`,
            id: "000000000000000000000000",
            group_ref: "000000000000000000000000",
            group_id: "000000000000000000000000",
            group_name: ""
        }]
    };

    state = {
        providers: [],
        enrollFailed: false,
        enrollSuccess: false
    };


    // Handle form submission and save data to database
    submit(values) {
        console.log("Submitted values: ", values);

        // First save to patientInfo collection
        patient_infoAPI.createNewPatient({
            date_enrolled: new Date(),
            enrolled_by_ref: localStorage.getItem("provider_id"),
            enrolled_by_id: localStorage.getItem("provider_id"),
            enrolled_by_name: `${localStorage.getItem("provider_first_name")} ${localStorage.getItem("provider_last_name")}`,
            patient_data_ref: "000000000000000000000000",
            patient_data_id:  "000000000000000000000000",
            status: "active",
            hospital_id: values.hospId,
            firstname: values.firstname,
            lastname: values.lastname,
            gender: values.gender,
            dob: values.dob,
            email: values.email,
            phone: values.phone,
            primary_provider_ref: this.state.providers[values.provider].id,
            primary_provider_id: this.state. providers[values.provider].id,
            primary_provider_name: this.state.providers[values.provider].text.slice(3),
            provider_group_ref: this.state.providers[values.provider].group_ref,
            provider_group_id: this.state.providers[values.provider].group_id,
            provider_group_name: this.state.providers[values.provider].group_name
        })
        .then(res_info => {
            console.log("res_info.data: ", res_info.data)
            // Then using new patientInfo_id create a new patient_data collection for the patient
            patient_dataAPI.createNewPatient({
                patient_info_id: res_info.data._id
            })
            .then(res_data => {
                console.log("res_data.data: ", res_data.data)
                // Then go back and save the patient_data_id into the patientInfo collection
                patient_infoAPI.insertRef(res_info.data._id, {
                    patient_data_ref: res_data.data._id,
                    patient_data_id: res_data.data._id
                })
                .then(res => {
                    console.log("res.data: ", res.data)
                    localStorage.setItem("patient_id", res_info.data._id)
                    this.setState({
                        newPatientInfo: res_info.data,
                        enrollSuccess: true
                    })
                })
                .catch(err => { 
                    this.enrollFailedCleanup(res_info.data._id, res_data.data._id, err) // inner block
                })
            })
            .catch(err => {
                this.enrollFailedCleanup(res_info.data._id, null, err) // middle block
            })
        })
        .catch(err => {
            this.enrollFailedCleanup(null, null, err) // outer block
        })
    };

    // When enroll fails, need to remove any documents created during the sequence of database actions
    enrollFailedCleanup = (info_id, data_id, err) => {
        console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
        console.log(err);
        console.log("Enroll fail cleanup: ", info_id, " : ", data_id)
        if (info_id) {
            patient_infoAPI.remove(info_id)
            .then(res => {
                console.log(`patient_info document ${res.data._id} removed`)
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred. Document ${info_id} could not be cleaned up. Please contact your system administrator`);
                console.log(err);
            })
        }
        if (data_id) {
            patient_dataAPI.remove(data_id)
            .then(res => {
                console.log(`patient_data document ${res.data._id} removed`)
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred. Document ${data_id} could not be cleaned up. Please contact your system administrator`);
                console.log(err);
            })
        }
        localStorage.setItem("patient_id", "")
        this.setState({enrollFailed: true}); 
    }

    // Clear form entries and reset values using Redux Form 'reset'.
    handleClearForm() {
        this.props.reset('EnrollPatientForm')
    }


    render() {

        const { handleSubmit, classes, pristine, submitting } = this.props;
        const { providers, enrollSuccess, enrollFailed, newPatientInfo } = this.state;

        const radioItems = [
            {value: "male", label: "Male"},
            {value: "female", label: "Female"}
        ];

        const PwdText = () =>
            <span>
                <Typography variant="subtitle2" style={{width: "95%"}}><br />
                    Asign a temporary passsword for this patient now which they will use, together with their email address, to login for the first time.
                </Typography>
            </span>

        const formComponents = [
            <FormTextFocused name="firstname" label="Firstname" width="270" />,
            <FormText name="lastname" label="Lastname" width="270" />,
            <FormText name="dob" label="DOB (mm-dd-yyyy or mm/dd/yyyy)" width="270" />,
            <div style={{position: "relative", top: "40px"}}><FormRadio name="gender" items={radioItems} /></div>,
            <FormText name="email"label="Email (john.doe@you.com" width="270" />,
            <FormText name="phone" label="Contact phone "width="270" />,
            <FormText name="hospId" label="Hospital Number" width="270" />,
            <div style={{position: "relative", top: "20px"}}><FormSelect name="provider" label="Primary Provider" width="200" items={providers} /></div>,
            <PwdText />,
            <div />,
            <FormText type="password" name="password1" label="Password" width="270" />,
            <FormText type="password" name="password2" label="Re-enter Password" width="270" />,
        ]

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
                    <span style={{marginRight: "15px"}}>
                        <ActionBtn type="submit" disabled={submitting || pristine} text="submit" />
                    </span>
                    <ActionBtn type="button" disabled={pristine} text="clear" handleAction={this.handleClearForm} />
                </form>

                {enrollSuccess && <EnrollSuccessDialog title="Success!" info={newPatientInfo}/> }
                {enrollFailed && <Dialog
                    title="Failed!" 
                    text="Unfortuneately, a problem was encountered and the patient could not be enrolled at this time. Please go back and check all the details entered are correct and valid and then try again. If the problem persists then contact the system administrator" 
                    />
                }

            </Card>
        );
    };

};


function validate(values) {
    console.log("Error values: ", values) // -> { object containing all values of form entries } 
    const errors = {}; // error accumulator
    // validate inputs from 'values'
    errors.firstname = validateName(values.firstname, true)
    errors.lastname = validateName(values.lastname, true)
    errors.dob = validateDOB(values.dob, true)
    errors.hospId = validateHospId(values.hospId, true)
    errors.gender = validateGender(values.gender, true)
    errors.email = validateEmail(values.email, true)
    errors.phone = validatePhone(values.phone, true)
    errors.provider = validateName(values.provider, true)
    errors.status = validateStatus(values.status, true)
    errors.password1 = validatePassword(values.password1, true)
    errors.password2 = validatePasswords(values.password1, values.password2)
    // If errors is empty, then form good to submit
    console.log("Errors: ", errors)
    return errors;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle }, dispatch);
}

const formData = {
        form: 'EnrollPatientForm', //unique identifier for this form 
        validate,      
}

EnrollPatient = connect(null, mapDispatchToProps) (EnrollPatient)
EnrollPatient= reduxForm(formData)(EnrollPatient)
EnrollPatient= withRouter(EnrollPatient)
EnrollPatient= withStyles(styles)(EnrollPatient)
export default EnrollPatient
