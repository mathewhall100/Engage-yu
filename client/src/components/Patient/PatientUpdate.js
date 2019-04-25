import React, { PureComponent, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { startCase, isEmpty } from 'lodash';
import { withStyles, Card, Typography } from '@material-ui/core';
import FormTextFocused from '../UI/Forms/formTextFocused';
import ProviderSelect from '../UI/Forms/FormProviderSelect'
import FormRadio from '../UI/Forms/formRadio'
import DialogSaveFailure from '../UI/Dialogs/dialogSaveFailure'
import PatientDetailsBar from './PatientDetailsBar';
import FormUpdateUnit from '../UI/Forms/formUpdateUnit'
import { selectConsoleTitle, loadPatient, patientUpdateSave } from '../../actions';
import { providerName } from '../../logic/textFunctions'
import { validateName, validateEmail, validatePhone, validateStatus, validateIsRequired } from '../../logic/formValidations'


const styles = theme => ({
    root: {
        padding: "40px"
    },
})

class PatientUpdate extends PureComponent {  

    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Update Patient Details", menuIndex: 2}));
    }  
    
    componentWillReceiveProps(nextProps) {
        if (!isEmpty(nextProps.patientUpdate) && nextProps.patientUpdate !== this.props.patientUpdate) {this.updateSuccess()}
        if (nextProps.errorPatientUpdate) {this.updateFailed()}
        if (nextProps.loadingPatientUpdate) {this.updateInProgress()}
    }    

    state = {
        success: false,
        failed: false,
        inProgress: false
    }

    submit(values) {
        console.log("Submit: ", values)
        const { patientInfo } = this.props
        this.props.dispatch(patientUpdateSave(values, patientInfo))
    }

    updateSuccess = () => {
        this.props.dispatch(loadPatient(this.props.patientInfo._id))
        this.props.reset('updateForm');  // reset the form fields to empty (requires form name)
        this.setState({success: true})
    }

    updateFailed = (err) => {
        this.setState({failed: true}); // update failed dialog
        let values="clear"
        this.props.dispatch(patientUpdateSave(values))
    }

    updateInProgress = (err) => {
        this.setState({inProgress: true}); // update failed dialog
    }

    // reset the success/failed flag
    outcomeReset = () => {
        this.setState({
            success: false,
            failed: false,
            inProgress: false
        })
    }

    render () {
        const { patientInfo, error, handleSubmit, classes } = this.props
        const { failed, success, inProgress } = this.state

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
                fieldContent: providerName(patientInfo.primary_provider.title, patientInfo.primary_provider.firstname, patientInfo.primary_provider.lastname), 
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

        if (error) {
            return <div>Error! {error}</div>
        }

        if (isEmpty(patientInfo)) {
            return null
        }

        return (
            <Fragment>
                <Card className={classes.root}>
                    <PatientDetailsBar patient={patientInfo} />
                    <Typography variant="subtitle1" gutterBottom>Click 'update' next to the information you want to edit.</Typography>
                    <br /> <br />
                    <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                        <FormUpdateUnit 
                            formFields={getFormFields(patientInfo)}
                            outcomeReset={this.outcomeReset}
                            updateSuccess={success}
                            updateInProgress={inProgress} 
                            updateFailed={failed}
                        />
                    </form>
                    <br /> <br />
                </Card>

                {failed && <DialogSaveFailure text="A problem was encountered and the patient's details were not updated." cancelUrl="/admin/find"/>} 

            </Fragment>
        );
    }
}

const validate = (values) => {
    //console.log("Error values: ", values) 
    const errors = {}; // error accumulator
    // validate inputs from 'values'
    errors.firstname = validateName(values.firstname)
    errors.lastname = validateName(values.lastname)
    errors.email = validateEmail(values.email)
    errors.phone = validatePhone(values.phone)
    errors.provider = validateIsRequired(values.provider)
    errors.status = validateStatus(values.status)
    // If errors is empty, then form good to submit
    //console.log("Errors: ", errors)
    return errors;
}

const mapStateToProps = (state) => {
    //console.log("State : ", state);
    return {
        patientInfo: state.patient.patient.patientInfo,
        error: state.patient.error,
        loading: state.patient.loading,
        patientUpdate: state.patientUpdate.update,
        errorPatientUpdate: state.patientUpdate.error,
        loadingPatientUpdate: state.patientUpdate.loading
    }
};

const formData = {
    form: 'updateForm', //unique identifier for this form 
    validate     
}

PatientUpdate = connect(mapStateToProps)(PatientUpdate)
PatientUpdate = reduxForm(formData)(PatientUpdate)
PatientUpdate = withStyles(styles)(PatientUpdate)
export default PatientUpdate;