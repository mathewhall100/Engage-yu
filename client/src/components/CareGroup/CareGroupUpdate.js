import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { startCase } from 'lodash';
import { withStyles, Typography, Card } from '@material-ui/core';
import FormTextFocused from '../UI/Forms/formTextFocused';
import FormUpdateUnit from '../UI/Forms/formUpdateUnit'
import DialogGeneric from '../UI/Dialogs/dialogGeneric';
import CallBack from '../UI/callback';
import provider_groupAPI from "../../utils/provider_group.js";
import { selectConsoleTitle, loadCareGroup } from '../../actions'
import { validateName } from '../../logic/formValidations'
import CareGroupDetailsBar from './CareGroupDetailsBar'


const styles = () => ({
    root: {
        padding: "40px"
    },
});


class CareGroupUpdate extends Component {  

    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Update Care Group"}));
    };

    state = {
        updateSuccess: false,
        updateFailed: false,
    }

    // Form handler
    submit(values) {
        console.log("Submitted edit name: ", values);
        provider_groupAPI.update(this.props.careGroup._id, {
            group_name: values.caregroup
        })
        .then(res => {
            console.log("res.data: ", res.data)
            this.props.dispatch(loadCareGroup(res.data._id));
            this.setState ({updateSuccess: true})
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
        const { careGroup, error, loading, handleSubmit, classes } = this.props
        const { updateSuccess, updateFailed } = this.state
       
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

        if (loading || !careGroup._id ) {
            return <CallBack />
        }

        return (
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
                        updateSuccess={updateSuccess} 
                        updateFailed={updateFailed}
                    />
                </form> 
                
                {updateFailed && 
                    <DialogGeneric 
                        title="Failed!" 
                        text={`Unfortuneately a problem occurred and this care group could not be updated at this time. Please check the dtails you have entered and try again. If the problem persists, contact the syste administrator`}
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
    errors.caregroup = validateName(values.caregroup) 
    console.log("Errors: ", errors)
    return errors;
}

const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        careGroup: state.careGroup.careGroup,
        loading: state.careGroup.loading,
        error: state.careGroup.error,
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