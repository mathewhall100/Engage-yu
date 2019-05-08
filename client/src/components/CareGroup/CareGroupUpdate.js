import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { startCase, isEmpty } from 'lodash';
import { withStyles, Typography, Card } from '@material-ui/core';
import FormTextFocused from '../UI/Forms/formTextFocused';
import FormUpdateUnit from '../UI/Forms/formUpdateUnit'
import DialogError from '../UI/Dialogs/dialogError';
import { selectConsoleTitle, loadCareGroup, careGroupUpdateSave } from '../../actions'
import { validateName } from '../../logic/formValidations'
import CareGroupDetailsBar from './CareGroupDetailsBar'


const styles = () => ({
    root: {
        padding: "40px"
    },
});


class CareGroupUpdate extends PureComponent {  

    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Update Care Group", menuIndex: 7}));
    };

    componentWillReceiveProps(nextProps) {
        if (!isEmpty(nextProps.careGroupUpdate) && nextProps.careGroupUpdate !== this.props.careGroupUpdate) {this.updateSuccess()}
        if (nextProps.errorCareGroupUpdate) {this.updateFailed()}
        if (nextProps.loadingCareGroupUpdate) {this.updateInProgress()}
    }

    componentWillUnmount() {
        this.props.dispatch(careGroupUpdateSave("reset"))
    }

    state = {
        success: false,
        failed: false,
        inProgress: false
    }

    // Form handler
    submit(values) {
        console.log("Submitted edit name: ", values);
        this.props.dispatch(careGroupUpdateSave(values, this.props.careGroup._id))
    }

    updateSuccess = (data) => {
        this.props.dispatch(loadCareGroup(this.props.careGroup._id))
        this.setState({success: true})
    }

    updateFailed = (err) => {
        this.setState({failed: true}); 
        this.props.dispatch(careGroupUpdateSave("reset"))
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
        const { careGroup, error, handleSubmit, classes } = this.props
        const { success, failed, inProgress } = this.state
       
        const getFormFields = (careGroup) => {
            console.log("careGroup: ", careGroup)
            return [{
                rowLabel: "Care Group Name:", 
                fieldContent: startCase(careGroup.group_name), 
                formElement: <FormTextFocused name="caregroup" label="New care group name" width="215"/>
            }]
        }


        if (error) {
            return <div>Error! {error.message}</div>
        }
    
        if (isEmpty(careGroup)) {
            return null
        }

        return (
            <Fragment>
                <Card className={classes.root}>
                    <CareGroupDetailsBar careGroup={careGroup} />

                    <Typography variant="subtitle1" gutterBottom>
                        Click 'update' to update care group.
                    </Typography>
                
                    <br /> <br />

                    <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                        <FormUpdateUnit 
                            formFields={getFormFields(careGroup)}
                            outcomeReset={this.outcomeReset}
                            updateSuccess={success} 
                            updateFailed={failed}
                            updateInProgress={inProgress}
                        />
                    </form> 

                    <br /> <br />

                </Card> 

                {failed && <DialogError text="A problem was encountered and the Care Group's details were not updated." cancelUrl="/admin/caregroup"/>}

            </Fragment>
        );
    }
}

const validate = (values) => {
    //console.log("Error values: ", values) 
    const errors = {};
    // validate inputs from 'values'
    errors.caregroup = validateName(values.caregroup) 
    //console.log("Errors: ", errors)
    return errors;
}

const mapStateToProps = (state) => {
    //console.log("State : ", state);
    return {
        careGroup: state.careGroup.careGroup,
        loading: state.careGroup.loading,
        error: state.careGroup.error,
        careGroupUpdate: state.careGroupUpdate.update,
        errorCareGroupUpdate: state.careGroupUpdate.error,
        loadingCareGroupUpdate: state.careGroupUpdate.loading
    }
};

const formData = {
    form: 'updateForm', //unique identifier for this form 
    validate
}

CareGroupUpdate = reduxForm(formData)(CareGroupUpdate)
CareGroupUpdate = withStyles(styles)(CareGroupUpdate)
CareGroupUpdate = connect(mapStateToProps)(CareGroupUpdate)
export default CareGroupUpdate;