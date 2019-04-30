import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { startCase, isEmpty } from 'lodash';
import { withStyles, Card, Typography } from '@material-ui/core';
import FormTextFocused from '../UI/Forms/formTextFocused';
import FormStateSelect from '../UI/Forms/formStateSelect';
import DialogSaveFailure from '../UI/Dialogs/dialogSaveFailure';
import FormUpdateUnit from '../UI/Forms/formUpdateUnit';
import { validateName, validateZip, validateState, validateEmail, validatePhone, validatePhoneOther } from '../../logic/formValidations';
import { selectConsoleTitle, loadProvider, providerUpdateSave } from '../../actions';
import CareGroupSelect from '../CareGroup/CareGroupSelect'
import ProviderDetailsBar from './ProviderDetailsBar';

const styles = () => ({
    root: {
        padding: "40px"
    },
})


class ProviderUpdate extends PureComponent {  

    componentDidMount() {
        let title = "Update Provider Details";
        if (this.props.location.state.update === "reassign caregroup") {title = "Reassign Provider To Another Care Group"} 
        this.props.dispatch(selectConsoleTitle({title, menuIndex: 6}))
    };

    componentWillReceiveProps(nextProps) {
        if (!isEmpty(nextProps.providerUpdate) && nextProps.providerUpdate !== this.props.providerUpdate) {this.updateSuccess()}
        if (nextProps.errorProviderUpdate) {this.updateFailed()}
        if (nextProps.loadingProviderUpdate) {this.updateInProgress()}
    } 

    componentWillUnmount() {
        this.props.dispatch(providerUpdateSave("reset"))
    }
    
    state = {
        success: false,
        failed: false,
        inProgress: false
    }

    submit(values) {
        console.log("Submit: ", values)
        this.props.dispatch(providerUpdateSave(values, this.props.provider))
    };

    updateSuccess = (data) => {
        this.props.dispatch(loadProvider(this.props.provider._id))
        this.props.reset('updateForm');  // reset the form fields to empty (requires form name)
        this.setState({success: true})
    }

    updateFailed = (err) => {
        this.setState({failed: true}); 
        this.props.dispatch(providerUpdateSave("reset"))
    }

    updateInProgress = (err) => {
        this.setState({inProgress: true}); 
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
        
        const { provider, error, location, handleSubmit, classes } = this.props
        const { failed, success, inProgress } = this.state
        const { update } = location.state

        const personalDetailsFormFields = (provider) => {
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
                formElement: <FormStateSelect name="officestate"/>
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
                fieldContent: provider.phone_office,
                formElement:  <FormTextFocused name="phoneoffice"  label="Office phone (000-000-0000)" width={215}/>
                },{
                rowLabel: "Cell",
                fieldContent: provider.phone_cell,
                formElement:  <FormTextFocused name="phonecell"  label="Cell" width={215}/>
                },{
                rowLabel: "Pager",
                fieldContent: provider.phone_pager,
                formElement:  <FormTextFocused name="phonepager" label="Pager" width={215} />
            }];
        };

        const reassignCareGroupFormField = (provider) => {
            return [{
                rowLabel: "Care group",
                fieldContent: startCase(provider.provider_group.name),
                formElement:  <CareGroupSelect />
            }]
        }

        if (error) {
            return <div>Error! {error.message}</div>
        }
    
        if (isEmpty(provider)) {
            return null
        }
      
        return ( 
            <Fragment>
                <Card className={classes.root}>
                    <ProviderDetailsBar provider={provider} />
                    
                    <Typography variant="subtitle1" gutterBottom>
                        {update === "provider details" ? 
                            "Click 'update' next to the information you want to edit."
                            :
                            "Click 'update' to reassign this provider to another care group."
                        }           
                    </Typography>

                    <br /> <br />

                    <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                        <FormUpdateUnit 
                            formFields={update === "provider details" ?
                                personalDetailsFormFields(provider) 
                                : 
                                reassignCareGroupFormField(provider)
                            }
                            outcomeReset={this.outcomeReset}
                            updateSuccess={success} 
                            updateInProgress={inProgress}
                            updateFailed={failed}
                        />
                    </form>

                    <br /> <br />

                </Card>

                {failed && <DialogSaveFailure text="A problem was encountered and the provider's details were not updated." cancelUrl="/admin/provider"/>} 

            </Fragment>   
        );
    }
}


const validate = (values) => {
    //console.log("Error values: ", values) 
    const errors = {};  // error accumulator
    // validate inputs from 'values'
    errors.officename = validateName(values.officename)
    errors.officestreet = validateName(values.officestreet)
    errors.officecity = validateName(values.officecity)
    errors.officestate = validateState(values.officestate)
    errors.officezip = validateZip(values.officezip)
    errors.email = validateEmail(values.email)
    errors.phoneoffice = validatePhone(values.phoneoffice)
    errors.phonecell = validatePhone(values.phonecell)
    errors.phonepager = validatePhoneOther(values.phonepager)
    errors.caregroup = validateName(values.careGroup)
    // If errors is empty, then form good to submit
    //console.log("Errors: ", errors)
    return errors;
}

const formData = {
    form: 'updateForm', //unique identifier for this form 
    validate     
}

const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        provider: state.provider.provider,
        loading: state.provider.loading,
        error: state.provider.error,
        providerUpdate: state.providerUpdate.update,
        errorProviderUpdate: state.providerUpdate.error,
        loadingProviderUpdate: state.providerUpdate.loading
    }
};

ProviderUpdate = connect(mapStateToProps)(ProviderUpdate)
ProviderUpdate = reduxForm(formData)(ProviderUpdate)
ProviderUpdate = withStyles(styles)(ProviderUpdate)
export default ProviderUpdate;