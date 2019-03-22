import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { startCase } from 'lodash';
import { withStyles, Card, Typography } from '@material-ui/core';
import CallBack from '../UI/callback'
import FormUpdateUnit from '../UI/Forms/formUpdateUnit'
import DialogActionFailed from '../UI/Dialogs/dialogActionFailed'
import { validateIsRequired } from '../../logic/formValidations'
import { selectConsoleTitle, loadProvider } from '../../actions'
import providerAPI from "../../utils/provider.js";
import ProviderDetailsBar from './ProviderDetailsBar'
import CareGroupSelect from '../CareGroup/CareGroupSelect'


const styles = () => ({
    root: {
        padding: "40px"
    },
})

class ProviderUpdateGroup extends Component {  

    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Reassign Provider Caregroup"}));
    }
        
    state = {
        updateSuccess: false,
        updateFailed: false,
    }

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
            this.props.dispatch(loadProvider(this.props.provider._id))
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
        const { provider, error, loading, handleSubmit, classes } = this.props
        const { updateFailed, updateSuccess } = this.state

        const getFormFields = (provider) => {
            return [{
                rowLabel: "Care group",
                fieldContent: startCase(provider.provider_group_name),
                formElement:  <CareGroupSelect />
            }]
        }

        if (error) {
            return <div>Error! {error.message}</div>
        }

        if (loading || !provider._id) {
            return <CallBack />
        }

        return (
            <Card className={classes.root}>

                <ProviderDetailsBar provider={provider} />

                <Typography variant="subtitle1" gutterBottom>Click 'update' to reassign this provider to another care group.</Typography>

                <br /> <br />

                <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                    <FormUpdateUnit 
                        formFields={getFormFields(provider)}
                        outcomeReset={this.outcomeReset}
                        updateSuccess={updateSuccess} 
                        updateFailed={updateFailed}
                    />
                </form>

                <br /> <br />

                {updateFailed && 
                    <DialogActionFailed 
                        title="Failed!" 
                        text={`Unfortuneately a problem occurred and this provider could not be updated at this time. Please check the dtails you have entered and try again. If the problem persists,contact the system administrator`}
                    />
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

const mapStateToProps = (state) => {
    //console.log("State : ", state);
    return {
        provider: state.provider.provider,
        error: state.provider.error,
        loading: state.provider.loading
    }
};

const formData = {
    form: 'updateForm', //unique identifier for this form 
    validate,      
}

ProviderUpdateGroup = connect(mapStateToProps)(ProviderUpdateGroup)
ProviderUpdateGroup = reduxForm(formData)(ProviderUpdateGroup)
ProviderUpdateGroup = withStyles(styles)(ProviderUpdateGroup)
export default ProviderUpdateGroup;