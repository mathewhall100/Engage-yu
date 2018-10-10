import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { startCase } from 'lodash';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { selectConsoleTitle } from '../actions/index';
import patient_infoAPI from "../utils/patient_info.js";
import providerAPI from "../utils/provider.js";
import FormTextFocused from './Forms/FormTextFocused';
import FormSelect from './Forms/FormSelect'
import FormRadio from './Forms/FormRadio'
import EditPatientSuccessDialog from './Dialogs/EditPatientSuccessDialog.js';
import EditPatientFailedDialog from './Dialogs/EditPatientFailedDialog.js';

let selectItems = [];

const styles = theme => ({
    root: {
        padding: "20px"
    },
    tableText: {
       marginTop: "10px"
    },
    textBold: {
        fontWeight: "bold",
      },
    btn: {
        backgroundColor: "#eeeeee",
        textDecoration: "none",
        borderRadius: "5px",
        padding: "5px",
        marginTop: "10px",
        marginLeft: "20px",
        float: "right",
        '&:hover': {
            backgroundColor: "#dddddd",
            cursor: 'pointer'
        },
        '&:disabled': {
            color: 'grey',
            cursor: 'disabled'
        },
        hover: {},
        disabled: {},
    },
})

class EditPatient extends Component {  

    
    
    componentDidMount() {
        this.props.selectConsoleTitle({title: "Update patient details"});

        // On component mount, fetch names of all providers in provider group to populate primary provider form field
        providerAPI.findAllByGroup(this.state.providerGroupId)
            .then(res => {
                console.log("res.data: " + JSON.stringify(res.data.providerList, null, 2 ));
                selectItems=[];
                res.data.providerList.map((provider, index) => {
                        selectItems.push({
                        value: index,
                        text: `Dr. ${provider.firstname} ${provider.lastname}`,
                        id: provider._id, 

                    })
                })
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
        })
    };
     
    componentWillReceiveProps(nextProps) {
        this.setState({editFieldActive: false})
    }


    state = {
        providerGroupId: "5b844946d8dc5ce848cd28a6",
        editFieldActive: false,
        showEditField: [],

        PatientUpdateSuccessDialog: false,
        PatientUpdateFailedDialog: false
    }


    submit(values) {
        console.log("Submit: ", values)

        if (values.firstname) {
            patient_infoAPI.updateName(this.props.patientInfo._id, {
                firstname: values.firstname,
                lastname: this.props.patientInfo.lastname
            })
            .then(res => {
                console.log("res.data: " + JSON.stringify(res.data, null, 2 ))
                this.setState ({patientUpdateSuccess: true})   // update success dialog
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
                this.setState({patientUpdateFailed: true}); // update failed dialog
            })
        } else if (values.lastname) {
            patient_infoAPI.updateName(this.props.patientInfo._id, {
                firstname: this.props.patientInfo.firstname,
                lastname: values.lastname
            })
            .then(res => {
                console.log("res.data: " + JSON.stringify(res.data, null, 2 ))
                this.setState ({patientUpdateSuccess: true})   // update success dialog
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
                this.setState({patientUpdateFailed: true}); // update failed dialog
            })
        } else if (values.email) {
            patient_infoAPI.updateEmail(this.props.patientInfo._id, {
                email: values.email,
            })
            .then(res => {
                console.log("res.data: " + JSON.stringify(res.data, null, 2 ))
                this.setState ({patientUpdateSuccess: true})   // update success dialog
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
                this.setState({patientUpdateFailed: true}); // update failed dialog
            })
        } else if (values.phone) {
            patient_infoAPI.updatePhone(this.props.patientInfo._id, {
                phone: values.phone,
            })
            .then(res => {
                console.log("res.data: " + JSON.stringify(res.data, null, 2 ))
                this.setState ({patientUpdateSuccess: true})   // update success dialog
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
                this.setState({patientUpdateFailed: true}); // update failed dialog
            })
        } else if (values.provider) {
            patient_infoAPI.updateProvider(this.props.patientInfo._id, {
                primary_provider_ref: selectItems[values.provider].id,
                primary_provider_id: selectItems[values.provider].id,
                primary_provider_name: selectItems[values.provider].text.slice(3),
            })
            .then(res => {
                console.log("res.data: " + JSON.stringify(res.data, null, 2 ))
                this.setState ({patientUpdateSuccess: true})   // update success dialog
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
                this.setState({patientUpdateFailed: true}); // update failed dialog
            })
        } else if (values.status) {
            patient_infoAPI.updateStatus(this.props.patientInfo._id, {
                status: values.status
            })
            .then(res => {
                console.log("res.data: " + JSON.stringify(res.data, null, 2 ))
                this.setState ({patientUpdateSuccess: true})   // update success dialog
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
                this.setState({patientUpdateFailed: true}); // update failed dialog
            })
        }

    }

    onChangeText(value) {
        console.log("change text: ", value)
    }

    onChangeSelect(value) {
        console.log("change select: ", value)
    }

