import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startCase } from 'lodash';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import GenericTable from '../Tables/GenericTable'
import SmallBtn from '../Buttons/smallBtn'
import HandleBtns from '../Buttons/handleBtns'
import HrStyled from '../commons/hrStyled'
import Callback from '../Callback';
import providerAPI from "../../utils/provider.js";
import provider_groupAPI from "../../utils/provider_group.js";
import  { careGroupAction } from '../../actions/index';

const styles = () => ({
    root: {
        padding: "20px",
        marginBottom: "20px"
    },
    textBold: {
        fontWeight: "bold",
    },
});


class CareGroupDetails extends Component {  
    
    componentDidMount() {
        //console.log("CDM, CareGroupId: ", this.props.careGroupId)
        provider_groupAPI.findById(this.props.careGroupId)
        .then(res => {
            console.log("res.data: ", res.data);
            this.props.careGroupAction(res.data);
            this.fetchProvidersByGroup(this.props.careGroupId)
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
        })
    };


    state = {
        providerList: [],
    }

    fetchProvidersByGroup(careGroupId) {
        let providerList = [];
        providerAPI.findAllByGroup(careGroupId)
            .then(res => {
                console.log("res.data: ", res.data);
                res.data.providerList.map(provider => {
                    providerList.push({
                        name: `Dr. ${startCase(provider.firstname)} ${startCase(provider.lastname)}`,
                        role: provider.role,
                        office: provider.office.name,
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
    handleAction = (action) => {
        switch(action) {
            case "remove care group":
                this.props.history.push({
                    pathname: '/admin/caregroup/remove',
                    state: {careGroupId: this.props.careGroup._id}
                })
                break;
            case "edit care group":
                this.props.history.push({
                    pathname: '/admin/caregroup/update',
                    state: {careGroupId: this.props.careGroup._id}
                })
                break;
            default: null
        }
    }

    handleShowProviders = () => {
        /// console.log("handleShowProviders")
        this.setState({showProviders: this.state.showProviders ? false : true})
    };


    render () {

        const { showProviders, providerList} = this.state
        const { classes, careGroup} = this.props

        return (
            <Card className={classes.root}> 

                { careGroup ? 
                    <React.Fragment>
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <Typography variant="title" className={classes.textBold}>{startCase(careGroup.group_name)}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="caption">Added By:</Typography>
                                <Typography variant="subheading" className={classes.textBold}>Dr. {startCase(careGroup.added_by_name)} </Typography> 
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="caption">Date Added</Typography>
                                <Typography variant="subheading" className={classes.textBold}>{moment(careGroup.date_added).format("MMM Do YYYY")}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="caption"> Providers</Typography>
                                <Typography variant="subheading" className={classes.textBold}>Currently {this.state.providerList.length} providers in this care group</Typography>
                            </Grid>
                        </Grid>

                        <br />

                        {providerList.length ?
                            <Grid container spacing={24}>
                                <Grid item xs={5}>
                                    <br />
                                    <Typography inline>Show list of providers in this care group? </Typography>
                                    <SmallBtn 
                                        type="button" 
                                        disabled={false} 
                                        index={0} 
                                        text={showProviders ? "Hide" : "Show"}
                                        handleBtn={this.handleShowProviders}
                                    /> 
                                </Grid>
                                <Grid item xs={7} style={{paddingTop: "20px"}}>
                                    { showProviders && 
                                        <GenericTable 
                                            tableHeadings={["name", "role", "office"]}
                                            tableData={providerList}
                                        /> 
                                    }
                                    <br />
                                </Grid>
                            </Grid>
                            : 
                            null
                        }

                        <br />        
                        <HrStyled />
                        <br />

                        <HandleBtns 
                            btns={["remove care group", "edit care group"]} 
                            _id={careGroup._id}
                            handleActionBtns={this.handleAction}
                        />   

                    </React.Fragment>

                    : <Callback /> 
                }

            </Card>  
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ careGroupAction }, dispatch);
}
const mapStateToProps = (state) => {
    //console.log("State : ", state);
    return {
        careGroup: state.careGroup,
        user: state.user
    }
};

CareGroupDetails = withRouter(CareGroupDetails)
CareGroupDetails = withStyles(styles)(CareGroupDetails)
CareGroupDetails = connect(mapStateToProps, mapDispatchToProps)(CareGroupDetails)
export default connect(null, mapDispatchToProps) (CareGroupDetails)