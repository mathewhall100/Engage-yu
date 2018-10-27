import React, { Component } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reset, reduxForm } from 'redux-form';
import { startCase } from 'lodash';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { selectConsoleTitle, providerDetails } from '../actions/index'

import FormTextFocused from './Forms/FormTextFocused';
import FormText from './Forms/FormText';
import FormSelect from './Forms/FormSelect'
import FormRadio from './Forms/FormRadio'
import EditProviderSuccessDialog from './Dialogs/EditProviderSuccessDialog';
import EditProviderFailedDialog from './Dialogs/EditProviderFailedDialog.js';
import providerAPI from "../utils/provider.js";

let selectItems = [];

const styles = theme => ({
    root: {
        padding: "20px"
    },
    tableText: {
       marginTop: "10px"
    },
    textBold: {
        fontWeight: "bold",
      },
    btn: {
        backgroundColor: "#eeeeee",
        textDecoration: "none",
        borderRadius: "5px",
        padding: "5px",
        marginTop: "10px",
        marginLeft: "20px",
        float: "right",
        '&:hover': {
            backgroundColor: "#dddddd",
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

class ProviderEdit extends Component {  

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Update provider details"});
    };

    componentWillReceiveProps(nextProps) {
        this.setState({editFieldActive: false})
    }


    state = {

        providerUpdateSuccess: false,
        providerUpdateFailed: false,

        editFieldActive: false, 
        showEditField: []
    }


    submit(values) {
        console.log("Submit: ", values)

        const { provider, reset } = this.props

        if (values.officename) {
            providerAPI.update(this.props.provider._id, {
                office: {
                    name: values.officename,
                    street: this.props.provider.office.street,
                    city: this.props.provider.office.city,
                    state: this.props.provider.office.state,
                    zip: this.props.provider.office.zip
                }
            })
            .then(res => {
                console.log("res.data: ", res.data)
                this.props.reset()
                this.setState ({providerUpdateSuccess: true})   // update success dialog
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
                this.setState({providerUpdateFailed: true}); // update failed dialog
            })
        } else if (values.officestreet || values.officecity || values.officestate || values.officezip) {
            providerAPI.update(this.props.provider._id, {
                office: {
                    name: this.props.provider.office.name,
                    street: values.officestreet ? values.officestreet : this.props.provider.office.street,
                    city: values.officecity ? values.officecity : this.props.provider.office.city,
                    state: values.officestate ? values.officestate : this.props.provider.office.state,
                    zip: values.officezip ? values.officezip : this.props.provider.office.zip
                }
            })
            .then(res => {
                console.log("res.data: ", res.data)
                this.props.reset()
                this.setState ({providerUpdateSuccess: true})   // update success dialog
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
                this.setState({providerUpdateFailed: true}); // update failed dialog
            })
        } else if (values.email) {
            providerAPI.update(this.props.provider._id, {
                email: values.email,
            })
            .then(res => {
                console.log("res.data: ", res.data)
                this.props.reset()
                this.setState ({providerUpdateSuccess: true})   // update success dialog
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
                this.setState({providerUpdateFailed: true}); // update failed dialog
            })
        } else if (values.phone1 || values.phone2 || values.phone3) {

            let phone = [{
                phone: "office", 
                number: values.phone1 ? `${values.phone1.slice(0, values.phone1.indexOf("ext")).trim()}` : provider.phone[0].number, 
                ext:  values.phone1 ? `${values.phone1.slice((values.phone1.indexOf("ext")+3)).trim()}` : provider.phone[0].ext
            }];
            if (values.phone2) {
                phone.push({
                    phone: "cell", 
                    number: values.phone2, 
                    }) 
                }
                else if (provider.phone[1]) {
                    phone.push({
                        phone: "cell", 
                        number: provider.phone[1].number,
                    })
                }
            if (values.phone3) {
                phone.push({
                    phone: "other", 
                    number: values.phone3, 
                    }) 
                }
                else if (provider.phone[2]) {
                    phone.push({
                        phone: "cell", 
                        number: provider.phone[2].number,
                    })
                }
            console.log("phone: ", phone)
            providerAPI.update(this.props.provider._id, {
                phone: phone
            })
            .then(res => {
                console.log("res.data: " + JSON.stringify(res.data, null, 2 ))
                this.props.reset()
                this.setState ({providerUpdateSuccess: true})   // update success dialog
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
                this.setState({providerUpdateFailed: true}); // update failed dialog
            })
        }

    }

    onChangeText(value) {
        console.log("change text: ", value)
    }

    onChangeSelect(value) {
        console.log("change select: ", value)
    }

    handleClickEdit(event, field) {
        this.setState ({providerUpdateSuccess: false}) 
        if (this.state.editFieldActive) {
            // maybe show error message that only one field may be updated at once
        }
        let tempArray = []
        tempArray[field] = true
        this.setState({showEditField: tempArray})
        this.setState({editFieldActive: true})
    }

    handleClickCancel(event, field) {
        this.setState({showEditField: []})
        this.setState({editFieldActive: false})
    }

    handleClickBack(event) {
        this.props.handleAction(1)
    }


    render () {
        
        const { submitting, pristine, provider, handleSubmit, classes } = this.props
        const { editFieldActive, showEditField, providerUpdateFailed, providerUpdateSuccess } = this.state


        const renderTextField = (field) =>  {
            const  { input, label, autofocus, width, name, meta: { touched, error }, ...custom } = field;
            return (
                <TextField
                    label={label}
                    value={name}
                    //errorText={touched && error}
                    autoFocus={autofocus}
                    style={{width: width}}
                    {...input}
                    {...custom}
                />
            )
        }

        const renderSelectField = (field) => {
            const { input, label, meta: { touched, error }, children, ...custom } = field;
            return (
                <FormControl style={{width: "250px"}}>
                    <InputLabel>My patients</InputLabel>
                    <Select
                        {...input}
                        onSelect={(event, index, value) => input.onChange(value)}
                        children={children} 
                        {...custom}
                    />
                </FormControl>
            )
        }
        
        return (

            <div>

                {providerUpdateSuccess && <EditProviderSuccessDialog providerId={provider._id}/>}

                {providerUpdateFailed && <EditProviderFailedDialog />} 

                <Card className={classes.root}>

                    <br />

                    <Grid container spacing={24}>
                        <Grid item xs={3}>
                            <Typography variant="caption">
                                Provider name
                            </Typography>
                            <Typography variant="title">
                                <span className={classes.textBold}>{startCase(provider.firstname)} {startCase(provider.lastname)}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="caption">
                                Role:
                            </Typography>
                            <Typography variant="subheading">
                                <span className={classes.textBold}>{provider.role}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="caption">
                                Care group
                            </Typography>
                            <Typography variant="subheading">
                                <span className={classes.textBold}>{provider.provider_group_name}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="caption">
                                Added
                            </Typography>
                            <Typography variant="subheading">
                                <span  className={classes.textBold}>{moment(provider.date_added).format("MMM Do YYYY")}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Button size="small" className={classes.btn} style={{float: "right"}} onClick={event => this.handleClickBack(event)}>Back</Button>
                        </Grid>

                    </Grid>

                    <br />
                    <hr />
                    <br />

                    <Typography variant="title">
                        Select detail to edit and click 'update'
                    </Typography>

                    <br />
                    <br />

                    <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>

                        <Grid container spacing={24}>

                            <Grid item xs={1}>
                                <div className={classes.tableText}>Office:</div>
                            </Grid>

                            <Grid item xs={3}>
                                <div className={classes.tableText}>{provider.office.name}</div>
                            </Grid>

                            <Grid item xs={1}>
                            <Button size="small" disabled={submitting || editFieldActive} className={classes.btn} onClick={event => this.handleClickEdit(event, 0)}>update</Button>
                            </Grid>

                            <Grid item xs={4}>
                                {showEditField[0] && !providerUpdateSuccess && <div style={{float: "right", paddingBottom: "15px"}}>
                                    <div style={{position: "relative", top: "-20px"}}>
                                        <FormTextFocused
                                            name="officename"
                                            label="New office"
                                            width="350"
                                        />
                                    </div>
                                </div> }

                                {showEditField[0] && providerUpdateSuccess && <div style={{float: "right", color: "green", paddingTop: "10px"}}>
                                    Successfully updated!
                                </div> }
                            </Grid>
                            
                            <Grid item xs={2}>
                                {showEditField[0] &&  !providerUpdateSuccess && <span>
                                    <Button size="small" className={classes.btn} onClick={event => this.handleClickCancel(event, 1)}>Cancel</Button>
                                    <Button size="small" type="submit" disabled={submitting || pristine} className={classes.btn} >Submit</Button>
                                </span> }
                            </Grid> 

                            <Grid item xs={1}>
                            </Grid>

                        </Grid>


                         <Grid container spacing={24}>
                            <Grid item xs={1}>
                                <div className={classes.tableText}>Address</div>
                            </Grid>

                            <Grid item xs={3}>
                                <div className={classes.tableText}>{provider.office.street}</div>
                                <div className={classes.tableText}>{provider.office.city}</div>
                                <div className={classes.tableText}>{provider.office.state}</div>
                                <div className={classes.tableText}>{provider.office.zip}</div>
                            </Grid>

                            <Grid item xs={1}>
                                <Button size="small" disabled={submitting || editFieldActive} className={classes.btn} onClick={event => this.handleClickEdit(event, 1)}>update</Button>
                            </Grid>

                            <Grid item xs={4}>
                                {showEditField[1] && !providerUpdateSuccess && <div style={{float: "right",paddingBottom: "15px"}}>
                                    <div style={{position: "relative", top: "-20px"}}>
                                        <FormTextFocused
                                            name="officestreet"
                                            label="Street"
                                            width="350"
                                        />
                                    </div>
                                    <div style={{position: "relative", top: "-20px"}}>
                                        <FormText
                                            name="officecity"
                                            label="City"
                                        />
                                    </div>
                                    <div style={{position: "relative", top: "-20px"}}>
                                        <FormText
                                            name="officestate"
                                            label="State"
                                        />
                                    </div>
                                    <div style={{position: "relative", top: "-20px"}}>
                                        <FormText
                                            name="officezip"
                                            label="Zip"
                                        />
                                    </div>
                                </div> }

                                {showEditField[1] && providerUpdateSuccess && <div style={{float: "right", color: "green", paddingTop: "10px"}}>
                                    Successfully updated!
                                </div> }
                            </Grid>
                            
                            <Grid item xs={2}>
                                {showEditField[1] &&  !providerUpdateSuccess && <span>
                                    <Button size="small" className={classes.btn} onClick={event => this.handleClickCancel(event, 1)}>Cancel</Button>
                                    <Button size="small" type="submit" disabled={submitting || pristine} className={classes.btn} >Submit</Button>
                                </span> }
                            </Grid> 

                            <Grid item xs={1}>
                            </Grid>
                        </Grid>


                        <Grid container spacing={24}>
                            <Grid item xs={1}>
                                <div className={classes.tableText}>Email:</div>
                            </Grid>

                            <Grid item xs={3}>
                                <div className={classes.tableText}>{provider.email}</div>
                            </Grid>

                            <Grid item xs={1}>
                            <Button size="small" disabled={submitting || editFieldActive} className={classes.btn} onClick={event => this.handleClickEdit(event, 2)}>update</Button>
                            </Grid>

                            <Grid item xs={4}>
                                {showEditField[2] && !providerUpdateSuccess && <div style={{float: "right",paddingBottom: "15px"}}>
                                    <div style={{position: "relative", top: "-20px"}}>
                                        <FormTextFocused
                                            name="email"
                                            label="New email address (john.doe@caregroup.com)"
                                            width="350"
                                        />
                                    </div>
                                </div> }

                                {showEditField[2] && providerUpdateSuccess && <div style={{float: "right", color: "green", paddingTop: "10px"}}>
                                    Successfully updated!
                                </div> }
                            </Grid>
                            
                            <Grid item xs={2}>
                                {showEditField[2] &&  !providerUpdateSuccess && <span>
                                    <Button size="small" className={classes.btn} onClick={event => this.handleClickCancel(event, 2)}>Cancel</Button>
                                    <Button size="small" type="submit" disabled={submitting || pristine} className={classes.btn} >Submit</Button>
                                </span> }
                            </Grid> 

                            <Grid item xs={1}>
                            </Grid>

                        </Grid>

                         <Grid container spacing={24}>
                            <Grid item xs={1}>
                                <div className={classes.tableText}>Phone:</div>
                            </Grid>

                            <Grid item xs={3}>
                                    <table className={classes.tableText}>
                                        <tbody>
                                            <tr>
                                                <td style={{width: "60px"}}>
                                                    <div style={{marginBottom: "10px"}}>   
                                                       {provider.phone[0].phone}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{marginBottom: "10px"}}>  
                                                        {provider.phone[0].number} {provider.phone[0].ext ? `ext ${provider.phone[0].ext}` : "" } 
                                                    </div>
                                                </td>
                                            </tr>
                                            { provider.phone[1] && <tr>
                                                <td>
                                                    <div style={{marginBottom: "10px"}}>  
                                                        {provider.phone[1].phone}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{marginBottom: "10px"}}> 
                                                        {provider.phone[1].number} {provider.phone[1].ext ? `ext ${provider.phone[1].ext}` : "" }   
                                                    </div>
                                                </td>
                                            </tr> }
                                            {provider.phone[2] && <tr>
                                                <td>
                                                     <div style={{marginBottom: "10px"}}>  
                                                        {provider.phone[2].phone}
                                                    </div>
                                                </td>
                                                <td style={{marginBottom: "10px"}}> 
                                                    {provider.phone[2].number} {provider.phone[1].ext ? `ext ${provider.phone[2].ext}` : "" }   
                                                </td>
                                            </tr> }
                                        </tbody>
                                    </table>
                            </Grid>

                            <Grid item xs={1}>
                            <Button size="small" disabled={submitting || editFieldActive} className={classes.btn} onClick={event => this.handleClickEdit(event, 3)}>update</Button>
                            </Grid>

                            <Grid item xs={4}>
                                {showEditField[3] && !providerUpdateSuccess && <div style={{float: "right",paddingBottom: "15px"}}>
                                    <div style={{position: "relative", top: "-20px"}}>
                                        <FormTextFocused
                                            name="phone1"
                                            label="New Office phone (000-000-0000 ext 0000)"
                                            width="320"
                                        />
                                    </div>

                                    <div style={{position: "relative", top: "-20px"}}>
                                        <FormText
                                            name="phone2"
                                            label="Cell (000-000-0000)"
                                            width="320"
                                        />
                                    </div> 

                                    <div style={{position: "relative", top: "-20px"}}>
                                        <FormText
                                            name="phone3"
                                            label="Other (000-000-0000)"
                                            width="320"
                                        />
                                    </div> 
                                </div> }

                                {showEditField[3] && providerUpdateSuccess && <div style={{float: "right", color: "green", paddingTop: "10px"}}>
                                    Successfully updated!
                                </div> }
                            </Grid>
                            
                            <Grid item xs={2}>
                                {showEditField[3] &&  !providerUpdateSuccess && <span>
                                    <Button size="small" className={classes.btn} onClick={event => this.handleClickCancel(event, 3)}>Cancel</Button>
                                    <Button size="small" type="submit" disabled={submitting || pristine} className={classes.btn} >Submit</Button>
                                </span> }
                            </Grid> 

                            <Grid item xs={1}>
                            </Grid>

                        </Grid>

                    </form>

                    <br />                   
                    <br />

                </Card>
            </div>
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
        errors.lastname = "*Please enter a valid name!";   // message to be displayed if invalid
    } 

    else if (values.email && values.email.length < 5) {
        errors.email = "Please enter a valid email!";   // message to be displayed if invalid
    }

    else if (values.phone && values.phone.length < 12) {
    errors.phone = "Please enter a contact phone number!";   // message to be displayed if invalid
    }

    // If errors is empty, then form good to submit
    // If errors has any properties, redux form assumes form is invalid
    console.log("Errors: ", errors)
    return errors;

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, providerDetails }, dispatch);
}

const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        provider: state.provider.provider,
        user: state.user
    }
};


const formData = {
    form: 'EditProviderForm', //unique identifier for this form 
    //validate,      
}

ProviderEdit = connect(mapStateToProps, mapDispatchToProps)(ProviderEdit)
ProviderEdit = reduxForm(formData)(ProviderEdit)
ProviderEdit = withStyles(styles)(ProviderEdit)
ProviderEdit = withRouter(ProviderEdit)
export default ProviderEdit;