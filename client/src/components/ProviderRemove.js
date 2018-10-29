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

import { selectConsoleTitle, providerDetails } from '../actions/index'
import provider_groupAPI from "../utils/provider_group.js"
import providerAPI from "../utils/provider.js";
import RemoveProviderSuccessDialog from './Dialogs/RemoveProviderSuccessDialog';
import RemoveProviderFailedDialog from './Dialogs/RemoveProviderFailedDialog.js';

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
    removeBtn: {
        borderRadius: "5px",
        padding: "5px",
        marginTop: "10px",
        marginLeft: "20px",
        float: "right",
        color: "#ffffff",
        textDecoration: "none",
        backgroundColor: "#c62828",
        '&:hover': {
            backgroundColor: "#871c1c",
        },
        hover: {},
    },
})

class ProviderRemove extends Component {  

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Remove provider"});
    }

    state = {
        providerRemoveSuccess: false,
        providerRemoveFailed: false,
    }

    handleClickRemove() {
        console.log("handleClickRemove: ")
        const { provider } = this.props
        providerAPI.delete(provider._id)
        .then(res => {
            console.log("res.data: ", res.data)
            this.setState ({providerRemoveSuccess: true})   // update success dialog
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
            this.setState({providerRemoveFailed: true}); // update failed dialog
        })
    }

    handleBack(event) {
        this.props.handleAction(1)
    }


    render () {
        
        const { submitting, pristine, provider, handleSubmit, classes } = this.props
        const { providerRemoveFailed, providerRemoveSuccess} = this.state

        return (

            <div>

                {providerRemoveSuccess && <RemoveProviderSuccessDialog providerName={`Dr. ${startCase(provider.firstname)} ${startCase(provider.lastname)}`} />}

                {providerRemoveFailed && <removeProviderFailedDialog />} 

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
                            <Button size="small" className={classes.btn} onClick={event => this.handleBack(event)}>Back</Button>
                        </Grid>

                    </Grid>

                    <br />
                    <hr />
                    <br />

                    <Typography variant="subheading">
                        <p>Select 'Remove' to remove this provider from the list of providers held in the application. 'Cancel' to cancel.</p>
                        <p>Note, this action cannot be undone. Removed providers can be added back by re-entering all their details via the 'new provider' page</p>
                    </Typography>

                    <br />
                    <br />


                        <Grid container spacing={24}>
                            <Grid item xs={2}>
                                <div className={classes.tableText}>Remove provider:</div>
                            </Grid>
                            <Grid item xs={1}>
                                    <Button size="small" className={classes.btn} onClick={event => this.handleBack(event)}>Cancel</Button>
                                    
                            </Grid>
                            <Grid item xs={1}>
                                <Button size="small" className={classes.removeBtn} >Remove</Button>
                            </Grid>
                            <Grid item xs={8}>
                            </Grid>
                        </Grid>

                    <br />                   
                    <br />

                </Card>
            </div>
        );
    }
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

ProviderRemove = withStyles(styles)(ProviderRemove)
ProviderRemove = connect(mapStateToProps, mapDispatchToProps)(ProviderRemove)
export default ProviderRemove;