import React, { Component } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reset, reduxForm } from 'redux-form';
import { startCase } from 'lodash';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { selectConsoleTitle, providerDetails } from '../../actions/index'
import providerAPI from "../../utils/provider.js";
import FormSelect from '../Forms/FormSelect'
import EditProviderSuccessDialog from '../Dialogs/EditProviderSuccessDialog';
import EditProviderFailedDialog from '../Dialogs/EditProviderFailedDialog.js';

let selectItems = [];

const styles = theme => ({
    root: {
        padding: "20px"
    },
    tableText: {
       marginTop: "10px"
    },
    textBold: {
        fontWeight: "bold",
      },
    btn: {
        backgroundColor: "#eeeeee",
        textDecoration: "none",
        borderRadius: "5px",
        padding: "5px",
        marginTop: "10px",
        marginLeft: "20px",
        float: "right",
        '&:hover': {
            backgroundColor: "#dddddd",
            cursor: 'pointer'
        },
        '&:disabled': {
            color: 'grey',
            cursor: 'disabled'
        },
        hover: {},
        disabled: {},
    },
})

class ProviderEdit extends Component {  

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Update provider role"});
    };

    componentWillReceiveProps(nextProps) {
        this.setState({editFieldActive: false})
    }


    state = {

        providerUpdateSuccess: false,
        providerUpdateFailed: false,

        editFieldActive: false, 
        showEditField: []
    }


    submit(values) {
        console.log("Submit: ", values)

        const { provider, reset } = this.props

        if (values.role) {
            providerAPI.update(this.props.provider._id, {
                role: values.role
            })
            .then(res => {
                console.log("res.data: ", res.data)
                this.props.reset()
                this.setState ({providerUpdateSuccess: true})   // update success dialog
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
                this.setState({providerUpdateFailed: true}); // update failed dialog
            })
        }
    }

    handleClickEdit(event, field) {
        this.setState ({providerUpdateSuccess: false}) 
        if (this.state.editFieldActive) {
            // maybe show error message that only one field may be updated at once
        }
        let tempArray = []
        tempArray[field] = true
        this.setState({showEditField: tempArray})
        this.setState({editFieldActive: true})
    }

    handleClickCancel(event, field) {
        this.setState({showEditField: []})
        this.setState({editFieldActive: false})
    }

    handleClickBack(event) {
        this.props.handleAction(1)
    }


    render () {
        
        const { submitting, pristine, provider, handleSubmit, classes } = this.props
        const { editFieldActive, showEditField, providerUpdateFailed, providerUpdateSuccess } = this.state

        const roleList =  [
            {id: "1", value: 'Physician (specialist)', text: 'Physician (specialist)' },
            {id: "2", value: 'Physician (hospitalist)', text: 'Physician (hospitalist)' },
            {id: "3", value: 'Physician (primary care)', text: 'Physician (primary care)' },
            {id: "4", value: 'Nurse (specialist)', text: 'Nurse (specialist)'},
            {id: "5", value: 'other', text: 'other'},
        ]

        const renderSelectField = (field) => {

            const { input, label, meta: { touched, error }, children, ...custom } = field;

            return (
                
                <FormControl style={{width: "250px"}}>
                    <InputLabel>My patients</InputLabel>
                    <Select
                        {...input}
                        onSelect={(event, index, value) => input.onChange(value)}
                        children={children} 
                        {...custom}
                    />
                </FormControl>
            )
        }
        
        return (

            <div>

                {providerUpdateSuccess && <EditProviderSuccessDialog providerId={provider._id}/>}

                {providerUpdateFailed && <EditProviderFailedDialog />} 

                <Card className={classes.root}>

                    <br />

                    <Grid container spacing={24}>
                        <Grid item xs={3}>
                            <Typography variant="caption">
                                Provider name
                            </Typography>
                            <Typography variant="title">
                                <span className={classes.textBold}>{startCase(provider.firstname)} {startCase(provider.lastname)}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="caption">
                                Role:
                            </Typography>
                            <Typography variant="subheading">
                                <span className={classes.textBold}>{provider.role}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="caption">
                                Care group
                            </Typography>
                            <Typography variant="subheading">
                                <span className={classes.textBold}>{provider.provider_group_name}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="caption">
                                Added
                            </Typography>
                            <Typography variant="subheading">
                                <span  className={classes.textBold}>{moment(provider.date_added).format("MMM Do YYYY")}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Button size="small" className={classes.btn} style={{float: "right"}} onClick={event => this.handleClickBack(event)}>Back</Button>
                        </Grid>

                    </Grid>

                    <br />
                    <hr />
                    <br />

                    <Typography variant="title">
                        Select detail to edit and click 'update'
                    </Typography>

                    <br />
                    <br />

                    <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>

                        <Grid container spacing={24}>
                            <Grid item xs={1}>
                                <div className={classes.tableText}>Role:</div>
                            </Grid>

                            <Grid item xs={3}>
                                <div className={classes.tableText}>{provider.role}</div>
                            </Grid>

                            <Grid item xs={1}>
                            <Button size="small" disabled={submitting || editFieldActive} className={classes.btn} onClick={event => this.handleClickEdit(event, 0)}>update</Button>
                            </Grid>

                            <Grid item xs={4}>
                                {showEditField[0] && !providerUpdateSuccess && <div style={{float: "right",paddingBottom: "15px"}}>
                                    <div style={{position: "relative", top: "-20px"}}>
                                        <FormSelect 
                                            name="role" 
                                            label="Role"
                                            width="270"
                                            items={roleList}
                                        />
                                    </div>
                                </div> }

                                {showEditField[0] && providerUpdateSuccess && <div style={{float: "right", color: "green", paddingTop: "10px"}}>
                                    Successfully updated!
                                </div> }
                            </Grid>
                            
                            <Grid item xs={2}>
                                {showEditField[0] &&  !providerUpdateSuccess && <span>
                                    <Button size="small" className={classes.btn} onClick={event => this.handleClickCancel(event, 1)}>Cancel</Button>
                                    <Button size="small" type="submit" disabled={submitting || pristine} className={classes.btn} >Submit</Button>
                                </span> }
                            </Grid> 

                            <Grid item xs={1}>
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

    if (values.role ) {
    errors.role = "Please enter a role!";   // message to be displayed if invalid
    }

    // If errors is empty, then form good to submit
    // If errors has any properties, redux form assumes form is invalid
    console.log("Errors: ", errors)
    return errors;

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, providerDetails }, dispatch);
}

const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        provider: state.provider.provider,
        user: state.user
    }
};

// function mapStateToProps(){
//     console.log(auth);
//     return (auth);
// }

const formData = {
    form: 'EditProviderForm', //unique identifier for this form 
    //validate,      
}

ProviderEdit = connect(mapStateToProps, mapDispatchToProps)(ProviderEdit)
ProviderEdit = reduxForm(formData)(ProviderEdit)
ProviderEdit = withStyles(styles)(ProviderEdit)
ProviderEdit = withRouter(ProviderEdit)
export default ProviderEdit;