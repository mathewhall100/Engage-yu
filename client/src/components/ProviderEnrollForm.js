import React, { Component } from 'react';
import { withRouter, Link, Redirect} from 'react-router-dom';
import { reset, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { defaultProps } from 'recompose';
import { bindActionCreators } from 'redux';
import { startCase } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import FormText from './Forms/FormText'
import FormTextFocused from './Forms/FormTextFocused'
import FormSelect from './Forms/FormSelect'
import FormRadio from './Forms/FormRadio'
import { enrollNewPatient } from '../actions';
import ProviderEnrollSuccessDialog from './Dialogs/ProviderEnrollSuccessDialog.js'
import ProviderEnrollFailedDialog from './Dialogs/ProviderEnrollFailedDialog.js'
import { selectConsoleTitle } from '../actions/index'
import providerAPI from "../utils/provider.js";
import provider_groupAPI from "../utils/provider_group.js";

let selectItems = [];

const styles = theme => ({

    submitBtn: {
        marginRight: 20,
        color: "#ffffff",
        backgroundColor: "#2d404b",
        '&:hover': {
            backgroundColor: "#28353d",
        },
        '&:disabled': {
            color: 'grey'
        },
        hover: {},
        disabled: {},
    },
    cancelBtn: {
        marginRight: 20,
        color: "#ffffff",
        textDecoration: "none",
        backgroundColor: "#c62828",
        '&:hover': {
            backgroundColor: "#871c1c",
        },
        hover: {},
    },
    cancelLnk: {
        textDecoration: "none",
    },

});    


class ProviderEnrollForm extends Component {

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Add a new provider"});

        // On component mount, fetch names of all providers in provider group to populate primary provider form field
        provider_groupAPI.findAll()
            .then(res => {
                console.log("res.data: ", res.data);
                let careGroupList=[];
                res.data.map((group, index) => {
                    careGroupList.push (
                        {value: index, text: `${startCase(group.group_name)}`, id: group._id}
                    )
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

        enrollFailed: false,
        enrollSuccess: false,
        name: ""
    };


    // handle form submission
    submit(values) {
        console.log("Submitted values: ", values);

        let phoneNos = [{
             phone: "office", 
            "number": `${values.phone1.slice(0, values.phone1.indexOf("ext")).trim()}`, 
            "ext":  `${values.phone1.slice((values.phone1.indexOf("ext")+3)).trim()}`
            }];
        if (values.phone2) {phoneNos.push(
             { phone: "cell", number: `${values.phone2.trim()}`, ext:  ""}
        )}
        if (values.phone3) {phoneNos.push(
            { phone: "cell", number: `${values.phone2.trim()}`, ext:  ""}
        )};
        
        providerAPI.create({
            date_added: new Date(),
            firstname: values.firstname,
            lastname: values.lastname,
            provider_group_ref: this.state.careGroupList[values.caregroup].id,
            provider_group_id: this.state.careGroupList[values.caregroup].id,
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
            phone: phoneNos
        })
        .then(res => {
            console.log("res.data: ", res.data)

            this.setState({
                name: `${startCase(values.firstname)} ${startCase(values.lastname)}`,
                role: values.role,
                office: startCase(values.officename),
                group: this.state.careGroupList[values.caregroup].text,
                email: values.email,
                phone: `${phoneNos[0].number} ext ${phoneNos[0].ext}`,

                enrollSuccess: true
            }); 
            

        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);

            this.setState({enrollFailed: true}); 
        })
    };


    render() {

        const { handleSubmit, classes, pristine, submitting } = this.props;
        const { careGroupList, name, group, role, office, email, phone } = this.state;

        const roleList =  [
            {id: "1", value: 'Physician (specialist)', text: 'Physician (specialist)' },
            {id: "2", value: 'Physician (hospitalist)', text: 'Physician (specialist)' },
            {id: "3", value: 'Physician (primary care)', text: 'Physician (primary care)' },
            {id: "4", value: 'Nurse (specialist)', text: 'Nurse (specialist)'},
            {id: "5", value: 'other', text: 'other'},
        ]

        return (

            <div>
            
                {this.state.enrollSuccess && <ProviderEnrollSuccessDialog 
                                                        name={name}
                                                        role={role}
                                                        office={office}
                                                        group={group}
                                                        email={email}
                                                        phone={phone}
                                                     />}

                {this.state.enrollFailed && <ProviderEnrollFailedDialog
                                                     />}

                <Card style={{padding: "20px", maxWidth: "1280px"}}>

                    <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>

                         <Grid container spacing={16}>

                            <Grid item xs={12}>
                                <FormTextFocused
                                    name="firstname"
                                    label="Firstname"
                                    width="350"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormText
                                    name="lastname"
                                    label="Lastname"
                                    width="350"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                    <FormText
                                    name="officename"
                                    label="Office"
                                    width="350"
                                    />
                            </Grid>

                            <Grid item xs={12}>
                            
                                    <FormText
                                    name="officestreet"
                                    label="Office Address (street)"
                                    width="350"
                                    />
                            </Grid>
                            <Grid item xs={4}>
                                    <FormText
                                    name="officecity"
                                    label="City"
                                    width="270"
                                    />     
                            </Grid>
                            
                            <Grid item xs={4}>
                                    <FormText
                                    name="officestate"
                                    label="State"
                                    width="270"
                                    />              
                            </Grid>
                            <Grid item xs={4}>
                                    <FormText
                                    name="officezip"
                                    label="Zip"
                                    width="270"
                                    />                            
                            </Grid>

                            <Grid item xs={12}>
                                    <FormText
                                        name="email"
                                        label="Email (john.doe@caregroup.com)"
                                        width="350"
                                    />
                            </Grid>
                            <Grid item xs={4}>
                                <FormText
                                    name="phone1" 
                                    label="Office phone (000-000-0000)"
                                    width="270"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormText
                                    name="phone2" 
                                    label="Cell (000-000-0000)"
                                    width="270"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormText
                                    name="phone3" 
                                    label="Other (000-000-0000)"
                                    width="270"
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <FormSelect 
                                    name="role" 
                                    label="Role"
                                    width="270"
                                    items={roleList}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormSelect 
                                    name="caregroup" 
                                    label="CareGroup"
                                    width="270"
                                    items={careGroupList}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                    <FormText
                                        name="password1"
                                        label="Password"
                                        type="passsword"
                                        width="270"
                                    />
                            </Grid>
                            <Grid item xs={8}>
                                <FormText
                                    name="password2" 
                                    label="Re-enter Password"
                                    type="password"
                                    width="270"
                                    />
                            </Grid>
                            <Grid item xs={2}></Grid>

                            <Grid item xs={12}><br /></Grid>
                        </Grid>

                        <Grid container spacing={24} >
                            <Grid item xs={4}>
                                <Button type="submit" disabled={submitting || pristine} className={classes.submitBtn}>submit</Button>
                                <Link to='/admin/provider' className={classes.cancelLnk}><Button className={classes.cancelBtn}>cancel</Button></Link>
                            </Grid>
                            <Grid item xs={8}></Grid>
                        </Grid>

                    </form>

                </Card>
            </div>
        );
    };

};


function validate(values) {
    console.log("Error values: ", values) // -> { object containing all values of form entries } 
    const errors = {};

    // validate inputs from 'values'
    
    if (!values.id) {
        errors.id = "Please enter a contact phone number!";   // message to be displayed if invalid
    }

    if (!values.firstName || values.firstName.length <3 ) {
        errors.firstName = "*Please enter a valid name!";   // message to be displayed if invalid
    } 

    if (!values.lastName || values.lastName.length <3 ) {
        errors.lastName = "*Please enter a valid name!";   // message to be displayed if invalid
    } 

    if (!values.role) {
        errors.dob = "Please enter a date of birth!";   // message to be displayed if invalid
    }

    if (!values.email) {
        errors.email = "Please enter a valid email!";   // message to be displayed if invalid
    }

    if (!values.phone) {
    errors.phone = "Please enter a contact phone number!";   // message to be displayed if invalid
    }

    if (!values.office) {
        errors.provider= "Please enter an office phone number!";   // message to be displayed if invalid
     }

     if (!values.careGroup) {
        errors.provider= "Please enter a care group!";   // message to be displayed if invalid
     }

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

