import React, { Component } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reset, reduxForm } from 'redux-form';
import { startCase } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { selectConsoleTitle, providerAction } from '../../actions/index'
import provider_groupAPI from "../../utils/provider_group"
import providerAPI from "../../utils/provider.js";
import Dialog from '../Dialogs/simpleDialog';
import SmallBtn from '../Buttons/smallBtn'
import ProviderDetailsBar from './providerDetailsBar'
import FormSelect from '../Forms/FormSelect'


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

class UpdateProviderGroup extends Component {  

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Reassign provider caregroup"});
        this.fetchProviderDetailsToUpdate(this.props.location.state.providerId)

        // On component mount, fetch caregroups to populate caregroup select box
        provider_groupAPI.findAll()
            .then(res => {
                console.log("res.data: ", res.data);
                let careGroupList=[];
                res.data.map((group, index) => {
                    careGroupList.push ({
                        value: index,
                        id: group._id,
                        text: `${startCase(group.group_name)}`
                    })
                })
                this.setState({careGroupList: careGroupList})
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
        })
    }; 
        
    state = {
        careGroupList: [],
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

    // handle form submission
    submit(values) {
        console.log("Submit: ", values)
        const { careGroupList, successFlag } = this.state
        providerAPI.update(this.props.provider._id, {
            provider_group_ref: careGroupList[values.caregroup].id,
            provider_group_id: careGroupList[values.caregroup].id,
            provider_group_name: careGroupList[values.caregroup].text,
        })
        .then(res => {
            console.log("res.data: ", res.data)
            this.fetchProviderDetailsToUpdate(this.props.provider._id)
            this.setState({
                editFieldActive: false,
                updateSuccess: true,
                })
            this.props.reset('providerGroupUpdateForm');  // reset the form fields to empty (requires form name)
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
            this.setState({updateFailed: true}); // update failed dialog
        })
    }


    // Event handlers
    handleUpdate = () => {
        // console.log("handleclickedit clicked")
            this.setState ({
                updateSuccess: false,
                showEditField: true
            })
        }
    
    handleCancel = () => {
            //console.log("handleclickcancel clicked")
            this.setState({showEditField: false})
            this.props.reset('providerGroupUpdateForm');  // reset the form fields to empty (requires form name)
        };
    
    handleTryAgain = () => {
            this.setState({updateFailed: false})
        }


    render () {
        
        const { submitting, pristine, provider, handleSubmit, classes } = this.props
        const { editFieldActive, showEditField, updateFailed, updateSuccess, careGroupList } = this.state

        const formFields = [{
            rowLabel: "Care group",
            fieldContent: provider.provider_group_name,
            formElement:  <FormSelect name="caregroup" label="Care group" items={careGroupList} width={215} />
            }]

        const getPositioning = () => {
            return {top: "-24px" }
        }

        return (
            <Card className={classes.root}>

                <ProviderDetailsBar provider={provider} />

                <Typography variant="title">
                    Select detail to update and click 'update'
                </Typography>

                <br /> <br />

                <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                    {formFields.map((field, index) => {
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
                                        <span className={classes.formElement} style={getPositioning(index)} >      
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
                        text={`Unfortuneately a problem occurred and this provider could not be updated at this time. Please check the dtails you have entered and try again. If the problem persists, contact the system administrator`}
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

    if (!values.caregroup ) {
    errors.caregroup = "Please select a care group!";   
    }

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
    form: 'ProviderGroupUpdateForm', //unique identifier for this form 
    validate,      
}

UpdateProviderGroup = connect(mapStateToProps, mapDispatchToProps)(UpdateProviderGroup)
UpdateProviderGroup = reduxForm(formData)(UpdateProviderGroup)
UpdateProviderGroup = withStyles(styles)(UpdateProviderGroup)
UpdateProviderGroup = withRouter(UpdateProviderGroup)
export default UpdateProviderGroup;