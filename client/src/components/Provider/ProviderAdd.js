import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { reset, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startCase } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import FormText from '../Forms/FormText'
import FormTextFocused from '../Forms/FormTextFocused'
import FormSelect from '../Forms/FormSelect'
import StateSelect from '../Forms/StateSelect'
import ProviderAddSuccessDialog from '../Dialogs/ProviderAddSuccessDialog'
import SimpleDialog from '../Dialogs/simpleDialog'
import ActionBtn from '../Buttons/actionBtn'
import { selectConsoleTitle } from '../../actions/index'
import providerAPI from "../../utils/provider.js";
import provider_groupAPI from "../../utils/provider_group.js";


const styles = theme => ({
    root: {
        padding: "40px 40px 40px 16%",
    }
});    


class ProviderEnrollForm extends Component {

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Add new provider"});

        // On component mount, fetch names of care groups to populate form field
        provider_groupAPI.findAll()
            .then(res => {
                console.log("res.data: ", res.data);
                let careGroupList=[];
                res.data.map(group => {
                    careGroupList.push ({
                        value: group._id,
                        text: `${startCase(group.group_name)}`, 
                    })
                })
                this.setState({careGroupList: careGroupList})
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
        })
    };
    

    state = {
        careGroupList: [],
        newProviderInfo: "",
        addFailed: false,
        addSuccess: false,
    };


    // handle form submission and saving data to database
    submit(values) {
        console.log("Submitted values: ", values);
        providerAPI.create({
            date_added: new Date(),
            firstname: values.firstname,
            lastname: values.lastname,
            provider_group_ref: values.caregroup,
            provider_group_id: values.caregroup,
            provider_group_name: this.state.careGroupList[values.caregroup].text,
            role: values.role, 
            office: {
                name: values.officename,
                street: values.officestreet,
                city:values. officecity, 
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
                addSuccess: true
            })
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
            this.setState({
                newProvider: `${values.firstname} ${values.lastname}`,
                addFailed: true
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
        const { careGroupList, addSuccess, addFailed, newProviderInfo} = this.state;

        const roleList =  [
            {id: "1", value: 'Physician (specialist)', text: 'Physician (specialist)' },
            {id: "2", value: 'Physician (hospitalist)', text: 'Physician (specialist)' },
            {id: "3", value: 'Physician (primary care)', text: 'Physician (primary care)' },
            {id: "4", value: 'Nurse (specialist)', text: 'Nurse (specialist)'},
            {id: "5", value: 'other', text: 'other'}
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
            <div style={{paddingTop: "32px"}}><FormSelect name="caregroup" label="CareGroup" width="320" items={careGroupList} /></div>,
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
                    <ActionBtn type="button" disabled={pristine} url='/admin/provider/find' text="clear" handleAction={this.handleClearForm} />

                </form>

                {addSuccess && <ProviderAddSuccessDialog  info={newProviderInfo} /> }
                {addFailed && <SimpleDialog title="failed!" text="Unfortuneately, a problem was encountered and the provider could not be added at this time. Please go back and check all the details entered are correct and valid and then try again. If the problem persists then contact the system administrator" /> }

            </Card>
        );
    };

};


function validate(values) {
    console.log("Error values: ", values) // -> { object containing all values of form entries } 
    
    const errors = {};
    // validate inputs from 'values'
    if (!values.firstname) {  errors.firstname = "*Please enter a firstname!"  // message to be displayed if invalid
    } else if (!/^[a-zA-Z0-9' ]{2,30}$/i.test(values.firstname))  {
        errors.firstname = "Invalid name. Only characters, numbers and ' allowed"} 

    if (!values.lastname) {errors.lastname = "*Please enter a lastname!" 
    } else if (!/^[a-zA-Z0-9' ]{2,30}$/i.test(values.lastname))  {
        errors.lastname = "Invalid name. Only characters, numbers and ' allowed"} 

    if (!values.officename) {errors.officename = "*Please enter an office address!"
    } else if (!/^[a-zA-Z0-9' ]{2,30}$/i.test(values.officename))  {
        errors.officename = "*Invalid address. Only characters, numbers and '-' allowed"}

    if (!values.officestreet) {errors.officestreet = "*Please enter an office address!"
    } else if (!/^[a-zA-Z0-9' ]{2,30}$/i.test(values.officestreet))  {
        errors.officestreet = "*Invalid address. Only characters and numbers allowed"}

    if (!values.officecity) {errors.officecity = "*Please enter an office address!"
    } else if (!/^[a-zA-Z' ]{2,30}$/i.test(values.officecity))  {
        errors.officecity = "*Invalid address. Only characters allowed"}

    if (!values.officezip) {errors.officezip = "*Please enter an zip code!"
    } else if (!/^[0-9]{5}$/i.test(values.officezip))  {
        errors.officezip = "*Invalid zip code. Must be 5 numbers."}

    if (!values.officestate) {errors.officestate= "*Please select a state!"  }

    if (!values.email) {errors.email = "*Please enter an email!"
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(values.email)) {
        errors.email = "Invalid email address."}

    if (!values.phone1) { errors.phone1 = "*An office phone number is required!"; 
    } else if (!/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/i.test(values.phone1)) {
        errors.phone1 = "*Invalid phone number. Try (123) 456 7891 format" }

    if (!/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/i.test(values.phone2)) {
        errors.phone = "*Invalid phone number. Try (123) 456 7891 format" }

    if (!/^0-9\-]{3,12}$/i.test(values.phone3)) {
        errors.phone = "*Invalid phone/pager. Only numbers, brackets and '-' allowed "}

    if (!values.caregroup) {errors.caregroup = "*Please select a caregroup!"  }

    if (!values.role) {errors.role = "*Please select a role!"  }

    if (!values.password1) {errors.password1 = "*Please enter a password (min 8 characters)"
    } else if (values.password1.length < 8) {
        errors.password1 = "Password must be at least 8 characters"}

    if (!values.password2) {errors.password2 = "*Please enter a matching password"
    } else if (values.password2.length < 8) {
        errors.password2 = "*Password must be at least 8 characters"
    } else if (values.password1 && values.password2 && values.password1 !== values.password2) {
            errors.password2 ="*Entered passwords do not match"}

    // If errors is empty, then form good to submit
    // If errors has any properties, redux form assumes form is invalid
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
