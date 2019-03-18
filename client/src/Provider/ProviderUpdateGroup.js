import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { startCase } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { selectConsoleTitle, providerAction } from '../actions/index'
import providerAPI from "../utils/provider.js";
import Dialog from '../components/Dialogs/SimpleDialog';
import ProviderDetailsBar from './providerDetailsBar'
import CareGroupSelect from '../components/Forms/CareGroupSelect'
import CallBack from '../components/Callback'
import UpdateFormUnit from '../components/Forms/UpdateFormUnit'
import { validateIsRequired } from '../logic/formValidations'


const styles = theme => ({
    root: {
        padding: "40px"
    },
})

class UpdateProviderGroup extends Component {  

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Reassign Provider Caregroup"});
        this.fetchProviderDetailsToUpdate(this.props.location.state.providerId)
    }
        
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

    // handle form submission
    submit(values) {
        console.log("Submit: ", values)
        providerAPI.update(this.props.provider._id, {
            provider_group_ref: values.caregroup[0],
            provider_group_id: values.caregroup[0],
            provider_group_name: values.caregroup[1]
        })
        .then(res => {
            console.log("res.data: ", res.data)
            this.fetchProviderDetailsToUpdate(this.props.provider._id)
            this.setState({
                editFieldActive: false,
                updateSuccess: true,
                })
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
            this.setState({updateFailed: true}); // update failed dialog
        })
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
                rowLabel: "Care group",
                fieldContent: startCase(provider.provider_group_name),
                formElement:  <CareGroupSelect />
            }]
        }

        return (
            <Card className={classes.root}>

                {provider && provider._id ? 
                    <React.Fragment>

                        <ProviderDetailsBar provider={provider} />

                        <Typography variant="subtitle1" gutterBottom>Click 'update' to reassign this provider to another care group.</Typography>

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
                                text={`Unfortuneately a problem occurred and this provider could not be updated at this time. Please check the dtails you have entered and try again. If the problem persists, contact the system administrator`}
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
    errors.caregroup = validateIsRequired(values.caregroup)
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
    validate,      
}

UpdateProviderGroup = connect(mapStateToProps, mapDispatchToProps)(UpdateProviderGroup)
UpdateProviderGroup = reduxForm(formData)(UpdateProviderGroup)
UpdateProviderGroup = withStyles(styles)(UpdateProviderGroup)
export default UpdateProviderGroup;