import React, { Component } from 'react';
import { Field, reset, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { startCase } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { selectConsoleTitle, fetchReportPatientData } from '../../actions/index';
import patient_infoAPI from "../../utils/patient_info.js";
import FormTextFocused from '../Forms/FormTextFocused';
import ProviderSelect from '../Forms/ProviderSelect'
import FormRadio from '../Forms/FormRadio'
import ActionFailedDialog from '../Dialogs/ActionFailedDialog'
import PatientDetailsBar from './patientDetailsBar';
import UpdateFormUnit from '../Forms/UpdateFormUnit'
import CallBack from '../Callback'
import { validateName, validateEmail, validatePhone, validateStatus, validateIsRequired } from '../../logic/formValidations'


const styles = theme => ({
    root: {
        padding: "40px"
    },
})

class UpdatePatient extends Component {  

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
                firstname: values.firstnam,
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
                primary_provider_ref: values.provider[0],
                primary_provider_id: values.provider[0],
                primary_provider_name: `${values.provider[1]} ${values.provider[2]}`,
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
                fieldContent: `Dr. ${startCase(patientInfo.primary_provider_name)}`, 
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

       // UpdatePatient return
        return (
            <Card className={classes.root}>

                {patientInfo && patientInfo._id ? 
                    <React.Fragment>
                        <PatientDetailsBar patient={patientInfo} />
                        <Typography variant="title" gutterBottom>Click 'update' next to the information you want to edit.</Typography>
                        <br /> <br />
                        <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                            <UpdateFormUnit 
                                formFields={getFormFields(patientInfo)}
                                outcomeReset={this.outcomeReset}
                                updateSuccess={success} 
                                updateFailed={failed}
                            />
                        </form>
                        <br /> <br /> 
                        {failed && <ActionFailedDialog text="A problem was encountered and the patient's details were not updated." url="/admin/find"/>}
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

UpdatePatient = connect(mapStateToProps, mapDispatchToProps)(UpdatePatient)
UpdatePatient = reduxForm(formData)(UpdatePatient)
UpdatePatient = withStyles(styles)(UpdatePatient)
export default UpdatePatient;