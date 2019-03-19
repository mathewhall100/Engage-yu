import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { startCase } from 'lodash';
import { withStyles, Card, Typography } from '@material-ui/core';
import FormTextFocused from '../UI/Forms/formTextFocused';
import ProviderSelect from '../UI/Forms/FormProviderSelect'
import FormRadio from '../UI/Forms/formRadio'
import DialogActionFailed from '../UI/Dialogs/dialogActionFailed'
import PatientDetailsBar from './PatientDetailsBar';
import FormUpdateUnit from '../UI/Forms/formUpdateUnit'
import CallBack from '../UI/callback'
import patient_infoAPI from "../../utils/patient_info.js";
import { selectConsoleTitle, fetchReportPatientData } from '../../actions/index';
import { validateName, validateEmail, validatePhone, validateStatus, validateIsRequired } from '../../logic/formValidations'



const styles = theme => ({
    root: {
        padding: "40px"
    },
})

class PatientUpdate extends Component {  

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Update Patient Details"});
        this.fetchPatientDetailsToUpdate()
    }    
    
    state = {
        success: false,
        failed: false
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
            console.log("valuesprovider: ", values.provider)
                patient_infoAPI.updateProvider(patientInfo._id, {
                primary_provider_ref: values.provider[0],
                primary_provider_id: values.provider[0],
                primary_provider_firstname: `${values.provider[1]}`,
                primary_provider_lastname: `${values.provider[2]}`,
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

    updateSuccess = (data) => {
        console.log("res.data: ", data)
        this.fetchPatientDetailsToUpdate()
        this.setState({success: true})
        this.props.reset('updateForm');  // reset the form fields to empty (requires form name)
    }

    updateFailed = (err) => {
        console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
        console.log(err)
        this.setState({failed: true}); // update failed dialog
    }

    // reset the success/failed flag
    outcomeReset = () => {
        this.setState({
            success: false,
            failed: false
        })
    }


    render () {
        
        const { patientInfo, handleSubmit, classes } = this.props
        const { failed, success } = this.state

        const getFormFields = (patientInfo) => [
            {
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
                fieldContent: `Dr. ${startCase(patientInfo.primary_provider_firstname)} ${startCase(patientInfo.primary_provider_lastname)}`, 
                formElement: <ProviderSelect />
            },{
                rowLabel: "Patient Status",
                fieldContent: patientInfo.status,
                formElement:  <FormRadio name="status" 
                    items={[
                        {value: "active", label: "Active"},
                        {value: "inactive", label: "Inactive"}
                    ]} 
                />
            }
        ];

       // PatientUpdate return
        return (
            <Card className={classes.root}>

                {patientInfo && patientInfo._id ? 
                    <React.Fragment>
                        <PatientDetailsBar patient={patientInfo} />
                        <Typography variant="subtitle1" gutterBottom>Click 'update' next to the information you want to edit.</Typography>
                        <br /> <br />
                        <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                            <FormUpdateUnit 
                                formFields={getFormFields(patientInfo)}
                                outcomeReset={this.outcomeReset}
                                updateSuccess={success} 
                                updateFailed={failed}
                            />
                        </form>
                        <br /> <br /> 
                        {failed && <DialogActionFailed text="A problem was encountered and the patient's details were not updated." cancelUrl="/admin/find"/>}
                    </React.Fragment>
                    :
                    <CallBack />      
                }                           
                
            </Card>
        );
    }
}

const validate = (values) => {
    console.log("Error values: ", values) 
    const errors = {}; // error accumulator
    // validate inputs from 'values'
    errors.firstname = validateName(values.firstname)
    errors.lastname = validateName(values.lastname)
    errors.email = validateEmail(values.email)
    errors.phone = validatePhone(values.phone)
    errors.provider = validateIsRequired(values.provider)
    errors.status = validateStatus(values.status)
    // If errors is empty, then form good to submit
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
    }
};

const formData = {
    form: 'updateForm', //unique identifier for this form 
    validate,      
}

PatientUpdate = connect(mapStateToProps, mapDispatchToProps)(PatientUpdate)
PatientUpdate = reduxForm(formData)(PatientUpdate)
PatientUpdate = withStyles(styles)(PatientUpdate)
export default PatientUpdate;