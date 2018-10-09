import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import { reset, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { defaultProps } from 'recompose';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import FormText from './Forms/FormText'
import FormTextFocused from './Forms/FormTextFocused'
import FormTextPassword from './Forms/FormTextPassword'
import FormSelect from './Forms/FormSelect'
import FormRadio from './Forms/FormRadio'
import { enrollNewPatient } from '../actions';
import EnrollFormSuccessDialog from './Dialogs/EnrollFormSuccessDialog.js'
import EnrollFormFailedDialog from './Dialogs/EnrollFormFailedDialog.js'

import providerAPI from "../utils/provider.js";
import patient_infoAPI from "../utils/patient_info.js";
import patient_dataAPI from "../utils/patient_data.js";


let selectItems = [];

const styles = theme => ({

    submitBtn: {
        marginRight: 20,
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
        marginRight: 20,
        color: "#ffffff",
        textDecoration: "none",
        backgroundColor: "#c62828",
        '&:hover': {
            backgroundColor: "#871c1c",
        },
        hover: {},
    },
    cancelLnk: {
        textDecoration: "none",
    },

});    


class EnrollPatientForm extends Component {

    componentDidMount() {

        // On component mount, fetch names of all providers in provider group to populate primary provider form field
        providerAPI.findAllByGroup(this.state.providerGroupId)
            .then(res => {
                console.log("res.data: " + JSON.stringify(res.data.providerList, null, 2 ));
                selectItems=[];
                res.data.providerList.map((provider, index) => {
                    selectItems.push({
                        value: index,
                        text: `Dr ${provider.firstname} ${provider.lastname}`,
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
        providerGroupId: "5b844946d8dc5ce848cd28a6",

        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        email: "",
        phone: "",
        hospId: "",
        provider: "",
        enoller: "",

        enrollFailed: false,
        enrollSuccess: false
    };


    // handle form submission
    submit(values) {
        console.log("Submitted values: ", values);

        patient_infoAPI.createNewPatient({
            date_enrolled: new Date(),
            enrolled_by_ref: '5b844946d8dc5ce848cd28a4',
            enrolled_by_id: "5b844946d8dc5ce848cd28a4",
            enrolled_by_name: `Dr Mathew Hall`,
            // enrolled_by_name: `Dr. ${localStorage.get('profile.name')}`,

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
            // console.log("res.data: " + JSON.stringify(res.data, null, 2 ))

            patient_dataAPI.createNewPatient({
                patient_info_id: res.data._id
            })
            .then(result=> {
                // console.log("result.data: " + JSON.stringify(result.data, null, 2 ))

                patient_infoAPI.insertRef(res.data._id, {
                    patient_data_ref: result.data._id,
                    patient_data_id: result.data._id
                })
                .then(res => {
                   // console.log("res.data: " + JSON.stringify(res.data, null, 2 ))

                    this.setState({
                        name: `${values.firstName} ${values.lastName}`,
                        dob: values.dob,
                        gender: values.Gender,
                        email: values.email,
                        phone: values.phone,
                        hospId: values.hospId,
                        provider: selectItems[values.provider].text,
                        enroller: "TBA",
                    
                        enrollSuccess: true
                    }); 
                })
                .catch(err => {
                    console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                    console.log(err);

                    this.setState({enrollFailed: true}); 
                })
            })
        })
    };


    render() {

        const { handleSubmit, classes, pristine, submitting } = this.props;

        const radioItems = [
            {value: "male", label: "Male"},
            {value: "female", label: "Female"}
        ];

        return (

            <div>
            
                {this.state.enrollSuccess && <EnrollFormSuccessDialog 
                                                        name={this.state.name}
                                                        dob={this.state.dob}
                                                        gender={this.state.gender}
                                                        email={this.state.email}
                                                        phone={this.state.phone}
                                                        hospId={this.state.hospId}
                                                        provider={this.state.provider}
                                                     />}

                {this.state.enrollFailed && <EnrollFormFailedDialog
                                                        name={this.state.name}
                                                     />}

                <Card style={{padding: "20px"}}>
                    <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>

                         <Grid container spacing={24} >

                            <Grid item xs={4}>
                                <FormTextFocused
                                    name="firstName"
                                    label="Firstname"
                                />
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={4}>
                                <FormText
                                    name="lastName"
                                    label="Lastname"
                                />
                            </Grid>
                            <Grid item xs={3}></Grid>

                            <Grid item xs={4}>
                                <FormText
                                    name="dob"
                                    label="DOB (mm-dd-yyyy)"
                                />
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={4}>
                                <FormRadio 
                                    name="Gender" 
                                    items={radioItems}
                                />
                            </Grid>
                            <Grid item xs={3}></Grid>

                            <Grid item xs={4}>
                                <FormText
                                    name="email"
                                    label="Email (john.doe@you.com"
                                />
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={4}>
                                <FormText
                                    name="phone" 
                                    label="Phone (000-000-0000)"
                                />
                            </Grid>
                            <Grid item xs={3}></Grid>
                            
                            <Grid item xs={4}>
                                <FormText
                                    name="hospId"
                                    label="Hospital Number"
                                />
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={4}>
                            <br />
                                <FormSelect 
                                    name="provider" 
                                    label="Primary Provider"
                                    items={selectItems}
                                />
                            </Grid>
                            <Grid item xs={3}></Grid>

                            <Grid item xs={4}>
                                <FormTextPassword
                                    name="password1"
                                    label="Password"
                                />
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={4}>
                                <FormTextPassword
                                    name="password2" 
                                    label="Re-enter Password"
                                    />
                            </Grid>
                            <Grid item xs={3}></Grid>

                            <Grid item xs={12}><br /></Grid>

                            <Grid item xs={4}>
                                <Button type="submit" disabled={submitting || pristine} className={classes.submitBtn}>Submit</Button>
                                <Link to='/admin' className={classes.cancelLnk}><Button className={classes.cancelBtn}>Cancel</Button></Link>
                            </Grid>
                            <Grid item xs={8}></Grid>

                        </Grid>
                    </form>
                </Card>
            </div>
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
        errors.firstName = "*Please enter a valid name!";   // message to be displayed if invalid
    } 

    if (!values.lastName || values.lastName.length <3 ) {
        errors.lastName = "*Please enter a valid name!";   // message to be displayed if invalid
    } 

    if (!values.dob) {
        errors.dob = "Please enter a date of birth!";   // message to be displayed if invalid
    }

    if (!values.email) {
        errors.email = "Please enter a valid email!";   // message to be displayed if invalid
    }

    if (!values.phone) {
    errors.phone = "Please enter a contact phone number!";   // message to be displayed if invalid
    }

    if (!values.Gender) {
        errors.Gender = "Please select a gender!";   // message to be displayed if invalid
     }

    if (!values.provider) {
        errors.provider= "Please select a primary provider!";   // message to be displayed if invalid
     }

    // If errors is empty, then form good to submit
    // If errors has any properties, redux form assumes form is invalid
    console.log("Errors: ", errors)
    return errors;

}


const formData = {
        form: 'EnrollPatientForm', //unique identifier for this form 
        validate,      
}
EnrollPatientForm = reduxForm(formData)(EnrollPatientForm)
EnrollPatientForm = withStyles(styles)(EnrollPatientForm)
export default EnrollPatientForm

