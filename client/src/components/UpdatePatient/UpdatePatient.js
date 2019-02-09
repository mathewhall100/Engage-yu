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
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { selectConsoleTitle, fetchReportPatientData } from '../../actions/index';
import patient_infoAPI from "../../utils/patient_info.js";
import providerAPI from "../../utils/provider.js";
import FormTextFocused from '../Forms/FormTextFocused';
import FormSelect from '../Forms/FormSelect'
import FormRadio from '../Forms/FormRadio'
import Dialog from '../Dialogs/simpleDialog'
import PatientDetailsBar from '../Textblocks/patientDetailsBar';


const dialog = {title: "Whoops, Update Failed!", text: "Unfortueatley the requested update could not be made. Please check that the new details entered are valid and correct and try again. If the problem persists, conatct the system administrator"}


const styles = theme => ({
    root: {
        padding: "40px"
    },
    tableText: {
        marginTop: "10px"
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
    smallBtn: { 
        margin: "10px 0 0 20px",
        padding: "0 5px",
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.primary.main,
        borderRadius: "5px",
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
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

    handleBtnClick(index) {
        if (index === "cancel") {
            console.log("cancel")
            this.setState({
                showEditField: [],
                editFieldActive: false,
                patientUpdateFailed: false
            })
            this.props.dispatch(reset('UpdatePatientForm'));  // requires form name
         } else if (index === "tryagain") {
            this.setState({patientUpdateFailed: false})
        } else {
            this.setState ({patientUpdateSuccess: false}) 
            if (this.state.editFieldActive) {
                // maybe show error message that only one field may be updated at once
            }
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

        const RenderBtn = (props) => 
            <Button 
                type={props.type} 
                variant="outlined"
                size="small" 
                className={classes.smallBtn} 
                disabled={props.disabled} 
                onClick={() => props.type === "submit" ? null : this.handleBtnClick(props.index)}
                >
                    {props.text}
            </Button>

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
                                    <RenderBtn type="button" disabled={submitting || editFieldActive} index={index} text="update" />
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
                                        <React.Fragment> 
                                            <RenderBtn type="button" disabled={false} index="cancel" text="cancel" />
                                            <RenderBtn type="button" disabled={false} index="tryagain" text="try again" />
                                        </React.Fragment>
                                    }
                                    {showEditField[index] && !patientUpdateSuccess && !patientUpdateFailed &&
                                        <span style={{marginLeft: "10px"}}>
                                            <RenderBtn type="submit" disabled={pristine} index="" text="submit" /> 
                                            <RenderBtn type="button" disabled={false} index="cancel" text="cancel" />
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
    if (values.firstname && values.firstname.length <3 ) {
        errors.firstname = "*Please enter a valid name!";   // message to be displayed if invalid
    } 
    else if (values.lastname && values.lastname.length <3)  {
        errors.lastname = "*Please enter a valid name!";   
    } 
    else if (values.email && values.email.length < 5) {
        errors.email = "Please enter a valid email!";   
    }
    else if (values.phone && values.phone.length < 12) {
    errors.phone = "Please enter a contact phone number!";   
    }
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