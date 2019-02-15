import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { startCase } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { selectConsoleTitle, careGroupAction } from '../../actions/index'
import SmallBtn from '../Buttons/smallBtn';
import CareGroupDetailsBar from './CareGroupDetailsBar'
import FormTextFocused from '../Forms/FormTextFocused';
import Dialog from '../Dialogs/simpleDialog';
import CallBack from '../Callback';
import provider_groupAPI from "../../utils/provider_group.js";


const styles = theme => ({
    root: {
        padding: "20px"
    },
     fwMedium: {
        fontWeight: 500,
    },
    formElement: {
        position: "relative",
        top: "-32px"
    },
    successText: {
        color: "green", 
        position: "relative", top: "6px"
    },
    failedText: {
        position: "relative", top: "6px"
    },
    backBtn: {
        margin: "6px 0 0 0"
    }
});


class CareGroupUpdate extends Component {  
    
    componentDidMount() {
        console.log("careGroup: ", this.props.careGroup)
    };

    state = {
        updateSuccess: false,
        updateFailed: false,
        showEditField: false,
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
        //console.log("Submitted edit name: ", values);
        provider_groupAPI.update(this.props.careGroup._id, {
            group_name: values.caregroup
        })
        .then(res => {
            console.log("res.data: ", res.data)
            this.fetchCareGroup(res.data._id)
            
            this.setState ({
                updateSuccess: true, // update success dialog
                newCareGroup: res.data.group_name
            })
            this.props.reset('careGroupUpdateForm');  // reset the form fields to empty (requires form name)
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
            this.setState({updateFailed: true}); // update failed dialog
        })
    }

    // Event handlers
    handleUpdate = (index) => {
       // console.log("handleclickedit clicked")
        this.setState ({
            updateSuccess: false,
            showEditField: true
        })
    }

    handleCancel = () => {
        //console.log("handleclickcancel clicked")
        this.setState({showEditField: false})
        this.props.reset('careGroupUpdateForm');  // reset the form fields to empty (requires form name)
    };

    handleTryAgain = () => {
        this.setState({updateFailed: false})
    }


    render () {

        const { showEditField, newCareGroup, updateSuccess, updateFailed } = this.state
        const { careGroup, handleSubmit, submitting, pristine, classes } = this.props

        return (
            <Card className={classes.root}>

                {careGroup && careGroup._id ? 
                     <React.Fragment>

                        <CareGroupDetailsBar careGroup={careGroup} />

                        <br /> <hr /> <br />
                    
                        <Typography variant="subheading">Click 'update' to update care group. </Typography>

                        <br />  <br />

                        <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                            <Grid container spacing={24}>
                                <Grid item xs={2} style={{paddingTop: "20px"}}>
                                    <Typography variant="subtitle1"> Care Group Name:</Typography>
                                </Grid>
                                <Grid item xs={3} style={{paddingTop: "20px"}}>
                                    <Typography variant="subtitle1" className={classes.fwMedium}>{startCase(careGroup.group_name)}</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <SmallBtn type="button"  disabled={submitting || (showEditField  && !updateSuccess) }  text="update" handleBtn={this.handleUpdate} />
                                </Grid>
                                <Grid item xs={4}>
                                    { showEditField && !updateSuccess && 
                                        <Typography align="center" className={classes.formElement}>
                                            <FormTextFocused
                                                name="caregroup"
                                                label="New care group name"
                                                width="320"
                                            />
                                        </Typography>
                                    }   
                                    { showEditField && updateSuccess && 
                                        <Typography variant="subtitle1" align="center" className={classes.successText}>
                                            Successfully updated!
                                        </Typography> 
                                    }
                                    { showEditField && updateFailed && 
                                        <Typography variant="subtitle1" align="center" color="error" className={classes.failedText}>
                                            Update failed!
                                        </Typography> 
                                    }
                                </Grid>
                                <Grid item xs={2}>
                                    {showEditField &&  updateFailed && 
                                    <span>
                                        <SmallBtn type="button" disabled={false} index="" text="cancel" handleBtn={this.handleCancel} />
                                        <SmallBtn type="button" disabled={false} index="" handleBtn={this.handleTryAgain} />
                                    </span> }
                                    {showEditField &&  !updateSuccess && !updateFailed && 
                                        <span> 
                                            <SmallBtn type="submit" disabled={submitting || pristine} index="" text="submit" />
                                            <SmallBtn type="button" dispabled={pristine} index="" text="cancel" handleBtn={this.handleCancel} /> 
                                        </span> 
                                    }
                                </Grid> 
                            </Grid>
                        </form>  
                    
                        <br /> <br /> 

                    </React.Fragment>
                    : 
                    <CallBack />
                }

                {updateSuccess && 
                    <Dialog 
                        title="Success!" 
                        text={`New care group, ${newCareGroup} has been successfully updated `} 
                    /> 
                }
                {updateFailed && 
                    <Dialog 
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
    if (values.caregroup && values.caregroup.length <3 ) {
        errors.caregroup = "*Please enter a valid caregroup identifier!";   // message to be displayed if invalid
    } 
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
    form: 'careGroupUpdateForm' //unique identifier for this form 
    ,validate
}

CareGroupUpdate = reduxForm(formData)(CareGroupUpdate)
CareGroupUpdate = withStyles(styles)(CareGroupUpdate)
CareGroupUpdate = connect(mapStateToProps, mapDispatchToProps)(CareGroupUpdate)
export default CareGroupUpdate;