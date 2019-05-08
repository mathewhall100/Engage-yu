import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash'
import { withStyles, Card, Typography, Grid} from '@material-ui/core';
import FormText from '../UI/Forms/formText'
import FormTextFocused from '../UI/Forms/formTextFocused'
import FormTextPassword from '../UI/Forms/formTextPassword'
import FormSelect from '../UI/Forms/formSelect'
import FormStateSelect from '../UI/Forms/formStateSelect'
import FormCheckbox from '../UI/Forms/formCheckbox'
import BtnAction from '../UI/Buttons/btnAction'
import BtnActionLink from '../UI/Buttons/btnActionLnk'
import { selectConsoleTitle, providerSave } from '../../actions'
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
        this.props.dispatch(selectConsoleTitle({title: "Add New Provider", menuIndex: 6}));
    };

    componentWillUnmount() {
        this.props.dispatch(providerSave("reset"))
    }

    // handle form submission and saving data to database
    submit(values) {
        console.log("Submitted values: ", values);
        this.props.dispatch(providerSave(values))
     }

    // Check if provider should be added as a user with login capability
    queryEnableLogin = () => {
        if (this.props.enrollForm && this.props.enrollForm.values) {
            const { signup, email, password } = this.props.enrollForm.values
            if (signup && email && password) return true
        }
        return false
    }

    // Clear form entries and reset values using Redux Form 'reset'.
    handleClearForm = () => {
        this.props.reset('EnrollProviderForm')
    }


    render() {
        const { handleSubmit, classes, pristine, submitting, newProvider, errorNewProvider, loadingNewProvider, enrollForm  } = this.props;

        const titleList = [
            {id: "1", value: 'prof', text: 'Prof.' },
            {id: "2", value: 'dr', text: 'Dr.' },
            {id: "3", value: 'rn', text: 'RN' },
            {id: "4", value: 'np', text: 'NP' },
            {id: "5", value: 'dnp', text: 'DNP' },
            {id: "6", value: 'admin', text: 'admin' },
            {id: "7", value: 'other', text: 'other' },
        ]

        const roleList =  [
            {id: "1", value: 'physician (specialist)', text: 'Physician (specialist)' },
            {id: "2", value: 'physician (hospitalist)', text: 'Physician (specialist)' },
            {id: "3", value: 'physician (primary care)', text: 'Physician (primary care)' },
            {id: "4", value: 'nurse (registered)', text: 'Nurse (registered)'},
            {id: "5", value: 'nurse practitioner', text: 'Nurse practitioner'},
            {id: "6", value: 'admin', text: 'Admin'},
            {id: "7", value: 'other', text: 'Other'},
        ]

        const formComponents = [
            <div style={{width: "320px"}}> 
                <span style={{position: "relative", top: "16px"}}>
                    <FormSelect name="title" label="Title" width="70" items={titleList} />
                </span>
                <span style={{float: "right"}}> 
                    <FormTextFocused name="firstname" label="Firstname" width="170" />
                </span>
            </div>,
          
            <FormText name="lastname" label="Lastname" width="320" />,
            <FormText name="officename" label="Office/Hospital" width="320" />,
            <FormText name="officestreet" label="Address (street)" width="320" />,
            <FormText name="officecity" label="City" width="320" />,
            <div style={{width: "320px"}}>
                <span style={{position: "relative", top: "16px"}}>
                    <FormStateSelect name="officestate"/>
                </span>
                <span style={{float: 'right'}}>
                    <FormText name="officezip" label="Zip" width="60" />
                </span>
            </div>,
            <FormText name="email" label="Email (john.doe@caregroup.com)" width="320" />,
            <FormText name="phoneoffice" label="Office phone (000-000-0000)" width="320" />,
            <FormText name="phonecell" label="Cell (optional)" width="320" />,
            <FormText name="phonepager" label="Pager (optional)" width="320" />,
            <div style={{paddingTop: "32px"}}>
                <FormSelect name="role" label="Role" width="320" items={roleList} />
            </div>,
            <div style={{paddingTop: "32px"}}>
                <CareGroupSelect width="320" />
            </div>,
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

                        <FormCheckbox name="signup" label="signup" />

                        <Typography variant="subtitle2" inline gutterBottom>Enable provider login.</Typography>

                        <br />

                        {enrollForm && enrollForm.values && enrollForm.values.signup === true && <Fragment> 
                            <Typography variant="body1" gutterBottom style={{width: "85%", maxWidth: '900px'}}> 
                                Log in requires a registered email and password. Please confirm the provider's email address and enter a temporary password. The provider will be prompted to change the temporary password to a secure one of their choice when they first login. 
                                </Typography>
                            <Grid container spacing={24}>
                                <Grid item xs={6}>
                                    <FormText name="emailConfirm" label="Confirm email" width="320" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormTextPassword name="password" label="Temporary password" variant="standard" width="320" helpText={true}/>
                                </Grid>
                            </Grid>
                        </Fragment>}  

                        <br /> <br />
                        <BtnAction type="submit" disabled={submitting || pristine} text="submit" marginRight={true}/>
                        <BtnAction type="button" disabled={pristine} url='/admin/provider/find' text="clear" warning={true} marginRight={true} handleAction={this.handleClearForm} />
                        <BtnActionLink disabled={false} url='/admin/provider/find' text="cancel" warning={true}/>
                    </form>

                </Card>

                {(loadingNewProvider || errorNewProvider || !isEmpty(newProvider)) && <ProviderSaveDialog enableLogin={this.queryEnableLogin()}/> }

            </Fragment>
        );
    };

};


function validate(values) {
    const errors = {}; // error accumulator
    // validate inputs from 'values'; true=required
    errors.title = val.validateIsRequired(values.title)
    errors.firstname = val.validateName(values.firstname, true)
    errors.lastname = val.validateName(values.lastname, true)
    errors.officename = val.validateAddress(values.officename, true)
    errors.officestreet = val.validateAddress(values.officestreet, true)
    errors.officecity = val.validateName(values.officecity, true)
    errors.officestate = val.validateState(values.officestate, true)
    errors.officezip = val.validateZip(values.officezip, true)
    errors.email = val.validateEmail(values.email, true)
    errors.phoneoffice = val.validatePhone(values.phoneoffice, true)
    errors.phonecell = val.validatePhone(values.phonecell, false)
    errors.phonepager = val.validatePhoneOther(values.phonepager, false)
    errors.caregroup = val.validateIsRequired(values.caregroup)
    errors.role = val.validateIsRequired(values.role)
    errors.emailConfirm = val.validateEmails(values.email, values.emailConfirm) 
    errors.password = val.validatePassword(values.password)
    //If errors is empty, then form good to submit
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
