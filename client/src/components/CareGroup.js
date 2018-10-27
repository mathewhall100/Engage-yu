import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
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

import FormTextFocused from './Forms/FormTextFocused';
import FormSelect from './Forms/FormSelect';
import CareGroupDetails from './CareGroupDetails';
import CareGroupAdd from './CareGroupAdd';
import CareGroupEdit from './CareGroupEdit';
import CareGroupRemove from './CareGroupRemove';
import { selectConsoleTitle } from '../actions/index';
import providerAPI from "../utils/provider.js";
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
});


class CareGroup extends Component {  
    
    componentDidMount() {
        this.props.selectConsoleTitle({title: "Manage Care Group"});

        let careGroupList = [];
        provider_groupAPI.findAll()
            .then(res => {
                console.log("res.data: ", res.data);

                res.data.map((group, index) => {
                    careGroupList.push({
                        value: index,
                        text: startCase(group.group_name),
                        name: startCase(group.group_name),
                        id: group._id,
                        enroller: startCase(group.added_by_name),
                        date: moment(group.date_added).format("MMM Do YYYY"), 
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
        careGroup: {},
        caregroupId: "",
        providerList: [],

        displayDetails: false,
        editGroup: false,
        removeGroup: false,
        addGroup: false,
    }

    submit(values) {
        console.log("Submitted values: ", values);
        let careGroup = {};
        careGroup = this.state.careGroupList[values.caregroup]
        this.setState({
            careGroup: careGroup,
            careGroupId: careGroup.id,
         })
        this.handleAction(0)
    };

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
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleClickCancel(event) {
        this.setState({showEditField: false})
    };


    render () {

        const { displayDetails, editGroup, removeGroup, addGroup, careGroupList, careGroup, careGroupId } = this.state
        const { handleSubmit, submitting, pristine, classes } = this.props

        return (

            <div>
                <Card style={{padding: "20px"}}>

                    <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                        <br />
                        <Grid container spacing={24}>
                            <Grid item xs={2}>
                                Select care group: 
                            </Grid>

                            <Grid item xs={4}>
                                <div style={{position: "relative", top: "-15px"}}>
                                    <FormSelect 
                                        name="caregroup" 
                                        label="Care Group"
                                        items={careGroupList}
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

                    { displayDetails && <CareGroupDetails careGroupId={careGroupId} handleAction={this.handleAction}/> }

                    { editGroup && <CareGroupEdit handleAction={this.handleAction}/> }

                    { removeGroup && <CareGroupRemove careGroupId={careGroupId} handleAction={this.handleAction}/> }

                    { addGroup && <CareGroupAdd handleAction={this.handleAction}/> }


                </Card> 
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
CareGroup = connect(mapStateToProps, mapDispatchToProps)(CareGroup)
export default CareGroup