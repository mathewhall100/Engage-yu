import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reset, reduxForm } from 'redux-form';
import { startCase } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { selectConsoleTitle, providerAction } from '../../actions/index'
import FormTextFocused from '../Forms/FormTextFocused';
import StateSelect from '../Forms/StateSelect'
import providerAPI from "../../utils/provider.js";
import CallBack from '../Callback'
import Dialog from '../Dialogs/simpleDialog'
import UpdateFormUnit from '../Forms/UpdateFormUnit'
import ProviderDetailsBar from './providerDetailsBar';
import { validateName, validateZip, validateState, validateEmail, validatePhone, validatePhoneOther } from '../../logic/formValidations'

const styles = theme => ({
    root: {
        padding: "40px"
    },
})


class ProviderUpdate extends Component {  

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Update provider details"});
    };
    
    state = {
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
        this.setState({updateSuccess: true})
        this.props.reset('providerUpdateForm');  // reset the form fields to empty (requires form name)
    }

    updateFailed = (err) => {
        console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
        console.log(err);
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
        
        const { provider, handleSubmit, classes } = this.props
        const { updateFailed, updateSuccess } = this.state

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
      
        // ProviderUpdate return
        return (
            <Card className={classes.root}>

                {provider && provider._id ? 
                    <React.Fragment>
 
                        <ProviderDetailsBar provider={provider} />

                        <Typography variant="title" gutterBottom>Click 'update' next to the information you want to edit.</Typography>

                        <br /> <br />

                        <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                            <UpdateFormUnit 
                                formFields={getFormFields(provider)}
                                outcomeReset={this.outcomeReset}
                                updateSuccess={updateSuccess} 
                                updateFailed={updateFailed}
                            />
                        </form>

                        <br /> <br />

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
    const errors = {};  // error accumulator
    // validate inputs from 'values'
    errors.officename = validateName(values.officename)
    errors.officestreet = validateName(values.officestreet)
    errors.officecity = validateName(values.officecity)
    errors.officestate = validateState(values.officestate)
    errors.officezip = validateZip(values.officezip)
    errors.email = validateEmail(values.email)
    errors.phone1 = validatePhone(values.phone1)
    errors.phone2 = validatePhone(values.phone2)
    errors.phone3 = validatePhoneOther(values.phone3)
    // If errors is empty, then form good to submit
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
    form: 'updateForm', //unique identifier for this form 
    validate     
}

ProviderUpdate = connect(mapStateToProps, mapDispatchToProps)(ProviderUpdate)
ProviderUpdate = reduxForm(formData)(ProviderUpdate)
ProviderUpdate = withStyles(styles)(ProviderUpdate)
export default ProviderUpdate;