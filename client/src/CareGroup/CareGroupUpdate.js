import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { startCase } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { selectConsoleTitle, careGroupAction } from '../actions/index'
import CareGroupDetailsBar from './CareGroupDetailsBar'
import FormTextFocused from '../components/Forms/FormTextFocused';
import UpdateFormUnit from '../components/Forms/UpdateFormUnit'
import Dialog from '../components/Dialogs/SimpleDialog';
import CallBack from '../components/Callback';
import provider_groupAPI from "../utils/provider_group.js";
import { validateName } from '../logic/formValidations'


const styles = theme => ({
    root: {
        padding: "40px"
    },
});


class CareGroupUpdate extends Component {  

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Update care group"});
    };

    state = {
        updateSuccess: false,
        updateFailed: false,
    }

    fetchCareGroup = (careGroupId) => {
        provider_groupAPI.findById(careGroupId)
            .then(res => {
                console.log("res.data: ", res.data);
                this.props.careGroupAction(res.data);
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
        })
    };

    // Form handler
    submit(values) {
        console.log("Submitted edit name: ", values);
        provider_groupAPI.update(this.props.careGroup._id, {
            group_name: values.caregroup
        })
        .then(res => {
            console.log("res.data: ", res.data)
            this.fetchCareGroup(res.data._id)
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

        const { updateSuccess, updateFailed } = this.state
        const { careGroup, handleSubmit, classes } = this.props

        const getFormFields = (careGroup) => {
            console.log("careGroup: ", careGroup)
            return [{
                rowLabel: "Care Group Name:", 
                fieldContent: startCase(careGroup.group_name), 
                formElement: <FormTextFocused name="caregroup" label="New care group name" width="215"/>
            }]
        }

        return (
            <Card className={classes.root}>

                {careGroup && careGroup._id ? 
                     <React.Fragment>

                        <CareGroupDetailsBar careGroup={careGroup} />

                        <Typography variant="subtitle1" gutterBottom>
                            Click 'update' to update care group.
                        </Typography>
                    
                        <br /> <br />

                        <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                            <UpdateFormUnit 
                                formFields={getFormFields(careGroup)}
                                outcomeReset={this.outcomeReset}
                                updateSuccess={updateSuccess} 
                                updateFailed={updateFailed}
                            />
                        </form> 
                        
                        {updateFailed && 
                            <Dialog 
                                title="Failed!" 
                                text={`Unfortuneately a problem occurred and this care group could not be updated at this time. Please check the dtails you have entered and try again. If the problem persists, contact the syste administrator`}
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
    errors.caregroup = validateName(values.caregroup) 
    console.log("Errors: ", errors)
    return errors;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, careGroupAction }, dispatch);
}

const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        careGroup: state.careGroup,
        user: state.user
    }
};

const formData = {
    form: 'updateForm', //unique identifier for this form 
    validate
}

CareGroupUpdate = reduxForm(formData)(CareGroupUpdate)
CareGroupUpdate = withStyles(styles)(CareGroupUpdate)
CareGroupUpdate = connect(mapStateToProps, mapDispatchToProps)(CareGroupUpdate)
export default CareGroupUpdate;