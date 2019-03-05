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
import providerAPI from "../../utils/provider.js";
import FormTextFocused from '../Forms/FormTextFocused';
import FormSelect from '../Forms/FormSelect'
import FormRadio from '../Forms/FormRadio'
import Dialog from '../Dialogs/simpleDialog'
import PatientDetailsBar from './patientDetailsBar';
import UpdateFormUnit from '../Forms/UpdateFormUnit'
import CallBack from '../Callback'
import { validateName, validateEmail, validatePhone, validateStatus } from '../../logic/formValidations'


const styles = theme => ({
    root: {
        padding: "40px"
    },
})

class UpdatePatient extends Component {  

    componentDidMount() {
        console.log("UpdatePatient, CDM: ", localStorage.getItem("patient_id"))
        this.props.selectConsoleTitle({title: "Update patient details"});
        this.fetchPatientDetailsToUpdate()
        this.fetchProviders()
    }    
    
    state = {
        providerList: [],
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
        providerAPI.findAll()
            .then(res => {
                console.log("res.data: ", res.data);
                let providerList=[];
                res.data.map(provider => {
                    providerList.push({
                        value: provider._id,
                        text: `Dr. ${provider.firstname} ${provider.lastname}`,
                    })
                    this.setState({providerList})
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
                primary_provider_ref: values.provider,
                primary_provider_id: values.provider,
                primary_provider_name: this.state.providerList.filter(p => p.value === values.provider)[0].text.slice(3),
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
        this.setState({updateSuccess: true})
        this.props.reset('updateForm');  // reset the form fields to empty (requires form name)
    }

    updateFailed = (err) => {
        console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
        console.log(err)
        this.setState({updateFailed: true}); // update failed dialog
    }

    // reset the success/failed flag
    outcomeReset = () => {
        this.setState({
            updateSuccess: false,
            updateFailed: false
        })
    }


    render () {
        
        const { patientInfo, handleSubmit, classes } = this.props
        const { providerList, updateFailed, updateSuccess } = this.state

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
                formElement: <FormSelect name="provider" label="Primary Provider" items={providerList} width={215}/>
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
                                updateSuccess={updateSuccess} 
                                updateFailed={updateFailed}
                            />
                        </form>

                        <br /> <br /> 
                        
                        {updateFailed && 
                            <Dialog 
                                title="Whoops, Update Failed!" 
                                text="Unfortueatley the requested update could not be made. Please check that the new details entered are valid and correct and try again. If the problem persists, conatct the system administrator"
                            /> 
                        } 
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
    errors.provider = validateName(values.provider)
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