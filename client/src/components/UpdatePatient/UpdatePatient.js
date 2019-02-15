import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { reduxForm, reset } from 'redux-form';
import { startCase } from 'lodash';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { selectConsoleTitle, fetchReportPatientData } from '../../actions/index';
import patient_infoAPI from "../../utils/patient_info.js";
import providerAPI from "../../utils/provider.js";
import FormTextFocused from '../Forms/FormTextFocused';
import FormSelect from '../Forms/FormSelect'
import FormRadio from '../Forms/FormRadio'
import Dialog from '../Dialogs/simpleDialog'
import SmallBtn from '../Buttons/smallBtn';
import DetailsBar from '../Textblocks/detailsBar';


const styles = theme => ({
    root: {
        padding: "40px"
    },
    fwMedium: {
        fontWeight: 500,
    },
    formElement: {
        position: "relative",
        left: "15px"
    },
    successText: {
        color: "green", 
        position: "relative", top: "6px"
    },
    failedText: {
        position: "relative", top: "6px"
    },
})

class UpdatePatient extends Component {  

    componentDidMount() {
        console.log("UpdatePatient, CDM: ", localStorage.getItem("patient_id"))
        this.props.selectConsoleTitle({title: "Update patient details"});
        this.fetchPatientDetailsToUpdate()
        this.fetchProviders()
        this.setState({editFieldActive: false})
    }    
    
    state = {
        editFieldActive: false,
        showEditField: [],
        selectItems: [],
        updateSuccess: false,
        updateFailed: false
    }

