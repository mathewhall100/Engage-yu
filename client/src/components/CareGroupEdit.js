import React, { Component } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reset, reduxForm } from 'redux-form';
import { startCase } from 'lodash';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { selectConsoleTitle } from '../actions/index'
import FormSelect from './Forms/FormSelect'
import FormTextFocused from './Forms/FormTextFocused';
import CareGroupEditSuccessDialog from './Dialogs/CareGroupEditSuccessDialog';
import CareGroupEditFailedDialog from './Dialogs/CareGroupEditFailedDialog.js';
import provider_groupAPI from "../utils/provider_group.js";


const styles = theme => ({
    root: {
        padding: "20px"
    },
    tableText: {
        marginTop: "10px"
     },
    btn: {
        backgroundColor: "#eeeeee",
        textDecoration: "none",
        borderRadius: "5px",
        padding: "5px",
        marginLeft: "20px",
        float: "right",
        '&:hover': {
            backgroundColor: "#dddddd",
        },
        '&:disabled': {
            color: 'grey'
        },
        hover: {},
        disabled: {},
    }
});


class CareGroupEdit extends Component {  
    
    componentDidMount() {
        this.props.selectConsoleTitle({title: "Update Care Group"});
    };

    state = {
        careGroupEditSuccess: false,
        careGroupEditFailed: false,
        showEditField: false,
    }

    
    submit(values) {
        //console.log("Submitted edit name: ", values);
        provider_groupAPI.update(this.props.careGroup._id, {
            group_name: values.caregroup
        })
        .then(res => {
            console.log("res.data: ", res.data)
            this.setState ({
                name: values.caregroup,
                careGroupEditSuccess: true
            })   // update success dialog
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
            this.setState({careGroupEditFailed: true}); // update failed dialog
        })
    }


    handleEdit(event) {
       // console.log("handleclickedit clicked")
        this.setState ({careGroupEditSuccess: false}) 
        if (this.state.editFieldActive) {
            // maybe show error message that only one field may be updated at once
        }
        this.setState({showEditField: true})
    }

    handleCancel(event) {
        //console.log("handleclickcancel clicked")
        this.setState({showEditField: false})
    };

    handleBack(event) {
        this.props.handleAction(0)
    }


    render () {

        const { showEditField, careGroupEditSuccess, careGroupEditFailed } = this.state
        const { careGroup, handleSubmit, submitting, pristine, classes } = this.props

        const Header = () => {
            return (

                <div>
                    <br />

                    <Grid container spacing={24}>

                        <Grid item xs={4}>
                        <Typography variant="caption">
                                Care Group name:  
                            </Typography>
                            <Typography variant="title">
                                <span>{startCase(careGroup.group_name)}</span>
                            </Typography>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography variant="caption">
                                Added By: 
                            </Typography>
                            <Typography variant="subheading">
                                <span  className={classes.textBold}>Dr. {startCase(careGroup.added_by_name)}</span>
                            </Typography> 
                        </Grid>
                        
                        <Grid item xs={3}>
                            <Typography variant="caption">
                                    Date Added
                            </Typography>
                            <Typography variant="subheading">
                                <span className={classes.textBold}>{moment(careGroup.date_added).format("MMM Do YYYY")}</span>
                            </Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <Button size="small" className={classes.btn} onClick={event => this.handleBack()}>Back</Button>
                        </Grid>

                    </Grid>

                    <br />
                    <br />
                </div>
            )
        }

        return (

            <div>
            
                {careGroupEditSuccess && <CareGroupEditSuccessDialog name={careGroup.name} careGroupId={careGroup._id} /> }

                {careGroupEditFailed && <CareGroupEditFailedDialog />} 

                <Card style={{padding: "20px"}}>

                    < Header />

                    <br />
                    <hr />
                    <br />
                    
                    <Typography variant="subheading">
                        Click 'update' to edit name of care group.
                    </Typography>

                    <br />
                    <br />

                    <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>

                        <Grid container spacing={24}>

                            <Grid item xs={2}>
                                <div className={classes.tableText}>Care Group Name:</div>
                            </Grid>

                            <Grid item xs={3}>
                                <div className={classes.tableText}>{startCase(careGroup.group_name)}</div>
                            </Grid>

                            <Grid item xs={1}>
                                <Button type="button" size="small" disabled={submitting || (showEditField  && !careGroupEditSuccess) } className={classes.btn} onClick={event => this.handleEdit(event)}>update</Button>
                            </Grid>

                            <Grid item xs={4}>
                                {showEditField && !careGroupEditSuccess && <div style={{float: "right", paddingBottom: "15px"}}>
                                    <div style={{position: "relative", top: "-30px"}}>
                                        <FormTextFocused
                                            name="caregroup"
                                            label="New care group name"
                                            width="350"
                                        />
                                    </div>
                                </div> } 

                                {showEditField && careGroupEditSuccess && <div style={{float: "right", color: "green", paddingTop: "10px"}}>
                                    Successfully updated!
                                </div> }
                            </Grid>

                            <Grid item xs={2}>
                                {showEditField &&  !careGroupEditSuccess && <span>
                                    <Button size="small" type="button" className={classes.btn} onClick={event => this.handleCancel(event)}>Cancel</Button>
                                    <Button size="small" type="submit" disabled={submitting || pristine} className={classes.btn} >Submit</Button>
                                </span> }
                            </Grid> 

                        </Grid>

                    </form>  

                    <br />
                    <br /> 

                </Card> 
 
            </div> 
        );
    }
}

const validate = (values) => {
    console.log("Error values: ", values) // -> { object containing all values of form entries } 
    const errors = {};

    // validate inputs from 'values'
    
    if (values.caregroup && values.caregroup.length <3 ) {
        errors.caregroup = "*Please enter a valid caregroup identifier!";   // message to be displayed if invalid
    } 

    // If errors is empty, then form good to submit
    // If errors has any properties, redux form assumes form is invalid
    console.log("Errors: ", errors)
    return errors;

}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle }, dispatch);
}

const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        careGroup: state.careGroup.careGroup,
        user: state.user
    }
};

const formData = {
    form: 'CareGroupEditForm' //unique identifier for this form 
    //validate
}

CareGroupEdit = reduxForm(formData)(CareGroupEdit)
CareGroupEdit = withStyles(styles)(CareGroupEdit)
CareGroupEdit = connect(mapStateToProps, mapDispatchToProps)(CareGroupEdit)
export default CareGroupEdit;