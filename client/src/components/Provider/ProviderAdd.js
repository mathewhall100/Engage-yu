import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash'
import { withStyles, Card, Typography, Grid} from '@material-ui/core';
import FormText from '../UI/Forms/formText'
import FormTextFocused from '../UI/Forms/formTextFocused'
import FormSelect from '../UI/Forms/formSelect'
import FormStateSelect from '../UI/Forms/formStateSelect'
import FormCheckbox from '../UI/Forms/formCheckbox'
import BtnAction from '../UI/Buttons/btnAction'
import BtnActionLink from '../UI/Buttons/btnActionLnk'
import { selectConsoleTitle, providerSave, emailNewProvider } from '../../actions'
import * as val from '../../logic/formValidations'
import ProviderSaveDialog from './ProviderSaveDialog'
import CareGroupSelect from '../CareGroup/CareGroupSelect'


const styles = () => ({
    root: {
        padding: "20px 40px 40px 16%",
    }
});    


class ProviderAdd extends Component {

    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Add New Provider"}));
    };


    componentWillUnmount() {
        this.props.dispatch(providerSave("reset"))
    }
    

    // handle form submission and saving data to database
    submit(values) {
        console.log("Submitted values: ", values);
        this.props.dispatch(providerSave(values))
     }

    // Clear form entries and reset values using Redux Form 'reset'.
    handleClearForm = () => {
        this.props.reset('EnrollProviderForm')
    }


    render() {
        const { handleSubmit, classes, pristine, submitting, newProvider, errorNewProvider, loadingNewProvider, enrollForm  } = this.props;

        const roleList =  [
            {id: "1", value: 'Physician (specialist)', text: 'Physician (specialist)' },
            {id: "2", value: 'Physician (hospitalist)', text: 'Physician (specialist)' },
            {id: "3", value: 'Physician (primary care)', text: 'Physician (primary care)' },
            {id: "4", value: 'Nurse (specialist)', text: 'Nurse (specialist)'},
            {id: "5", value: 'Other', text: 'Other'}
        ]

        const formComponents = [
            <FormTextFocused name="firstname" label="Firstname" width="320" />,
            <FormText name="lastname" label="Lastname" width="320" />,
            <FormText name="officename" label="Office/Hospital" width="320" />,
            <FormText name="officestreet" label="Address (street)" width="320" />,
            <FormText name="officecity" label="City" width="320" />,
            <div style={{paddingTop: "32px"}}><FormStateSelect name="officestate"/></div>,
            <FormText name="officezip" label="Zip" width="320" />,
            <div />,
            <FormText name="email" label="Email (john.doe@caregroup.com)" width="320" />,
            <FormText name="phone1" label="Office phone (000-000-0000)" width="320" />,
            <FormText name="phone2" label="Cell (optional)" width="320" />,
            <FormText name="phone3" label="Other phone/pager" width="320" />,
            <div style={{paddingTop: "32px"}}><FormSelect name="role" label="Role" width="320" items={roleList} /></div>,
            <div style={{paddingTop: "32px"}}><CareGroupSelect width="320" /></div>,
        ]

        return (
            <Fragment>
                
                <Card className={classes.root}>

                    <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                        <Grid container spacing={8}>
                            {formComponents.map((component, idx) => {
                                return(
                                    <Grid item xs={6} key={idx}>
                                            {component}
                                    </Grid>
                                )
                            }) }
                        </Grid>

                        <br /><br />

                         <FormCheckbox name="signUp" label="signup" />

                        <Typography variant="subtitle2" inline gutterBottom>Enable provider login.</Typography>

                        <br />

                        {enrollForm && enrollForm.values && enrollForm.values.signUp === true && <Fragment> 
                            <Typography variant="body1" gutterBottom style={{width: "85%", maxWidth: '900px'}}> 
                                Log in rquires a registered email and password. Please confirm the provider's email address and enter a temporary password. The provider will be prompted to change the temporary password to a secure one of their choice when they first login. 
                                </Typography>
                            <Grid container spacing={24}>
                                <Grid item xs={6}>
                                    <FormText name="email2" label="Confirm email" width="320" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormText name="password" label="Temporary password" type="passsword" width="320" />
                                </Grid>
                            </Grid>
                        </Fragment>}  

                        <br /> <br />
                        <BtnAction type="submit" disabled={submitting || pristine} text="submit" marginRight={true}/>
                        <BtnAction type="button" disabled={pristine} url='/admin/provider/find' text="clear" warning={true} marginRight={true} handleAction={this.handleClearForm} />
                        <BtnActionLink disabled={false} url='/admin/provider/find' text="cancel" warning={true}/>
                    </form>

                </Card>

                {(loadingNewProvider || errorNewProvider || !isEmpty(newProvider)) && <ProviderSaveDialog enableLogin={enrollForm.values.signUp}/> }

            </Fragment>
        );
    };

};


function validate(values) {
    console.log("Error values: ", values) // -> { object containing all values of form entries } 
    const errors = {}; // error accumulator
    // validate inputs from 'values'; true=required
    errors.firstname = val.validateName(values.firstname, true)
    errors.lastname = val.validateName(values.lastname, true)
    errors.officename = val.validateName(values.officename, true)
    errors.officestreet = val.validateName(values.officestreet, true)
    errors.officecity = val.validateName(values.officecity, true)
    errors.officestate = val.validateState(values.officestate, true)
    errors.officezip = val.validateZip(values.officezip, true)
    errors.email = val.validateEmail(values.email, true)
    errors.phone1 = val.validatePhone(values.phone1, true)
    errors.phone2 = val.validatePhone(values.phone2, false)
    errors.phone3 = val.validatePhoneOther(values.phone3, false)
    errors.caregroup = val.validateIsRequired(values.caregroup)
    errors.role = val.validateIsRequired(values.role)
    errors.password1 = val.validatePassword(values.password1, true)
    // errors.email2 = val.validateEmails(values.email, values.email2) // need to write validation code and import it
    // errors.password2 = val.validatePasswords(values.password1, values.password2)
    // If errors is empty, then form good to submit
    console.log("Errors: ", errors)
    return errors;
}

const formData = {
    form: 'EnrollProviderForm', //unique identifier for this form 
    validate      
}

const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        newProvider: state.providerSave.info,
        loadingNewProvider: state.providerSave.loading,
        errorNewProvider: state.providerSave.error,
        enrollForm: state.form.EnrollProviderForm
    }
};

ProviderAdd = reduxForm(formData)(ProviderAdd)
ProviderAdd = withRouter(ProviderAdd)
ProviderAdd = withStyles(styles)(ProviderAdd)
ProviderAdd = connect(mapStateToProps)(ProviderAdd)
export default ProviderAdd
