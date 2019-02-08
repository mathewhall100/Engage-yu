import React, { Component } from 'react';
import { withRouter, Link, Redirect} from 'react-router-dom';
import { reset, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startCase } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FormText from '../Forms/FormText'
import FormTextFocused from '../Forms/FormTextFocused'
import FormSelect from '../Forms/FormSelect'
import FormRadio from '../Forms/FormRadio'
import EnrollFormSuccessDialog from '../Dialogs/EnrollFormSuccessDialog.js'
import EnrollFormFailedDialog from '../Dialogs/EnrollFormFailedDialog.js'
import { selectConsoleTitle } from '../../actions/index';
import providerAPI from "../../utils/provider.js";
import patient_infoAPI from "../../utils/patient_info.js";
import patient_dataAPI from "../../utils/patient_data.js";


let selectItems = [];

const styles = theme => ({
    root: {
        paddingTop: "40px",
        paddingBottom: "30px", 
        paddingLeft: "18%"
    },
    submitBtn: {
        float: "right",
        margin: "20px 0 0 20px",
        paddingLeft: "20px",
        paddingRight: "20px",
        color: "#ffffff",
        backgroundColor: "#2d404b",
        '&:hover': {
            backgroundColor: "#28353d",
        },
        '&:disabled': {
            color: 'grey'
        },
        hover: {},
        disabled: {},
    },
    cancelBtn: {
        float: "right",
        margin: "20px 0 0 20px",
        color: "#ffffff",
        backgroundColor: "#c62828",
        '&:hover': {
            backgroundColor: "#871c1c",
        },
        hover: {},
    },
});    


class EnrollPatient extends Component {

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Enroll New Patient"});

        // On component mount, fetch names of all providers in provider group to populate primary provider form field
        providerAPI.findAllByGroup(localStorage.getItem("provider_group_id"))
            .then(res => {
                console.log("res.data: ", res.data);
                selectItems=[];
                res.data.providerList.map((provider, index) => {
                    selectItems.push({
                        value: index,
                        text: `Dr ${startCase(provider.firstname)} ${startCase(provider.lastname)}`,
                        id: provider._id, 
                        group_ref: provider.provider_group_ref,
                        group_id: provider.provider_group_id,
                        group_name: provider.provider_group_name,
                    })
                })
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
        })
    };
    

    state = {
        // ProviderGroupId should be replaced with value in local storage
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        email: "",
        phone: "",
        hospId: "",
        provider: "",
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
            firstname: values.firstName,
            lastname: values.lastName,
            dob: values.dob,
            email: values.email,
            phone: values.phone,

            primary_provider_ref: selectItems[values.provider].id,
            primary_provider_id: selectItems[values.provider].id,
            primary_provider_name: selectItems[values.provider].text,

            provider_group_ref: selectItems[values.provider].group_ref,
            provider_group_id: selectItems[values.provider].group_id,
            provider_group_name: selectItems[values.provider].group_name
        })
        .then(res => {
            // console.log("res.data: ", res.data)
            // Then using new patientInfo_id create a new patient_data collection for the patient
            patient_dataAPI.createNewPatient({
                patient_info_id: res.data._id
            })
            .then(result=> {
                // console.log("result.data: ", res.data)
                // Then go back and save the patient_data_id into the patientInfo collection
                
                patient_infoAPI.insertRef(res.data._id, {
                    patient_data_ref: result.data._id,
                    patient_data_id: result.data._id
                })
                .then(res => {
                   // console.log("res.data: ", res.data)
                    this.setState({
                        newPatientInfo: values,
                        enrollSuccess: true
                    })
                })
                .catch(err => {
                    console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                    console.log(err);

                    this.setState({enrollFailed: true}); 
                })
            })
        })
    };

    handleClearForm() {
        this.props.reset('EnrollPatientForm')
    }


    render() {

        const { handleSubmit, classes, pristine, submitting } = this.props;
        const { newPatientInfo } = this.state;

        const radioItems = [
            {value: "male", label: "Male"},
            {value: "female", label: "Female"}
        ];

        const formComponents = [
            <FormTextFocused name="firstName" label="Firstname" width="270" />,
            <FormText name="lastName" label="Lastname" width="270" />,
            <FormText name="dob" label="DOB (mm-dd-yyyy)" width="270" />,
            <div style={{position: "relative", top: "40px"}}><FormRadio name="Gender" items={radioItems} formLabel="Gender"/></div>,
            <FormText name="email"label="Email (john.doe@you.com" width="270" />,
            <FormText name="phone" label="Phone (000-000-0000)"width="270" />,
            <FormText name="hospId" label="Hospital Number" width="270" />,
            <div style={{position: "relative", top: "20px"}}><FormSelect name="provider" label="Primary Provider" width="200" items={selectItems} /></div>,
            <span><br /><Typography variant="subtitle2">Asign a temporary passsword for this patient now which they will use, together with their email address, to login for the first time. Once logged in, new patients will be prompted to can change their password to one of their choice.</Typography></span>,
            <div></div>,
            <FormText type="password" name="password1" label="Password" width="270" />,
            <FormText type="password" name="password2" label="Re-enter Password" width="270" />,
            <div style={{height: "40px"}}></div>,
            <div style={{width: "270px", height: '40px'}}>
                <Button type="submit" disabled={submitting || pristine} className={classes.submitBtn}>Submit</Button>
                <Button className={classes.cancelBtn} onClick={()=> this.handleClearForm()}>Clear</Button>
            </div>
        ]

        return (
            <React.Fragment>
                {this.state.enrollSuccess && 
                    <EnrollFormSuccessDialog 
                        name={newPatientInfo.name}
                        dob={newPatientInfo.dob}
                        gender={newPatientInfo.gender}
                        email={newPatientInfo.email}
                        phone={newPatientInfo.phone}
                        hospId={newPatientInfo.hospId}
                        provider={newPatientInfo.provider}
                    />
                }

                {this.state.enrollFailed && 
                    <EnrollFormFailedDialog
                        name={newPatientInfo.name}
                    />
                }

                <Card className={classes.root}>
                    <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                         <Grid container spacing={24} >

                            {formComponents.map((component, idx) => {
                                return(
                                    <Grid item xs={6} key={idx} align="left">
                                        {component}
                                    </Grid>
                                )
                            })}
                            
                        </Grid>
                    </form>
                </Card>

            </React.Fragment>
        );
    };

};


function validate(values) {
    console.log("Error values: ", values) // -> { object containing all values of form entries } 
    const errors = {};

    // validate inputs from 'values'
    if (!values.id) {
        errors.id = "Please enter a contact phone number!";   // message to be displayed if invalid
    }
    if (!values.firstName || values.firstName.length <3 ) {
        errors.firstName = "*Please enter a valid name!";   
    } 
    if (!values.lastName || values.lastName.length <3 ) {
        errors.lastName = "*Please enter a valid name!";   
    } 
    if (!values.dob) {
        errors.dob = "Please enter a date of birth!";   
    }
    if (!values.email) {
        errors.email = "Please enter a valid email!";   
    }
    if (!values.phone) {
    errors.phone = "Please enter a contact phone number!";   
    }
    if (!values.Gender) {
        errors.Gender = "Please select a gender!";   
     }
    if (!values.provider) {
        errors.provider= "Please select a primary provider!";   
     }
    // If errors is empty, then form good to submit
    // If errors has any properties, redux form assumes form is invalid
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

