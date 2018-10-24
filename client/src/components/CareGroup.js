import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reset, reduxForm } from 'redux-form';
import { startCase } from 'lodash'
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormSelect from './Forms/FormSelect'

import { selectConsoleTitle } from '../actions/index'
import FormTextFocused from './Forms/FormTextFocused';
// import CareGroupRemove from './CareGroupRemove'
import CareGroupAdd from './CareGroupAdd'
import CareGroupEditSuccessDialog from './Dialogs/CareGroupEditSuccessDialog';
import CareGroupEditFailedDialog from './Dialogs/CareGroupEditFailedDialog.js';
import provider_groupAPI from "../utils/provider_group.js";


const styles = theme => ({
    root: {
        padding: "20px"
    },
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
    Btn: {
        marginRight: 20,
        color: "#ffffff",
        textDecoration: "none",
        backgroundColor: "#2d404b",
        '&:hover': {
            backgroundColor: "#28353d",
        },
        hover: {},
    },
    cancelLnk: {
        textDecoration: "none",
    },
    linkBtn: {
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


class CareGroup extends Component {  
    
    componentDidMount() {
        this.props.selectConsoleTitle({title: "Manage Care Group"});

        let caregroupList = [];
        provider_groupAPI.findAll()
            .then(res => {
                console.log("res.data: ", res.data);

                res.data.map((group, index) => {
                    caregroupList.push({
                        value: index,
                        text: startCase(group.group_name),
                        caregroupId: group._id,
                        enroller: startCase(group.added_by_name),
                        date: moment(group.date_added).format("MMM Do YYYY"), 
                    })
                })
                this.setState({caregroupList: caregroupList})
                
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
        })
    };
    

    state = {
        caregroupList: [],
        caregroup: {},
        caregroupId: "",

        displayDetails: false,
        editGroup: false,
        removeGroup: false,
        addGroup: false,
        showEditField: false
    }

    submit(values) {
        console.log("Submitted values: ", values);
        this.setState({
            caregroup: this.state.caregroupList[values.caregroup]
         })
        this.handleAction(0)
    };

    editSubmit(values) {
        console.log("Submitted edit name: ", values);
        provider_groupAPI.update(this.state.caregroupId, {

        })
    }

    handleClickRemove() {
        console.log("handleClickRemove: ")

        const { provider } = this.props

        provider_groupAPI.delete(this.state.caregroupId)
        .then(res => {
            console.log("res.data: ", res.data)
            this.setState ({caregroupRemoveSuccess: true})   // update success dialog
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
            this.setState({caregroupRemoveFailed: true}); // update failed dialog
        })
        
    }

    handleClickEdit(event) {
        this.setState ({caregroupEditSuccess: false}) 
        if (this.state.editFieldActive) {
            // maybe show error message that only one field may be updated at once
        }
        this.setState({showEditField: true})
    }


    handleAction = (action) => {
        console.log("handleAction: ", action)
        let actionArray = [false,false,false,false];
        actionArray[action] = 1;
        console.log(actionArray)

        this.setState({
            displayDetails: actionArray[0],
            editGroup: actionArray[1],
            removeGroup: actionArray[2],
            addGroup: actionArray[3],
        })
    }

    handleClickCancel(event) {
        this.setState({showEditField: false})

    }

    render () {

        const { displayDetails, editGroup, removeGroup, addGroup, caregroupList, caregroup, caregroupId, showEditField, editFieldActive, caregroupEditSuccess, caregroupEditFailed, caregroupRemoveSuccess, caregroupRemoveFailed  } = this.state
        const { handleSubmit, submitting, pristine, classes } = this.props

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
                                <span>{startCase(caregroup.text)}</span>
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography variant="caption">
                                Added By: 
                            </Typography>
                            <Typography variant="subheading">
                                <span  className={classes.textBold}>Dr. {caregroup.enroller}</span>
                            </Typography> 
                        </Grid>
                        
                        <Grid item xs={4}>
                            <Typography variant="caption">
                                    Date Added
                            </Typography>
                            <Typography variant="subheading">
                                <span className={classes.textBold}>{caregroup.date}</span>
                            </Typography>
                        </Grid>

                    </Grid>

                    <br />
                    <br />
                </div>
            )
        }

        return (
            <div>
                <Card style={{padding: "20px"}}>

                    <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                        <br />
                        <Grid container spacing={24}>
                            <Grid item xs={2}>
                                Select existing care group: 
                            </Grid>

                            <Grid item xs={4}>
                                <div style={{position: "relative", top: "-15px"}}>
                                    <FormSelect 
                                        name="caregroup" 
                                        label="Care Group"
                                        items={caregroupList}
                                    /> 
                                </div>
                            </Grid>
                            <Grid item xs={1}>
                                    <Button size="small" type="submit" disabled={submitting || pristine} className={classes.submitBtn}>Submit</Button>
                                </Grid>
                            <Grid item xs={2}>
                                    <div style={{textAlign: "center", paddingTop: "10px"}}>
                                        or 
                                    </div>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to={"/admin/caregroupadd"}><Button size="small" type="enroll" className={classes.Btn}>Add a new care group</Button></Link>
                            </Grid>
                        </Grid>
                    </form>
                
                    <br />


                    { (displayDetails || editGroup || removeGroup) && <Card className={classes.root}> 

                        {displayDetails && <div>
                            
                            <Grid container spacing={24}>

                                <Grid item xs={12}>
                                    <Typography variant="title">
                                        <span>{startCase(caregroup.text)}</span>
                                    </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="caption">
                                        Added By: 
                                    </Typography>
                                    <Typography variant="subheading">
                                        <span  className={classes.textBold}>Dr. {caregroup.enroller}</span>
                                    </Typography> 
                                </Grid>
                                
                                <Grid item xs={4}>
                                    <Typography variant="caption">
                                            Date Added
                                    </Typography>
                                    <Typography variant="subheading">
                                        <span className={classes.textBold}>{caregroup.date}</span>
                                    </Typography>
                                </Grid>

                                <Grid item xs={4}></Grid>

                            </Grid>  

                        </div> }
                        
                        
                        {editGroup && <div>

                            < Header />

                            <br />
                            <hr />
                            <br />
                            <br />

                            <form autoComplete="off" onSubmit={handleSubmit(this.editSubmit.bind(this))}>

                                <Grid container spacing={24}>

                                    <Grid item xs={2}>
                                        <div className={classes.tableText}>Care Group Name:</div>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <div className={classes.tableText}>{caregroup.text}</div>
                                    </Grid>

                                    <Grid item xs={1}>
                                        <Button size="small" disabled={submitting || showEditField} className={classes.linkBtn} onClick={event => this.handleClickEdit(event)}>update</Button>
                                    </Grid>

                                    <Grid item xs={4}>
                                        {showEditField && !caregroupEditSuccess && <div style={{float: "right", paddingBottom: "15px"}}>
                                            <div style={{position: "relative", top: "-30px"}}>
                                                <FormTextFocused
                                                    name="name"
                                                    label="New care group name"
                                                    width="350"
                                                />
                                            </div>
                                        </div> }

                                        {showEditField && caregroupEditSuccess && <div style={{float: "right", color: "green", paddingTop: "10px"}}>
                                            Successfully updated!
                                        </div> }
                                    </Grid>

                                    <Grid item xs={2}>
                                        {showEditField &&  !caregroupEditSuccess && <span>
                                            <Button size="small" className={classes.linkBtn} onClick={event => this.handleClickCancel(event)}>Cancel</Button>
                                            <Button size="small" type="submit" disabled={submitting || pristine} className={classes.linkBtn} >Submit</Button>
                                        </span> }
                                    </Grid> 
                                </Grid>
                            </form>  

                            <br />
                            <br /> 

                        </div> }


                        {removeGroup && <div> 

                            <Header />

                            <br />
                            <hr />
                            <br />

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
                                            <Button size="small" className={classes.Btn} onClick={event => this.handleClickCancel(event)}>Cancel</Button>
                                            
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Button size="small" className={classes.removeBtn} >Remove</Button>
                                    </Grid>
                                    <Grid item xs={8}>
                                    </Grid>
                                </Grid>

                            <br />                   
                            <br />

                        </div> }

                    </Card> } 

                    <br />
                    <br />

                    { (displayDetails || editGroup || removeGroup) && <div styles={{float: "right"}}>
                        <Button size="small" className={classes.linkBtn}>cancel</Button>
                        <Button size="small" className={classes.linkBtn} onClick={event => this.handleAction(2)}>remove care group</Button>  
                        <Button size="small" className={classes.linkBtn} onClick={event => this.handleAction(1)}>edit care group</Button> 
                    </div> }

                </Card> 
            </div> 
        );
    }
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

// function mapStateToProps(){
//     console.log(auth);
//     return (auth);
// }

const formData = {
    form: 'CareGroupSelectForm' //unique identifier for this form 
}

CareGroup = reduxForm(formData)(CareGroup)
CareGroup = withStyles(styles)(CareGroup)
export default connect(mapStateToProps, mapDispatchToProps) (CareGroup)