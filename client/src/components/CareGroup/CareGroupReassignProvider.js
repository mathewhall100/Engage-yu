import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { startCase, isEmpty } from 'lodash';
import { withStyles, Card, Typography } from '@material-ui/core';
import FormUpdateUnit from '../UI/Forms/formUpdateUnit';
import { validateName } from '../../logic/formValidations';
import { selectConsoleTitle, loadProvider, providerUpdate } from '../../actions';
import CareGroupSelect from '../CareGroup/CareGroupSelect'
import ProviderDetailsBar from '../Provider/ProviderDetailsBar';
import DialogError from '../UI/Dialogs/dialogError';

const styles = () => ({
    root: {
        padding: "40px"
    },
})


class CareGroupReassignProvider extends PureComponent {  

    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Reassign Provider Caregroup", menuIndex: 7}))
    };

    componentWillReceiveProps(nextProps) {
        if (!isEmpty(nextProps.providerUpdate) && nextProps.providerUpdate !== this.props.providerUpdate) {this.updateSuccess()}
        if (nextProps.errorProviderUpdate) {this.updateFailed()}
        if (nextProps.loadingProviderUpdate) {this.updateInProgress()}
    } 

    componentWillUnmount() {
        this.props.dispatch(providerUpdate("reset"))
    }
    
    state = {
        success: false,
        failed: false,
        inProgress: false
    }

    submit(values) {
        console.log("Submit: ", values)
        this.props.dispatch(providerUpdate(values, this.props.provider))
    };

    updateSuccess = (data) => {
        this.props.dispatch(loadProvider(this.props.provider._id))
        this.props.reset('updateForm');  // reset the form fields to empty (requires form name)
        this.setState({success: true})
    }

    updateFailed = (err) => {
        this.setState({failed: true}); 
        this.props.dispatch(providerUpdate("reset"))
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
        
        const { provider, error, handleSubmit, classes } = this.props
        const { failed, success, inProgress } = this.state

        const reassignCareGroupFormField = (provider) => {
            return [{
                rowLabel: "Current care group",
                fieldContent: startCase(provider.provider_group.name),
                formElement:  <CareGroupSelect />
            }]
        }

        if (error) {
            return <DialogError /> 
        }
    
        if (isEmpty(provider)) {
            return null
        }
      
        return ( 
            <Fragment>
                <Card className={classes.root}>
                    <ProviderDetailsBar provider={provider} />
                    
                    <Typography variant="subtitle1" gutterBottom>
                        "Click 'update' to reassign this provider to another care group."
                    </Typography>

                    <br /> <br />

                    <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                        <FormUpdateUnit 
                            formFields={reassignCareGroupFormField(provider)}
                            outcomeReset={this.outcomeReset}
                            updateSuccess={success} 
                            updateInProgress={inProgress}
                            updateFailed={failed}
                        />
                    </form>

                    <br /> <br />

                </Card>

                {failed && <DialogError text="Whoops! Something went wrong and the provider's details could not be updated at this time."/>} 

            </Fragment>   
        );
    }
}


const validate = (values) => {
    const errors = {};  
    errors.caregroup = validateName(values.careGroup)
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

CareGroupReassignProvider = connect(mapStateToProps)(CareGroupReassignProvider)
CareGroupReassignProvider = reduxForm(formData)(CareGroupReassignProvider)
CareGroupReassignProvider = withStyles(styles)(CareGroupReassignProvider)
export default CareGroupReassignProvider;