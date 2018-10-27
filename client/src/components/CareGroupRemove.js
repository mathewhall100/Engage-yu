import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startCase } from 'lodash';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { selectConsoleTitle, careGroup } from '../actions/index'
import CareGroupRemoveSuccessDialog from './Dialogs/CareGroupRemoveSuccessDialog';
import CareGroupRemoveFailedDialog from './Dialogs/CareGroupRemoveFailedDialog.js';
import providerAPI from '../utils/provider.js';
import provider_groupAPI from "../utils/provider_group.js";


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
    },
    removeBtn: {
        borderRadius: "5px",
        padding: "5px",
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

});


class CareGroupRemove extends Component {  
    
    componentDidMount() {
        this.props.selectConsoleTitle({title: "Remove Care Group"});
        this.fetchProvidersByGroup(this.props.careGroup._id)
    }


    state = {
       careGroupRemoveSuccess: false,
       careGroupRemoveFailed: false,
       providerList: []
    }

    fetchProvidersByGroup(id) {
        let providerList = [];
        providerAPI.findAllByGroup(id)
            .then(res => {
                console.log("res.data: ", res.data);

                res.data.providerList.map((provider, index) => {
                    providerList.push({
                        name: `Dr. ${startCase(provider.firstname)} ${startCase(provider.lastname)}`,
                        office: provider.office.name,
                        role: provider.role
                    })
                })
                this.setState({providerList: providerList})
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
        })
    };

    handleRemove() {
        console.log("handleRemove: ", this.props.careGroup._id)
        const { careGroup } = this.props
        provider_groupAPI.remove(careGroup._id)
        .then(res => {
            console.log("res.data: ", res.data)
            this.setState ({careGroupRemoveSuccess: true})   // update success dialog
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
            this.setState({careGroupRemoveFailed: true}); // update failed dialog
        })
    }

    handleCancel(event) {
        this.setState({showEditField: false})
    };

    handleBack(event) {
        this.props.handleAction(0)
    }


    render () {

        const { careGroupRemoveSuccess, careGroupRemoveFailed, providerList } = this.state
        const { handleSubmit, submitting, pristine, classes, careGroup } = this.props

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
                            <Button size="small" className={classes.btn} onClick={event => this.handleBack(event)}>Back</Button>
                        </Grid>

                    </Grid>

                    <br />
                    <br />
                </div>
            )
        }

        return (

            <div>

                {careGroupRemoveSuccess && <CareGroupRemoveSuccessDialog name={careGroup.group_name} /> }

                {careGroupRemoveFailed && <CareGroupRemoveFailedDialog name={careGroup.group_name} />} 

                    <Card className={classes.root}>

                    <Header />

                    <br />
                    <hr />
                    <br />

                    {providerList.length > 0 ? 

                        <Typography variant="subheading">
                            <p>There are still {providerList.length} providers in this care group. </p>
                            <p style={{color: "red"}}>You cannot delete a care group with active providers. Please use the manage provider menu  to transfer all remaining providers to other care groups and then you can remove this care group from the application. </p>
                        </Typography>
                    :
                        <div>
                            <Typography variant="subheading">
                                <p>Select 'Remove' to remove this caregroup from the list of caregroups held in the application. 'Cancel' to cancel.</p>
                                <p style={{color: "red"}}>Note, this action cannot be undone. Removed care groups can be re-added to the application by re-entering their details via the add care group page but all individual providers will need re-allocating to the newly added care group. </p>
                            </Typography> 
                    
                            <br />
                            <br />

                            <Grid container spacing={24}>
                                <Grid item xs={2}>
                                    <div className={classes.tableText}>Remove provider:</div>
                                </Grid>
                                <Grid item xs={1}>
                                        <Button size="small" className={classes.btn} onClick={event => this.handleCancel(event)}>Cancel</Button>
                                        
                                </Grid>
                                <Grid item xs={1}>
                                    <Button size="small" className={classes.removeBtn} onClick={event => this.handleRemove(event)}>Remove</Button>
                                </Grid>
                                <Grid item xs={8}>
                                </Grid>
                            </Grid>

                            <br />                   
                            <br />
                        </div> 
                    }

                </Card> 

                <br />
                <br />

            </div>

        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle }, dispatch);
}

const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        careGroup: state.careGroup.careGroup,
        user: state.user
    }
};

CareGroupRemove = withStyles(styles)(CareGroupRemove)
CareGroupRemove = connect(mapStateToProps, mapDispatchToProps)(CareGroupRemove)
export default CareGroupRemove