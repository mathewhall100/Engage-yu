import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import { reset, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import FormText from './Forms/FormText'
import FormTextFocused from './Forms/FormTextFocused'
import FormSelect from './Forms/FormSelect'
import FormRadio from './Forms/FormRadio'
import { enrollNewPatient } from '../actions';


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


class Enroll extends Component {

    componentDidMount() {
      };

    
    // handle form submission
    onSubmit(values) {
        // 'values' contains validated form entries
        console.log("Submitted values: ", values);    

        // clear form fields
        reset()

        // Redirect doesn't work, needs to be connected to props
        return <Redirect to='/admin' /> 

    };


    render() {

    const { handleSubmit } = this.props;
    const { classes } = this.props;
    const { pristine, submitting } = this.props;

    const selectItems = [
         {value: "1", text: "Dr smith Jones"} ,
         {value: "2", text: "Dr Jones Smith"} ,
         {value: "3", text: "Dr Melania Kopff"}  
    ];

    const radioItems = [
        {value: "male", label: "Male"},
        {value: "female", label: "Female"}
    ];


        return (

            <div>
                <Card style={{padding: "20px"}}>
                    <form autoComplete="off" onSubmit={handleSubmit(this.onSubmit.bind(this))}>

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
                                    name="id"
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

                            <Grid item xs={12}><br /><br /><br /><br /></Grid>

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
    // If errors has anay properties, redux form assumes form is invalid
    console.log("Errors: ", errors)
    return errors;

}

export default reduxForm ({
        validate,
        form: 'EnrollPatientForm', // unique identifier for this form
        
    })(
        connect(null,{ enrollNewPatient }
    )(
        withStyles(styles)(Enroll)
));

