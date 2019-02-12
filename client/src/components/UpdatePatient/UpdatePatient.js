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
import PatientDetailsBar from '../Textblocks/patientDetailsBar';


const dialog = {title: "Whoops, Update Failed!", text: "Unfortueatley the requested update could not be made. Please check that the new details entered are valid and correct and try again. If the problem persists, conatct the system administrator"}


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
        successFlag: [],
        selectItems: [],
        PatientUpdateSuccessDialog: false,
        PatientUpdateFailedDialog: false
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
                res.data.providerList.map((provider, index) => {
                    selectItems.push({
                        value: index,
                        text: `Dr. ${provider.firstname} ${provider.lastname}`,
                        id: provider._id, 
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

        if (values.firstname) {
            patient_infoAPI.updateName(this.props.patientInfo._id, {
                firstname: values.firstname,
                lastname: this.props.patientInfo.lastname
            })
            .then(res => {this.updateSuccess(res.data, 0) })
            .catch(err => {this.updateFailed(err)})
        } else if (values.lastname) {
            patient_infoAPI.updateName(this.props.patientInfo._id, {
                firstname: this.props.patientInfo.firstname,
                lastname: values.lastname
            })
            .then(res => {this.updateSuccess(res.data, 1) })
            .catch(err => {this.updateFailed(err) })
        } else if (values.email) {
            patient_infoAPI.updateEmail(this.props.patientInfo._id, {
                email: values.email,
            })
            .then(res => {this.updateSuccess(res.data, 2) })
            .catch(err => {this.updateFailed(err) })
        } else if (values.phone) {
            patient_infoAPI.updatePhone(this.props.patientInfo._id, {
                phone: values.phone,
            })
            .then(res => {this.updateSuccess(res.data, 3) })
            .catch(err => {this.updateFailed(err) })
        } else if (values.provider) {
            patient_infoAPI.updateProvider(this.props.patientInfo._id, {
                primary_provider_ref: this.state.selectItems[values.provider].id,
                primary_provider_id: this.state.selectItems[values.provider].id,
                primary_provider_name: this.state.selectItems[values.provider].text.slice(3),
            })
            .then(res => {this.updateSuccess(res.data, 4) })
            .catch(err => {this.updateFailed(err) })
        } else if (values.status) {
            patient_infoAPI.updateStatus(this.props.patientInfo._id, {
                status: values.status
            })
            .then(res => {this.updateSuccess(res.data, 5) })
            .catch(err => {this.updateFailed(err) })
        }
    }

    updateSuccess = (data, index) => {
        console.log("res.data: ", data)
        this.fetchPatientDetailsToUpdate()
        let tempFlag = this.state.successFlag
        tempFlag[index] = true
        this.setState({
            editFieldActive: false,
            patientUpdateSuccess: true,
            successFlag: tempFlag
        })
        this.props.dispatch(reset('UpdatePatientForm'));  // requires form name
    }

    updateFailed = (err) => {
        console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
        console.log(err);
        this.setState({patientUpdateFailed: true}); // update failed dialog
    }


    handleBtn = (index) => {
        if (index === "cancel") {
            this.setState({
                showEditField: [],
                editFieldActive: false,
                patientUpdateFailed: false
            })
            this.props.dispatch(reset('UpdatePatientForm'));  // reset the form fields to empty (requires form name)
         } else if (index === "tryagain") {
            this.setState({patientUpdateFailed: false})
        } else {
            this.setState({patientUpdateSuccess: false}) 
            let tempArray = [], tempFlag = []
            tempArray[index] = true
            tempFlag = this.state.successFlag
            tempFlag[index] = false
            this.setState({
                showEditField: tempArray,
                successFlag: tempFlag,
                editFieldActive: true,
            })
        } 
    };


    render () {
        
        const { submitting, pristine, patientInfo, handleSubmit, classes } = this.props
        const { selectItems, editFieldActive, successFlag, showEditField, patientUpdateFailed, patientUpdateSuccess } = this.state

        const patientDetails = [
            {caption: "Current name", text: `${startCase(patientInfo.firstname)} ${startCase(patientInfo.lastname)}`  },
            {caption: "Hospital number", text: patientInfo.hospital_id},
            {caption: "DOB", text: patientInfo.dob},
            {caption: "Date enrolled", text: moment(patientInfo.date_enrolled).format("MMM Do YYYY")},
        ];       
        const radioItems = [
            {value: "active", label: "Active"},
            {value: "inactive", label: "Inactive"}
        ];
        const formFields = [{
            rowLabel: "Firstname", 
            fieldContent: startCase(patientInfo.firstname), 
            formElement: <FormTextFocused name="firstname" label="New firstname" width={200}/>
            },{
            rowLabel: "Lastname", 
            fieldContent: startCase(patientInfo.lastname), 
            formElement: <FormTextFocused name="lastname" label="New lastname" width={200}/>
            },{
            rowLabel: "Email", 
            fieldContent: patientInfo.email, 
            formElement: <FormTextFocused name="email" label="New email address" width={200}/>
            },{
            rowLabel: "Phone", 
            fieldContent: patientInfo.phone, 
            formElement: <FormTextFocused name="phone" label="New phone number" width={150}/>
            },{
            rowLabel: "Primary Provider", 
            fieldContent: `Dr. ${startCase(patientInfo.primary_provider_name)}`, 
            formElement: <FormSelect name="provider" label="Primary Provider" items={selectItems} width={200}/>
            },{
            rowLabel: "Patient Status",
            fieldContent: patientInfo.status,
            formElement:  <FormRadio name="status" items={radioItems} />
            }
        ];

        const getPositioning = (index) => {
            switch (index) {
                case 4: 
                    return {top: '-8px'}
                case 5: 
                    return {top: '-2px'}
                default: 
                    return {top: "-24px" }
            }
        }


       // UpdatePatient return
        return (

            <Card className={classes.root}>
                <Grid container spacing={24} style={{paddingLeft: "10px"}}>
                    <PatientDetailsBar items={patientDetails} closeBtn={true} />
                </Grid>

                <br /><hr /><br />

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
                                    <SmallBtn type="button" disabled={submitting || editFieldActive} index={index} text="update" handleBtn={this.handleBtn}/>
                                </Grid>
                                <Grid item xs={3}>
                                    { showEditField[index] && !patientUpdateSuccess && !patientUpdateFailed &&
                                        <span className={classes.formElement} style={getPositioning(index)} >      
                                            {field.formElement}
                                        </span> 
                                    }
                                    { ((showEditField[index] && patientUpdateSuccess) || successFlag[index]) &&
                                        <Typography variant="subtitle1" align="center" className={classes.successText}>
                                            Successfully updated!
                                        </Typography> 
                                    }
                                    { showEditField[index] && patientUpdateFailed && 
                                        <Typography variant="subtitle1" align="center" color="error" className={classes.failedText}>
                                            Update failed!
                                        </Typography> 
                                    }
                                </Grid>
                                <Grid item xs={3}>
                                    { showEditField[index] && patientUpdateFailed && 
                                        <span> 
                                            <SmallBtn type="button" disabled={false} index="cancel" text="cancel" handleBtn={this.handleBtn}/>
                                            <SmallBtn type="button" disabled={false} index="tryagain" text="try again" handleBtn={this.handleBtn}/>
                                        </span>
                                    }
                                    {showEditField[index] && !patientUpdateSuccess && !patientUpdateFailed &&
                                        <span style={{marginLeft: "10px"}}>
                                            <SmallBtn type="submit" disabled={submitting || pristine} index="" text="submit" /> 
                                            <SmallBtn type="button" disabled={false} index="cancel" text="cancel" handleBtn={this.handleBtn}/>
                                        </span>
                                    }
                                </Grid> 
                            </Grid>
                        )
                    }) }

                </form>

                <br /><br /> 
                
                {patientUpdateFailed && <Dialog title={dialog.title} text={dialog.text} />}                  
                
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
    form: 'UpdatePatientForm', //unique identifier for this form 
    validate,      
}

UpdatePatient = connect(mapStateToProps, mapDispatchToProps)(UpdatePatient)
UpdatePatient = reduxForm(formData)(UpdatePatient)
UpdatePatient = withStyles(styles)(UpdatePatient)
UpdatePatient = withRouter(UpdatePatient)
export default UpdatePatient;