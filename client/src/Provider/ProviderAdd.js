import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import FormText from '../components/Forms/FormText'
import FormTextFocused from '../components/Forms/FormTextFocused'
import FormSelect from '../components/Forms/FormSelect'
import CareGroupSelect from '../components/Forms/CareGroupSelect'
import StateSelect from '../components/Forms/StateSelect'
import ProviderAddSuccessDialog from '../components/Dialogs/ProviderAddSuccessDialog'
import Dialog from '../components/Dialogs/SimpleDialog'
import ActionBtn from '../components/Buttons/actionBtn'
import ActionLnk from '../components/Buttons/actionLnk'
import { selectConsoleTitle } from '../actions/index'
import providerAPI from "../utils/provider.js";
import { validateIsRequired, validateName, validateZip, validateState, validateEmail, validatePhone, validatePhoneOther, validatePassword, validatePasswords } from '../logic/formValidations'


const styles = theme => ({
    root: {
        padding: "40px 40px 40px 16%",
    }
});    


class ProviderEnrollForm extends Component {

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Add New Provider"});
    };
    
    state = {
        newProviderInfo: "",
        failed: false,
        success: false,
    };

    // handle form submission and saving data to database
    submit(values) {
        console.log("Submitted values: ", values);
        providerAPI.create({
            date_added: new Date(),
            firstname: values.firstname,
            lastname: values.lastname,
            provider_group_ref: values.caregroup[0],
            provider_group_id: values.caregroup[0],
            provider_group_name: values.caregroup[1],
            role: values.role, 
            office: {
                name: values.officename,
                street: values.officestreet,
                city:values.officecity, 
                state: values.officestate, 
                zip: values.officezip,
            },
            email: values.email, 
            phone: this.preparePhoneNums(values.phone1, values.phone2, values.phone3)
        })
        .then(res => {
            console.log("res.data: ", res.data)
            this.setState({
                newProviderInfo: res.data,
                success: true
            })
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
            this.setState({
                newProvider: `${values.firstname} ${values.lastname}`,
                failed: true
            })
        })
    };

    preparePhoneNums = (phone1, phone2, phone3) => {
        let phoneNos = [{
            phone: "office", 
           "number": `${phone1.slice(0, phone1.indexOf("ext")).trim()}`, 
           "ext":  `${phone1.slice((phone1.indexOf("ext")+3)).trim()}`
           }];
       if (phone2) {phoneNos.push(
            { phone: "cell", number: `${phone2.trim()}`, ext:  ""}
       )}
       if (phone3) {phoneNos.push(
           { phone: "cell", number: `${phone2.trim()}`, ext:  ""}
       )};
       return phoneNos
    }

    // Clear form entries and reset values using Redux Form 'reset'.
    handleClearForm = () => {
        this.props.reset('EnrollProviderForm')
    }


    render() {

        const { handleSubmit, classes, pristine, submitting } = this.props;
        const { success, failed, newProviderInfo} = this.state;

        const roleList =  [
            {id: "1", value: 'Physician (specialist)', text: 'Physician (specialist)' },
            {id: "2", value: 'Physician (hospitalist)', text: 'Physician (specialist)' },
            {id: "3", value: 'Physician (primary care)', text: 'Physician (primary care)' },
            {id: "4", value: 'Nurse (specialist)', text: 'Nurse (specialist)'},
            {id: "5", value: 'Other', text: 'Other'}
        ]

        const PwdText = () =>  
            <Typography variant="subtitle2" style={{width: "95%"}}><br />
                Asign a temporary passsword for this provider now which they will use, together with their email address, to login for the first time.  
            </Typography>
    

        const formComponents = [
            <FormTextFocused name="firstname" label="Firstname" width="320" />,
            <FormText name="lastname" label="Lastname" width="320" />,
            <FormText name="officename" label="Office/Hospital" width="320" />,
            <FormText name="officestreet" label="Address (street)" width="320" />,
            <FormText name="officecity" label="City" width="320" />,
            <div style={{paddingTop: "32px"}}><StateSelect name="officestate"/></div>,
            <FormText name="officezip" label="Zip" width="320" />,
            <div />,
            <FormText name="email" label="Email (john.doe@caregroup.com)" width="320" />,
            <FormText name="phone1" label="Office phone (000-000-0000)" width="320" />,
            <FormText name="phone2" label="Cell (optional)" width="320" />,
            <FormText name="phone3" label="Other phone/pager" width="320" />,
            <div style={{paddingTop: "32px"}}><FormSelect name="role" label="Role" width="320" items={roleList} /></div>,
            <div style={{paddingTop: "32px"}}><CareGroupSelect width="320" /></div>,
            <PwdText />,
            <div />,
            <FormText name="password1" label="Password" type="passsword" width="320" />,
            <FormText name="password2" label="Re-enter Password" type="password" width="320" />
        ]

        return (
            <Card className={classes.root}>

                <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                    <Grid container spacing={24}>
                        {formComponents.map((component, idx) => {
                            return(
                                <Grid item xs={6} key={idx}>
                                        {component}
                                </Grid>
                            )
                        }) }
                    </Grid>
                    <br /> <br />
                    <span style={{marginRight: "15px"}}>
                        <ActionBtn type="submit" disabled={submitting || pristine} text="submit" />
                    </span>
                    <span style={{marginRight: "15px"}}>
                        <ActionBtn type="button" disabled={pristine} url='/admin/provider/find' text="clear" handleAction={this.handleClearForm} />
                    </span>
                    <ActionLnk disabled={false} url='/admin/provider/find' text="cancel" />
                </form>

                {success && <ProviderAddSuccessDialog  info={newProviderInfo} /> }
                {failed &&
                    <Dialog 
                        title="failed!" 
                        text="Unfortuneately, a problem was encountered and the provider could not be added at this time. Please go back and check all the details entered are correct and valid and then try again. If the problem persists then contact the system administrator" 
                    />
                }

            </Card>
        );
    };

};


function validate(values) {
    console.log("Error values: ", values) // -> { object containing all values of form entries } 
    const errors = {}; // error accumulator
    // validate inputs from 'values'; true=required
    errors.firstname = validateName(values.firstname, true)
    errors.lastname = validateName(values.lastname, true)
    errors.officename = validateName(values.officename, true)
    errors.officestreet = validateName(values.officestreet, true)
    errors.officecity = validateName(values.officecity, true)
    errors.officestate = validateState(values.officestate, true)
    errors.officezip = validateZip(values.officezip, true)
    errors.email = validateEmail(values.email, true)
    errors.phone1 = validatePhone(values.phone1, true)
    errors.phone2 = validatePhone(values.phone2, false)
    errors.phone3 = validatePhoneOther(values.phone3, false)
    errors.caregroup = validateIsRequired(values.caregroup)
    errors.role = validateIsRequired(values.role)
    errors.password1 = validatePassword(values.password1, true)
    errors.password2 = validatePasswords(values.password1, values.password2)
    // If errors is empty, then form good to submit
    console.log("Errors: ", errors)
    return errors;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, }, dispatch);
}

const formData = {
        form: 'EnrollProviderForm', //unique identifier for this form 
        validate,      
}

ProviderEnrollForm = reduxForm(formData)(ProviderEnrollForm)
ProviderEnrollForm = withRouter(ProviderEnrollForm)
ProviderEnrollForm = withStyles(styles)(ProviderEnrollForm)
ProviderEnrollForm = connect(null, mapDispatchToProps)(ProviderEnrollForm)
export default ProviderEnrollForm
