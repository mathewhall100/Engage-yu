import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startCase } from 'lodash';
import moment from 'moment';
import { withStyles, Typography, Card, Grid } from '@material-ui/core';
import TableGeneric from '../UI/Tables/tableGeneric';
import BtnSmall from '../UI/Buttons/btnSmall';
import BtnHandleGroup from '../UI/Buttons/btnHandleGroup';
import HrStyled from '../UI/hrStyled';
import Callback from '../UI/callback';
import providerAPI from "../../utils/provider.js";
import provider_groupAPI from "../../utils/provider_group.js";
import  { careGroupAction } from '../../actions/index';

const styles = () => ({
    root: {
        padding: "20px 20px 20px 40px",
        marginBottom: "10px"
    },
    fwMedium: {
        fontWeight: 500,
    },
});


class CareGroupDetails extends Component {  
    
    componentDidMount() {
        //console.log("CDM, CareGroupId: ", this.props.careGroupId)
        provider_groupAPI.findById(this.props.careGroupId)
        .then(res => {
            console.log("res.data: ", res.data);
            this.props.careGroupAction(res.data);
            this.fetchProvidersByGroup(this.props.careGroupId);
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
        })
    }

    state = {
        providerList: [],
    };

    fetchProvidersByGroup(careGroupId) {
        let providerList = [];
        providerAPI.findAllByGroup(careGroupId)
            .then(res => {
                console.log("res.data: ", res.data);
                res.data.providerList.map(provider => {
                    return (
                        providerList.push({
                            name: `Dr. ${startCase(provider.firstname)} ${startCase(provider.lastname)}`,
                            role: provider.role,
                            office: provider.office.name,
                        })
                    )
                })
                this.setState({providerList: providerList})
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
        })
    }

    // Event handlers
    handleAction = (btn) => {
        switch(btn) {
            case "close":
                this.props.handleClose();
                break;
            case "remove care group":
                this.props.history.push({
                    pathname: '/admin/caregroup/remove',
                    state: {careGroupId: this.props.careGroup._id}
                });
                break;
            case "edit care group":
                this.props.history.push({
                    pathname: '/admin/caregroup/update',
                    state: {careGroupId: this.props.careGroup._id}
                });
                break;
            default: return null
        };
    }

    handleShowProviders = () => {
        /// console.log("handleShowProviders")
        this.setState({showProviders: this.state.showProviders ? false : true});
    }


    render () {
        const { classes, careGroup} = this.props;
        const { showProviders, providerList} = this.state;

        const infoH = (careGroup) => [
            {grid: 3, caption: "Added by", info: `Dr. ${startCase(careGroup.added_by_name)}`},
            {grid: 2, caption: "Date added", info: moment(careGroup.date_added).format("MMM Do YYYY")},
            {grid: 7, caption: "Providers", info: `Currently ${this.state.providerList.length} providers in this care group`}
        ];
        const btns = [
            {btn: "remove care group", icon: "" },
            {btn: "edit care group", icon: "" },
        ];

        return (
            <Card className={classes.root}> 

                {careGroup ? 
                    <React.Fragment>

                        <Grid container spacing={24}>
                            <Grid item xs={6}>
                                <Typography variant="caption">Care group</Typography>
                                <Typography variant="h6" >{startCase(careGroup.group_name)}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align="right" style={{marginTop: "16px"}}>
                                    <BtnHandleGroup 
                                        btns={[{btn: "close"}]} 
                                        _id={""}
                                        handleActionBtns={this.handleAction}
                                    />
                                </Typography>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={24}>
                            {infoH(careGroup).map((info, idx) => {
                                return (
                                    <Grid item xs={info.grid} key={idx}>
                                        <Typography variant="caption">{info.caption}</Typography>
                                        <Typography variant="subtitle1" className={classes.fwMedium}>{info.info}</Typography> 
                                    </Grid>
                                )
                            }) }
                        </Grid>

                        <br />

                        {providerList.length ?
                            <Grid container spacing={24}>
                                <Grid item xs={5}>
                                    <br />
                                    <Typography inline>Show list of providers in this care group? </Typography>
                                    <BtnSmall 
                                        type="button" 
                                        disabled={false} 
                                        index={0} 
                                        text={showProviders ? "Hide" : "Show"}
                                        handleBtn={this.handleShowProviders}
                                    /> 
                                </Grid>
                                <Grid item xs={7} style={{paddingTop: "20px"}}>
                                    { showProviders && 
                                        <TableGeneric 
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

                        <br /> <HrStyled /> <br />    
                       
                        <BtnHandleGroup 
                            btns={btns} 
                            _id={careGroup._id}
                            handleActionBtns={this.handleAction}
                        />   

                    </React.Fragment>
                    : 
                    <Callback /> 
                }

            </Card>  
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ careGroupAction }, dispatch);
};

const mapStateToProps = (state) => {
    //console.log("State : ", state);
    return {
        careGroup: state.careGroup,
        user: state.user
    }
}

CareGroupDetails = withRouter(CareGroupDetails);
CareGroupDetails = withStyles(styles)(CareGroupDetails);
CareGroupDetails = connect(mapStateToProps, mapDispatchToProps)(CareGroupDetails);
export default connect(null, mapDispatchToProps) (CareGroupDetails);