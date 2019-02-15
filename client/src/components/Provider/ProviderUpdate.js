import React, { Component } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reset, reduxForm } from 'redux-form';
import { startCase } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { selectConsoleTitle, providerAction } from '../../actions/index'
import FormTextFocused from '../Forms/FormTextFocused';
import StateSelect from '../Forms/StateSelect'
import providerAPI from "../../utils/provider.js";
import CallBack from '../Callback'
import Dialog from '../Dialogs/simpleDialog'
import SmallBtn from '../Buttons/smallBtn';
import ProviderDetailsBar from './providerDetailsBar';
import { validateName } from '../../logic/formValidations'

const styles = theme => ({
    root: {
        padding: "40px"
    },
    fwMedium: {
        fontWeight: 500,
    },
    formElement: {
        position: "relative",
        left: "15px"
    },
    successText: {
        color: "green", 
        position: "relative", top: "6px"
    },
    failedText: {
        position: "relative", top: "6px"
    },
})


class ProviderUpdate extends Component {  

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Update provider details"});
        this.fetchProviderDetailsToUpdate(this.props.location.state.providerId)
        this.setState({editFieldActive: false})
    };
    

    state = {
        editFieldActive: false, 
        showEditField: [],
        updateSuccess: false,
        updateFailed: false,
    }

    // Fetch provider info using provider_id and ensure loaded into store
    fetchProviderDetailsToUpdate = (id) => {
        providerAPI.findById(id)
        .then(res => {
            console.log("res.data: ", res.data);
            this.props.providerAction(res.data);
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
        })
    };

    submit(values) {
        console.log("Submit: ", values)
        const { provider } = this.props

        if (values.officename || values.officestreet || values.officecity || values.officestate || values.officezip) {
            providerAPI.update(provider._id, {
                office: {
                    name: values.officename ? values.officename : provider.office.name,
                    street: values.officestreet ? values.officestreet : provider.office.street,
                    city: values.officecity ? values.officecity : provider.office.city,
                    state: values.officestate ? values.officestate : provider.office.state,
                    zip: values.officezip ? values.officezip : provider.office.zip
                }
            })
            .then(res => {this.updateSuccess(res.data) })
            .catch(err => {this.updateFailed(err)})
        } else if (values.email) {
            providerAPI.update(provider._id, {
                email: values.email,
            })
           .then(res => {this.updateSuccess(res.data, 5) })
           .catch(err => {this.updateFailed(err)})
        } else if (values.phone2 || values.phone2 || values.phone3) {
            providerAPI.update(provider._id, {
                phone: [{
                    phone: "office", 
                    number: values.phone1 ? `${values.phone1.slice(0, values.phone1.indexOf("ext")).trim()}` : provider.phone[0].number, 
                    ext:  values.phone1 ? `${values.phone1.slice((values.phone1.indexOf("ext")+3)).trim()}` : provider.phone[0].ext
                    }, {
                    phone: "cell", 
                    number: values.phone2 ? values.phone2 : provider.phone[1].number,
                    ext: "" 
                    }, {
                    phone: "other", 
                    number: values.phone3 ? `${values.phone3.slice(0, values.phone3.indexOf("ext")).trim()}` : provider.phone[2].number,
                    ext:  values.phone3 ? `${values.phone3.slice((values.phone3.indexOf("ext")+3)).trim()}` : provider.phone[2].ext
                }]
            })
            .then(res => {this.updateSuccess(res.data, 2) })
            .catch(err => {this.updateFailed(err)})
        } 
    };

    updateSuccess = (data) => {
        console.log("res.data: ", data)
        this.fetchProviderDetailsToUpdate(this.props.provider._id)
        this.setState({
            editFieldActive: false,
            updateSuccess: true,
        })
        this.props.reset('providerUpdateForm');  // reset the form fields to empty (requires form name)
    }

    updateFailed = (err) => {
        console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
        console.log(err);
        this.setState({updateFailed: true}); // update failed dialog
    }

    // Event handlers
    handleUpdate = (index) => {
        this.setState({updateSuccess: false}) 
        let tempArray = []
        tempArray[index] = true
        this.setState({
            showEditField: tempArray,
            editFieldActive: true,
        })
    } 
    
    handleCancel = () => {
        this.setState({
            showEditField: [],
            editFieldActive: false,
            updateFailed: false
        })
        this.props.reset('providerUpdateForm');  // reset the form fields to empty (requires form name)
    }

    handleTryAgain = () => {
        this.setState({updateFailed: false})
    }

    render () {
        
        const { submitting, pristine, provider, handleSubmit, classes } = this.props
        const { editFieldActive, showEditField, updateFailed, updateSuccess } = this.state

        const getFormFields = (provider) => {
            return [{
                rowLabel: "Office", 
                fieldContent: startCase(provider.office.name), 
                formElement: <FormTextFocused name="officename" label="New office" width={215}/>
                },{
                rowLabel: "Address", 
                fieldContent: startCase(provider.office.street), 
                formElement: <FormTextFocused name="officestreet" label="Street" width={215}/>
                },{
                rowLabel: "", 
                fieldContent: startCase(provider.office.city), 
                formElement: <FormTextFocused name="officecity" label="City" width={215}/>
                },{
                rowLabel: "", 
                fieldContent: startCase(provider.office.state), 
                formElement: <StateSelect name="officestate"/>
                },{
                rowLabel: "", 
                fieldContent: startCase(provider.office.zip), 
                formElement: <FormTextFocused name="officezip" label="Zip" width={215}/>
                },{
                rowLabel: "Email",
                fieldContent: provider.email,
                formElement:  <FormTextFocused name="email" label="Email" width={215}/>
                },{
                rowLabel: "Office phone",
                fieldContent: `${provider.phone[0].number} ${provider.phone[0].ext ? `ext: ${provider.phone[0].ext}` : ""}`,
                formElement:  <FormTextFocused name="phone1"  label="Office phone (000-000-0000)" width={215}/>
                },{
                rowLabel: "Cell",
                fieldContent: `${provider.phone[1].number}`,
                formElement:  <FormTextFocused name="phone2"  label="Cell" width={215}/>
                },{
                rowLabel: "Other phone/pager",
                fieldContent: `${provider.phone[2].number} ${provider.phone[2].ext ? `ext: ${provider.phone[2].ext}` : ""}`,
                formElement:  <FormTextFocused name="phone3" label="Other phone/pager" width={215} />
            }];
        }
      
        const getPositioning = (element) => {
            console.log(element)
            if (element.includes("Select")) {return {top: "-12px"}}
            else if (element.includes("Radio")) {return {top: "-24px"}}
            else return {top: "-28px"}
        }




        // providerUpdate return
        return (
            <Card className={classes.root}>

                {provider && provider._id ? 
                    <React.Fragment>
 
                        <ProviderDetailsBar provider={provider} />

                        <Typography variant="title" gutterBottom>
                            Click 'update' next to the information you want to edit. 
                        </Typography>

                        <br />

                        <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>

                            {getFormFields(provider).map((field, index) => {
                                return (
                                    <Grid container spacing={8} key={index}>
                                        <Grid item xs={2}>
                                            <Typography variant="subtitle1" >{field.rowLabel}</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="subtitle1" className={classes.fwMedium} >{field.fieldContent}</Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <SmallBtn type="button" disabled={submitting || editFieldActive} index={index} text="update" handleBtn={this.handleUpdate}/>
                                        </Grid>
                                        <Grid item xs={3}>
                                            { showEditField[index] && !updateSuccess && !updateFailed &&
                                                <span className={classes.formElement} style={getPositioning(field.formElement.type.name)} >      
                                                    {field.formElement}
                                                </span> 
                                            }
                                            { showEditField[index] && updateSuccess &&
                                                <Typography variant="subtitle1" align="center" className={classes.successText}>
                                                    Successfully updated!
                                                </Typography> 
                                            }
                                            { showEditField[index] && updateFailed && 
                                                <Typography variant="subtitle1" align="center" color="error" className={classes.failedText}>
                                                    Update failed!
                                                </Typography> 
                                            }
                                        </Grid>
                                        <Grid item xs={3}>
                                            { showEditField[index] && updateFailed && 
                                                <span> 
                                                    <SmallBtn type="button" disabled={false} index="cancel" text="cancel" handleBtn={this.handleCancel}/>
                                                    <SmallBtn type="button" disabled={false} index="tryagain" text="try again" handleBtn={this.handleTryAgain}/>
                                                </span>
                                            }
                                            {showEditField[index] && !updateSuccess && !updateFailed &&
                                                <span style={{marginLeft: "10px"}}>
                                                    <SmallBtn type="submit" disabled={submitting || pristine} index="" text="submit" /> 
                                                    <SmallBtn type="button" disabled={false} index="cancel" text="cancel" handleBtn={this.handleCancel}/>
                                                </span>
                                            }
                                        </Grid> 
                                    </Grid>
                                )
                            }) }

                        </form>

                    {updateSuccess && 
                        <Dialog 
                            title="Success!" 
                            text={`New provider, ${startCase(provider.firstname)} ${startCase(provider.lastname)} has been successfully updated `} 
                        /> 
                    }
                    {updateFailed && 
                        <Dialog 
                            title="Failed!" 
                            text={`Unfortuneately a problem occurred and this provider could not be updated at this time. Please check the dtails you have entered and try again. If the problem persists, contact the syste administrator`}
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
    const errors = {};
    // validate inputs from 'values'

    errors.officename = validateName(values.officename)

    if (!values.officestreet) {errors.officestreet = "*Please enter an office address!"
    } else if (!/^[a-zA-Z0-9' ]{2,30}$/i.test(values.officestreet))  {
        errors.officestreet = "*Invalid address. Only characters and numbers allowed"}

    if (!values.officecity) {errors.officecity = "*Please enter an office address!"
    } else if (!/^[a-zA-Z' ]{2,30}$/i.test(values.officecity))  {
        errors.officecity = "*Invalid address. Only characters allowed"}

    if (!values.officezip) {errors.officezip = "*Please enter an zip code!"
    } else if (!/^[0-9]{5}$/i.test(values.officezip))  {
        errors.officezip = "*Invalid zip code. Must be 5 numbers."}
    
    if (values.email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(values.email)) {
        errors.email = "Invalid email address."}

    if (values.phone1 && !/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/i.test(values.phone1)) {
        errors.phone1 = "*Invalid phone number. Try (123) 456 7891 format" }

    if (values.phone2 && !/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/i.test(values.phone2)) {
        errors.phone2 = "*Invalid phone number. Try (123) 456 7891 format" }

    if (values.phone3 && !/^[a-zA-Z0-9 ]{2,15}$/i.test(values.phone3)) {
        errors.phone3 = "*Invalid phone or pager" }

    console.log("Errors: ", errors)
    return errors;

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, providerAction }, dispatch);
}

const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        provider: state.provider,
    }
};

const formData = {
    form: 'providerUpdateForm', //unique identifier for this form 
    validate,      
}

ProviderUpdate = connect(mapStateToProps, mapDispatchToProps)(ProviderUpdate)
ProviderUpdate = reduxForm(formData)(ProviderUpdate)
ProviderUpdate = withStyles(styles)(ProviderUpdate)
ProviderUpdate = withRouter(ProviderUpdate)
export default ProviderUpdate;