    // Fetch patient info using patient_id in local storage and ensure loaded into store
    fetchPatientDetailsToUpdate = () => {
        let patientInfo, patientData
        const url = `/api/patient_info/find/${localStorage.getItem("patient_id")}`
        axios.get(url)
        .then( res => {
            patientInfo = res.data
            axios.get(`/api/patient_data/${patientInfo.patient_data_id}`)
            .then( res => {
                patientData = res.data
                console.log("axios patientInfo: ", patientInfo)
                console.log("axios patientData: ", patientData)
                this.props.fetchReportPatientData(patientInfo, patientData)
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
        })
    };

    // Fetch names of all providers in provider group to populate primary provider form field
    fetchProviders = () => {
        providerAPI.findAllByGroup(localStorage.getItem("provider_group_id"))
            .then(res => {
                console.log("res.data: ", res.data);
                let selectItems=[];
                res.data.providerList.map(provider => {
                    selectItems.push({
                        value: provider._id,
                        text: `Dr. ${provider.firstname} ${provider.lastname}`,
                    })
                    this.setState({selectItems})
                })
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
        })
    };
    

    submit(values) {
        console.log("Submit: ", values)
        const { patientInfo } = this.props

        if (values.firstname) {
            patient_infoAPI.updateName(patientInfo._id, {
                firstname: values.firstname,
                lastname: patientInfo.lastname
            })
            .then(res => {this.updateSuccess(res.data, 0) })
            .catch(err => {this.updateFailed(err)})
        } else if (values.lastname) {
            patient_infoAPI.updateName(patientInfo._id, {
                firstname: patientInfo.firstname,
                lastname: values.lastname
            })
            .then(res => {this.updateSuccess(res.data, 1) })
            .catch(err => {this.updateFailed(err) })
        } else if (values.email) {
            patient_infoAPI.updateEmail(patientInfo._id, {
                email: values.email,
            })
            .then(res => {this.updateSuccess(res.data, 2) })
            .catch(err => {this.updateFailed(err) })
        } else if (values.phone) {
            patient_infoAPI.updatePhone(patientInfo._id, {
                phone: values.phone,
            })
            .then(res => {this.updateSuccess(res.data, 3) })
            .catch(err => {this.updateFailed(err) })
        } else if (values.provider) {
            patient_infoAPI.updateProvider(patientInfo._id, {
                primary_provider_ref: values.provider,
                primary_provider_id: values.provider,
                primary_provider_name: this.state.selectItems[values.provider].text.slice(3),
            })
            .then(res => {this.updateSuccess(res.data, 4) })
            .catch(err => {this.updateFailed(err) })
        } else if (values.status) {
            patient_infoAPI.updateStatus(patientInfo._id, {
                status: values.status
            })
            .then(res => {this.updateSuccess(res.data, 5) })
            .catch(err => {this.updateFailed(err) })
        }
    }

    updateSuccess = (data, index) => {
        console.log("res.data: ", data)
        this.fetchPatientDetailsToUpdate()
        this.setState({
            editFieldActive: false,
            updateSuccess: true,
        })
        this.props.reset('patientUpdateForm');  // reset the form fields to empty (requires form name)
    }

    updateFailed = (err) => {
        console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
        console.log(err);
        this.setState({updateFailed: true}); // update failed dialog
    }


    // Event handlers
    handleUpdate = (index) => {
        this.setState({updateSuccess: false}) 
        let tempArray = []
        tempArray[index] = true
        this.setState({
            showEditField: tempArray,
            editFieldActive: true,
        })
    } 
    
    handleCancel = () => {
        this.setState({
            showEditField: [],
            editFieldActive: false,
            updateFailed: false
        })
        this.props.reset('patientUpdateForm');  // reset the form fields to empty (requires form name)
    }

    handleTryAgain = () => {
        this.setState({updateFailed: false})
    }


    render () {
        
        const { submitting, pristine, patientInfo, handleSubmit, classes } = this.props
        const { selectItems, editFieldActive, successFlag, showEditField, updateFailed, updateSuccess } = this.state

        const patientDetails = [
            {spacing: 3, caption: "Current name", text: `${startCase(patientInfo.firstname)} ${startCase(patientInfo.lastname)}`  },
            {spacing: 2, caption: "Hospital number", text: patientInfo.hospital_id},
            {spacing: 2, caption: "DOB", text: patientInfo.dob},
            {spacing: 2, caption: "Date enrolled", text: moment(patientInfo.date_enrolled).format("MMM Do YYYY")},
            {spacing: 3, caption: "btn", text: "close", url: "admin/find"}
        ];

        const radioItems = [
            {value: "active", label: "Active"},
            {value: "inactive", label: "Inactive"}
        ];

        const formFields = [{
            rowLabel: "Firstname", 
            fieldContent: startCase(patientInfo.firstname), 
            formElement: <FormTextFocused name="firstname" label="New firstname" width={215}/>
            },{
            rowLabel: "Lastname", 
            fieldContent: startCase(patientInfo.lastname), 
            formElement: <FormTextFocused name="lastname" label="New lastname" width={215}/>
            },{
            rowLabel: "Email", 
            fieldContent: patientInfo.email, 
            formElement: <FormTextFocused name="email" label="New email address" width={215}/>
            },{
            rowLabel: "Phone", 
            fieldContent: patientInfo.phone, 
            formElement: <FormTextFocused name="phone" label="New phone number" width={215}/>
            },{
            rowLabel: "Primary Provider", 
            fieldContent: `Dr. ${startCase(patientInfo.primary_provider_name)}`, 
            formElement: <FormSelect name="provider" label="Primary Provider" items={selectItems} width={215}/>
            },{
            rowLabel: "Patient Status",
            fieldContent: patientInfo.status,
            formElement:  <FormRadio name="status" items={radioItems} />
            }
        ];

        const getPositioning = (element) => {
            console.log(element)
            if (element.includes("Select")) {return {top: "-12px"}}
            else if (element.includes("Radio")) {return {top: "-2px"}}
            else return {top: "-28px"}
        }

       // UpdatePatient return
        return (
            <Card className={classes.root}>
                <Grid container spacing={24} style={{paddingLeft: "10px"}}>
                    <DetailsBar items={patientDetails} />
                </Grid>

                <br /> <hr /> <br />

                <Typography variant="title" gutterBottom>
                    Click 'update' next to the information you want to edit. 
                </Typography>

                <br />

                <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>

                    {formFields.map((field, index) => {
                        return (
                            <Grid container spacing={8} key={index}>
                                <Grid item xs={2}>
                                    <Typography variant="subtitle1" >{field.rowLabel}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1" className={classes.fwMedium} >{field.fieldContent}</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <SmallBtn type="button" disabled={submitting || editFieldActive} index={index} text="update" handleBtn={this.handleUpdate}/>
                                </Grid>
                                <Grid item xs={3}>
                                    { showEditField[index] && !updateSuccess && !updateFailed &&
                                        <span className={classes.formElement} style={getPositioning(field.formElement.type.name)} >      
                                            {field.formElement}
                                        </span> 
                                    }
                                    { showEditField[index] && updateSuccess &&
                                        <Typography variant="subtitle1" align="center" className={classes.successText}>
                                            Successfully updated!
                                        </Typography> 
                                    }
                                    { showEditField[index] && updateFailed && 
                                        <Typography variant="subtitle1" align="center" color="error" className={classes.failedText}>
                                            Update failed!
                                        </Typography> 
                                    }
                                </Grid>
                                <Grid item xs={3}>
                                    { showEditField[index] && updateFailed && 
                                        <span> 
                                            <SmallBtn type="button" disabled={false} index="" text="cancel" handleBtn={this.handleCancel}/>
                                            <SmallBtn type="button" disabled={false} index="" text="try again" handleBtn={this.handleTryAgain}/>
                                        </span>
                                    }
                                    {showEditField[index] && !updateSuccess && !updateFailed &&
                                        <span style={{marginLeft: "10px"}}>
                                            <SmallBtn type="submit" disabled={submitting || pristine} index="" text="submit" /> 
                                            <SmallBtn type="button" disabled={false} index="" text="cancel" handleBtn={this.handleCancel}/>
                                        </span>
                                    }
                                </Grid> 
                            </Grid>
                        )
                    }) }

                </form>

                <br /><br /> 
                
                {updateFailed && <Dialog title="Whoops, Update Failed!" text="Unfortueatley the requested update could not be made. Please check that the new details entered are valid and correct and try again. If the problem persists, conatct the system administrator"/> }                  
                
            </Card>
        );
    }
}

const validate = (values) => {
    console.log("Error values: ", values) // -> { object containing all values of form entries } 

    const errors = {};
    // validate inputs from 'values'
    if (values.firstname && !/^[a-zA-Z0-9' ]{2,30}$/i.test(values.firstname))  {
        errors.firstname = "Invalid name. Only characters, numbers and ' allowed"}

    if (values.lastname && !/^[a-zA-Z0-9' ]{2,30}$/i.test(values.lastname))  {
        errors.lastname = "Invalid name. Only characters, numbers and ' allowed"}    

    if (values.email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(values.email)) {
        errors.email = "Invalid email address."}     

    if (values.phone && !/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/i.test(values.phone)) {
        errors.phone = "*Invalid phone number. Try (123) 456 7891 format" }   
    
    // If errors is empty, then form good to submit
    // If errors has any properties, redux form assumes form is invalid
    console.log("Errors: ", errors)
    return errors;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, fetchReportPatientData }, dispatch);
}

const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        patientInfo: state.reportPatientData.reportPatientInfo,
        patientData: state.reportPatientData.reportPatientData,
        user: state.user
    }
};

const formData = {
    form: 'patientUpdateForm', //unique identifier for this form 
    validate,      
}

UpdatePatient = connect(mapStateToProps, mapDispatchToProps)(UpdatePatient)
UpdatePatient = reduxForm(formData)(UpdatePatient)
UpdatePatient = withStyles(styles)(UpdatePatient)
UpdatePatient = withRouter(UpdatePatient)
export default UpdatePatient;