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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';

import Callback from './Callback';
import  { careGroup } from '../actions/index';
import { selectConsoleTitle } from '../actions/index';
import providerAPI from "../utils/provider.js";
import provider_groupAPI from "../utils/provider_group.js";


const styles = theme => ({
    root: {
        padding: "20px"
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
    btnLeft: {
        backgroundColor: "#eeeeee",
        textDecoration: "none",
        borderRadius: "5px",
        padding: "5px",
        marginLeft: "20px",
        '&:hover': {
            backgroundColor: "#dddddd",
        },
        '&:disabled': {
            color: 'grey'
        },
        hover: {},
        disabled: {},
    },
});

const CustomTableCell = withStyles(theme => ({
    body: {
      padding: '5px',
      fontSize: 14,
    },
  }))(TableCell);


class CareGroupDetails extends Component {  
    
    componentDidMount() {
        provider_groupAPI.findById(this.props.careGroupId)
            .then(res => {
                console.log("res.data: ", res.data);
                this.props.careGroup({careGroup: res.data});
                this.setState({careGroup: res.data})
                this.fetchProvidersByGroup(this.props.careGroupId)
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
        })
    };

    componentWillReceiveProps(nextProps) {
        provider_groupAPI.findById(nextProps.careGroupId)
            .then(res => {
                console.log("res.data: ", res.data);
                this.props.careGroup({careGroup: res.data});
                this.setState({careGroup: res.data})
                this.fetchProvidersByGroup(nextProps.careGroupId)
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
        })
    };


    state = {
        providerList: [],
        careGroup: null,
        page: 0,
        rowsPerPage: 5,
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

    // Event handlers

    handleAction(action) {
        console.log("clickAction clicked")
        this.props.handleAction(action)
    }

    handleShowProviders = () => {
        console.log("handleShowProviders")
        this.setState({showProviders: this.state.showProviders ? false : true})
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleCancel(event) {
        this.setState({showEditField: false})
    };


    render () {

        const { careGroup, careGroupList, showProviders, providerList, rowsPerPage, page } = this.state
        const { classes } = this.props

        return (

            <div>

                <Card className={classes.root}> 

                    { careGroup === null && < Callback /> }

                    { careGroup && <div>

                        <br  />
                        {console.log("caregroup: ", careGroup)}
                        <Grid container spacing={24}>

                            <Grid item xs={12}>
                                <Typography variant="title">
                                    <span className={classes.textBold}>{startCase(careGroup.group_name)}</span>
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
                            <Grid item xs={6}></Grid>

                            <Grid item xs={12}></Grid>

                            <Grid item xs={4}>
                                {providerList.length ? 
                                    <span>
                                        N<sup>o</sup> providers in this care group: <span style={{fontWeight: "bold"}}>{this.state.providerList.length}</span>
                                    </span>
                                : <span>There are currently no providers in this care group.</span> }

                            </Grid>
                            <Grid item xs={8}>
                                {providerList.length ?  
                                    <div>
                                        <span>Show list of providers in this care group? </span>
                                        {showProviders ? 
                                            <Button size="small" className={classes.btnLeft} onClick={event => this.handleShowProviders()}>Hide</Button>
                                        :
                                            <Button size="small" className={classes.btnLeft} onClick={event => this.handleShowProviders()}>Show</Button>
                                        }
                                    </div> 
                                :
                                    null
                                }

                                <br /> 

                                {showProviders && <div> 
                                    {console.log("PL: ", careGroupList)}
                                    <Table>
                                        <TableBody>
                                        {providerList
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((provider, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <CustomTableCell>{provider.name}</CustomTableCell>
                                                        <CustomTableCell>{provider.role}</CustomTableCell>
                                                        <CustomTableCell>{provider.office}</CustomTableCell>
                                                    </TableRow>
                                                )
                                            }) }
                                        </TableBody>
                                    </Table>

                                        {providerList.length > 0 && <TablePagination
                                        component="div"
                                        count={providerList.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        backIconButtonProps={{
                                            'aria-label': 'Previous Page',
                                        }}
                                        nextIconButtonProps={{
                                            'aria-label': 'Next Page',
                                        }}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    /> }
                                </div> }
                            
                            </Grid>
                        </Grid>  
                    </div> }
 
                </Card>  

                <br />
                <br />

                <div styles={{float: "right"}}>
                    <Button size="small" className={classes.btn} onClick={event => this.handleCancel()}>cancel</Button>
                    <Button size="small" className={classes.btn} onClick={event => this.handleAction(2)}>remove care group</Button>  
                    <Button size="small" className={classes.btn} onClick={event => this.handleAction(1)}>edit care group</Button> 
                </div> 

            </div> 
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ careGroup }, dispatch);
}

const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        user: state.user
    }
};

const formData = {
    form: 'CareGroupSelectForm' //unique identifier for this form 
}

CareGroupDetails = withStyles(styles)(CareGroupDetails)
export default connect(mapStateToProps, mapDispatchToProps) (CareGroupDetails)