    handleClickEdit(event, field) {
        this.setState ({patientUpdateSuccess: false}) 
        if (this.state.editFieldActive) {
            // maybe show error message that only one field may be updated at once
        }
        let tempArray = []
        tempArray[field] = true
        this.setState({showEditField: tempArray})
        this.setState({editFieldActive: true})
    }

    handleClickCancel(event, field) {
        this.setState({showEditField: []})
        this.setState({editFieldActive: false})
    }


    render () {
        
        const { patientInfo, handleSubmit, classes } = this.props
        const { submitting, editFieldActive, showEditField, patientUpdateFailed, patientUpdateSuccess } = this.state

        const formFields = [
            {rowLabel: "Firstname", fieldContent: startCase(patientInfo.firstname), fieldName: "firstname", fieldLabel: "New firstname"},
            {rowLabel: "Lastname", fieldContent: startCase(patientInfo.lastname), fieldName: "lastname", fieldLabel: "New lastname"},
            {rowLabel: "Email", fieldContent: patientInfo.email, fieldName: "email", fieldLabel: "New email address"},
            {rowLabel: "Phone", fieldContent: patientInfo.phone, fieldName: "phone", fieldLabel: "New phone number"}
        ]

        const radioItems = [
            {value: "active", label: "Active"},
            {value: "inactive", label: "Inactive"}
        ];

        const renderTextField = (field) =>  {
            const  { input, label, autofocus, width, name, meta: { touched, error }, ...custom } = field;
            return (
                <TextField
                    label={label}
                    value={name}
                    //errorText={touched && error}
                    autoFocus={autofocus}
                    style={{width: width}}
                    {...input}
                    {...custom}
                />
            )
        }

        const renderSelectField = (field) => {
            const { input, label, meta: { touched, error }, children, ...custom } = field;
            return (
                <FormControl style={{width: "250px"}}>
                    <InputLabel>My patients</InputLabel>
                    <Select
                        {...input}
                        onSelect={(event, index, value) => input.onChange(value)}
                        children={children} 
                        {...custom}
                    />
                </FormControl>
            )
        }
        
        return (

            <div>

                {patientUpdateSuccess && <EditPatientSuccessDialog patientId={patientInfo._id}/>}

                {patientUpdateFailed && <EditPatientFailedDialog />} 

                <Card className={classes.root}>

                    <Grid container spacing={24}>
                        <Grid item xs={3}>
                            <Typography variant="caption">
                                Currrent name
                            </Typography>
                            <Typography variant="subheading">
                                <span className={classes.textBold}>{startCase(patientInfo.firstname)} {startCase(patientInfo.lastname)}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="caption">
                                Hospital number:
                            </Typography>
                            <Typography variant="subheading">
                                <span className={classes.textBold}>{patientInfo.hospital_id}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="caption">
                                DOB
                            </Typography>
                            <Typography variant="subheading">
                                <span className={classes.textBold}>{patientInfo.dob}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="caption">
                                Enrolled
                            </Typography>
                            <Typography variant="subheading">
                                <span  className={classes.textBold}>{moment(patientInfo.date_enrolled).format("MMM Do YYYY")}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Button size="small" className={classes.btn} component={Link} style={{float: "right"}} to='/admin/find'>Back</Button>
                        </Grid>

                    </Grid>

                    <br />
                    <hr />
                    <br />

                    <Typography variant="title">
                        Select detail to edit and click 'update'
                    </Typography>

                    <br />
                    <br />

                    <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>

                        {formFields.map((field, index) => {
                            return (

                                <Grid container spacing={24} key={index}>
                                    <Grid item xs={1}>
                                        <span>
                                            <div className={classes.tableText}>{field.rowLabel}:</div>
                                        </span>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <span>
                                            <div className={classes.tableText}>{field.fieldContent}</div>
                                        </span>
                                    </Grid>

                                    <Grid item xs={1}>
                                    <Button size="small" disabled={submitting || editFieldActive} className={classes.btn} onClick={event => this.handleClickEdit(event, index)}>update</Button>
                                    </Grid>

                                    
                                    <Grid item xs={3}>
                                        {showEditField[index] && !patientUpdateSuccess && <div style={{float: "right",paddingBottom: "15px"}}>
                                            <div style={{position: "relative", top: "-20px"}}>
                                                <FormTextFocused
                                                    name={field.fieldName}
                                                    label={field.fieldLabel}
                                                />
                                            </div>
                                        </div> }

                                        {showEditField[index] && patientUpdateSuccess && <div style={{float: "right", color: "green", paddingTop: "10px"}}>
                                            Successfully updated!
                                        </div> }
                                    </Grid>
                                    
                                    <Grid item xs={2}>
                                        {showEditField[index] &&  !patientUpdateSuccess && <span>
                                            <Button size="small" className={classes.btn} onClick={event => this.handleClickCancel(event, 1)}>Cancel</Button>
                                            <Button size="small" className={classes.btn} type="submit">Submit</Button>
                                        </span> }
                                    </Grid> 

                                    <Grid item xs={2}>
                                    </Grid>

                                </Grid>

                            )
                        }) }

                        <Grid container spacing={24}>
                                    <Grid item xs={1}>
                                        <span>
                                            <div className={classes.tableText}>Primary provider: </div>
                                        </span>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <span>
                                            <div className={classes.tableText}>{`Dr. ${startCase(patientInfo.primary_provider_name)}`} </div>
                                        </span>
                                    </Grid>

                                    <Grid item xs={1}>
                                    <Button size="small" disabled={submitting || editFieldActive} className={classes.btn} onClick={event => this.handleClickEdit(event, 4)}>update</Button>
                                    </Grid>

                                    <Grid item xs={3}>
                                        {showEditField[4] && !patientUpdateSuccess && <div style={{float: "right"}}>
                                            <div style={{position: "relative", top: "-4px"}}>
                                                <FormSelect 
                                                    name="provider" 
                                                    label="Primary Provider"
                                                    items={selectItems}
                                                />
                                            </div>
                                            <br /><br />
                                        </div> }

                                        {showEditField[4] && patientUpdateSuccess && <div style={{float: "right", color: "green", paddingTop: "10px"}}>
                                            Successfully updated!
                                        </div> }
                                    </Grid>
                                    
                                    <Grid item xs={2}>
                                        {showEditField[4] &&  !patientUpdateSuccess && <span>
                                            <Button size="small" className={classes.btn} onClick={event => this.handleClickCancel(event)}>Cancel</Button>
                                            <Button size="small" className={classes.btn} type="submit">Submit</Button>
                                        </span> }
                                    </Grid> 

                                    <Grid item xs={2}>
                                    </Grid>
                            </Grid>

                            {showEditField[5] && !patientUpdateSuccess && <div><br /><br /><br /></div>}

                             <Grid container spacing={24}>
                                    <Grid item xs={1}>
                                        <span>
                                            <div className={classes.tableText}>Patient status:</div>
                                        </span>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <span>
                                            <div className={classes.tableText}>{patientInfo.status}</div>
                                        </span>
                                    </Grid>

                                    <Grid item xs={1}>
                                    <Button size="small" disabled={submitting || editFieldActive} className={classes.btn} onClick={event => this.handleClickEdit(event, 5)}>update</Button>
                                    </Grid>

                                    <Grid item xs={3}>
                                        {showEditField[5] && !patientUpdateSuccess && <div> 
                                            <div style={{position: "relative", left: "15px", top: "-25px"}}>
                                                <FormRadio 
                                                    name="status" 
                                                    items={radioItems}
                                                />
                                            </div>
                                           
                                        </div> }

                                        {showEditField[5] && patientUpdateSuccess && <div style={{float: "right", color: "green", paddingTop: "10px"}}>
                                            Successfully updated!
                                        </div> }
                                    </Grid>
                                    
                                    <Grid item xs={2}>
                                        {showEditField[5] &&  !patientUpdateSuccess && <span>
                                            <Button size="small" className={classes.btn} onClick={event => this.handleClickCancel(event, 1)}>Cancel</Button>
                                            <Button size="small" className={classes.btn} type="submit">Submit</Button>
                                        </span> }
                                    </Grid> 

                                    <Grid item xs={2}>
                                    </Grid>

                                </Grid> 
                    
                    </form>

                     <br />

                        {/* <Button size="small" className={classes.btn} component={Link} style={{float: "right"}} to='/admin/find'>Done</Button> */}
                                
                    <br />

                </Card>
            </div>
        );
    }
}

