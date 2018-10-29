import React, { Component } from 'react';
import { withRouter, Link, Redirect} from 'react-router-dom';
import { reset, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { defaultProps } from 'recompose';
import { bindActionCreators } from 'redux';
import { startCase } from 'lodash';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import FormTextFocused from './Forms/FormTextFocused'
import CareGroupAddSuccessDialog from './Dialogs/CareGroupAddSuccessDialog.js'
import CareGroupAddFailedDialog from './Dialogs/CareGroupAddFailedDialog.js'
import { selectConsoleTitle } from '../actions/index'
import provider_groupAPI from "../utils/provider_group.js";

let selectItems = [];

const styles = theme => ({

    submitBtn: {
        marginRight: 20,
        color: "#ffffff",
        backgroundColor: "#2d404b",
        '&:hover': {
            backgroundColor: "#28353d",
        },
        '&:disabled': {
            color: 'grey'
        },
        hover: {},
        disabled: {},
    },
    cancelBtn: {
        marginRight: 20,
        color: "#ffffff",
        textDecoration: "none",
        backgroundColor: "#c62828",
        '&:hover': {
            backgroundColor: "#871c1c",
        },
        hover: {},
    },
    cancelLnk: {
        textDecoration: "none",
    },

});    


class CareGroupAdd extends Component {

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Add a new care group"})
    };
    

    state = {
        addFailed: false,
        addSuccess: false,
        name: ""
    };


    // handle form submission
    submit(values) {
        console.log("Submitted values: ", values);
        provider_groupAPI.create({
            date_added: new Date(),
            added_by_ref: localStorage.getItem("provider_id"),
            added_by_id: localStorage.getItem("provider_id"),
            added_by_name: `${localStorage.getItem("provider_first_name")} ${localStorage.getItem("provider_last_name")}`,
            group_name: values.caregroup
        })
        .then(res => {
            console.log("res.data: ", res.data)
            this.setState({
                name: values.caregroup,
                addSuccess: true
            })
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);

            this.setState({
                addFailed: true,
                name: values.caregroup
            }); 
        })
    };


    render() {

        const { handleSubmit, classes, pristine, submitting } = this.props;
        const { name, addSuccess, addFailed } = this.state;

        return (

            <div>
            
                {addSuccess && <CareGroupAddSuccessDialog name={name} />}

                {addFailed && <CareGroupAddFailedDialog name={name} />}

                <Card style={{padding: "20px", maxWidth: "1280px"}}>

                    <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>

                         <Grid container spacing={24}>
                            <Grid item xs={5}>
                                <FormTextFocused
                                    name="caregroup"
                                    label="New Care Group"
                                    width="350"
                                />
                            </Grid>
                            <Grid item xs={3}>
                            <br />
                            <div style={{position: "relative", top: "10px"}}>
                                <Typography variant="caption" >
                                        Added by:
                                    </Typography>
                                    <Typography variant="subheading">
                                        <span  className={classes.textBold} >{localStorage.getItem("provider_first_name")} {localStorage.getItem("provider_last_name")}</span>
                                </Typography >
                            </div>
                            </Grid>
                            <Grid item xs={2}>
                            <br />
                                <div style={{position: "relative", top: "10px"}}>
                                    <Typography variant="caption" >
                                            Date added:
                                        </Typography>
                                        <Typography variant="subheading">
                                            <span  className={classes.textBold}>{moment().format("MMM Do YYYY")}</span>
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>

                        <br />
                        <br />

                        <Grid container spacing={24} >
                            <Grid item xs={4}>
                                <Button type="submit" size="small"  disabled={submitting || pristine} className={classes.submitBtn}>submit</Button>
                                <Link to='/admin/caregroup' className={classes.cancelLnk}><Button size="small" className={classes.cancelBtn}>cancel</Button></Link>
                            </Grid>
                            <Grid item xs={8}></Grid>
                        </Grid>

                    </form>

                </Card>
            </div>
        );
    };

};


function validate(values) {
    console.log("Error values: ", values) // -> { object containing all values of form entries } 
    const errors = {};

    // validate inputs from 'values'
    
    if (!values.name) {
        errors.name = "Please enter a valid care group name!";   // message to be displayed if invalid
    }

    // If errors is empty, then form good to submit
    // If errors has any properties, redux form assumes form is invalid
    console.log("Errors: ", errors)
    return errors;

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, }, dispatch);
}

const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        user: state.user
    }
};


const formData = {
        form: 'CareGroupAddForm', //unique identifier for this form 
        validate,      
}

CareGroupAdd = reduxForm(formData)(CareGroupAdd)
CareGroupAdd = withRouter(CareGroupAdd)
CareGroupAdd = withStyles(styles)(CareGroupAdd)
CareGroupAdd = connect(mapStateToProps, mapDispatchToProps)(CareGroupAdd)
export default CareGroupAdd