const validate = (values) => {
    console.log("Error values: ", values) // -> { object containing all values of form entries } 
    const errors = {};

    // validate inputs from 'values'
    
    if (values.firstname && values.firstname.length <3 ) {
        errors.firstname = "*Please enter a valid name!";   // message to be displayed if invalid
    } 

    else if (values.lastname && values.lastname.length <3)  {
        errors.lastname = "*Please enter a valid name!";   // message to be displayed if invalid
    } 

    else if (values.email && values.email.length < 5) {
        errors.email = "Please enter a valid email!";   // message to be displayed if invalid
    }

    else if (values.phone && values.phone.length < 12) {
    errors.phone = "Please enter a contact phone number!";   // message to be displayed if invalid
    }

    // else if (!values.firstname && !values.lastname && !values.email && !values.phone) {
    //     errors.firstname = " ";
    // }

    // If errors is empty, then form good to submit
    // If errors has any properties, redux form assumes form is invalid
    console.log("Errors: ", errors)
    return errors;

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle }, dispatch);
}

const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        patientInfo: state.reportPatientData.reportPatientInfo,
        patientData: state.reportPatientData.reportPatientData,
        user: state.user
    }
};

// function mapStateToProps(){
//     console.log(auth);
//     return (auth);
// }

const formData = {
    form: 'EditPatientForm', //unique identifier for this form 
    validate,      
}

EditPatient = connect(mapStateToProps, mapDispatchToProps)(EditPatient)
EditPatient = reduxForm(formData)(EditPatient)
EditPatient = withStyles(styles)(EditPatient)
export default EditPatient;