import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { startCase } from 'lodash';
import moment from 'moment';
import { withStyles, Typography, Card, Grid } from '@material-ui/core';
import TableGeneric from '../UI/Tables/tableGeneric';
import BtnSmall from '../UI/Buttons/btnSmall';
import BtnGroup from '../UI/Buttons/btnGroup';
import HrStyled from '../UI/hrStyled';
import BtnCloseIcon from '../UI/Buttons/btnCloseIcon';
import CallBack from '../UI/callback';
import providerAPI from "../../utils/provider.js";
import  { loadCareGroup, loadProvider } from '../../actions';
import ProviderName from '../UI/providerName';

const styles = () => ({
    root: {
        padding: "20px 20px 20px 40px",
        marginBottom: "10px"
    },
    fwMedium: {
        fontWeight: 500,
    },
});


class CareGroupDisplay extends Component {  
    
    componentDidMount() {
        this.props.dispatch(loadCareGroup(this.props.careGroupId))
        this.loadProvidersByGroup(this.props.careGroupId)
    }

    state = {
        providerList: [],
    };

    loadProvidersByGroup(careGroupId) {
        let providerList = [];
        providerAPI.findAllByGroup(careGroupId)
            .then(res => {
                console.log("res.data: ", res.data);
                res.data.map(provider => {
                    return (
                        providerList.push({
                            id: provider._id,
                            name: <ProviderName title={provider.title} firstname={provider.firstname} lastname={provider.lastname} />,
                            role: provider.provider_role.role,
                            office: provider.office.name,
                        })
                    )
                })
                return this.setState({providerList: providerList})
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
        })
    }

    // Event handlers
    handleAction = (btn) => {
        switch(btn) {
            case "remove care group":
                return this.props.history.push({
                    pathname: '/admin/caregroup/remove',
                    state: {careGroupId: this.props.careGroup._id}
                });
            case "edit care group":
                return this.props.history.push({
                    pathname: '/admin/caregroup/update',
                    state: {careGroupId: this.props.careGroup._id}
                });
            default: return null
        }
    }

    handleShowProviders = () => {
        this.setState({showProviders: this.state.showProviders ? false : true});
    }

    handleActionClick = (btn, id) => {
        console.log("care group display btn click: ", btn, " : ", id)
        this.props.dispatch(loadProvider(id));
        return this.props.history.push({
            pathname: '/admin/caregroup/reassign',
        });
    }

    // Event handlers
    handleRowClick = (row) => {
        console.log("care group display row click: ", row.id)
    }

    handleClose = () => {
        this.props.handleClose();
    }


    render () {
        const { classes, careGroup, error, loading} = this.props;
        const { showProviders, providerList} = this.state;

        const infoH = (careGroup) => [
            {grid: 3, caption: "Added by", info: <ProviderName title={careGroup.added_by.title} firstname={careGroup.added_by.firstname} lastname={careGroup.added_by.lastname} />} ,
            {grid: 2, caption: "Date added", info: moment(careGroup.date_added).format("MMM Do YYYY")},
            {grid: 7, caption: "Providers", info: `Currently ${this.state.providerList.length} providers in this care group`}
        ];
        const btns = [
            {btn: "remove care group", type: "button", icon: "",  },
            {btn: "edit care group", type: "button", icon: "" },
        ];

        if (error) {
            return <div>Error! {error.message}</div>
        }

        if (loading || !careGroup._id ) {
            return <CallBack />
        }

        return (
            <Card className={classes.root}> 

                <Typography variant="caption" inline>Care group</Typography>
                <BtnCloseIcon handleBtnClick={this.handleClose} />
                <Typography variant="h6" >{startCase(careGroup.group_name)}</Typography>
   
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
                                    lastCellRightAlign={true}
                                    lastCellHeading={"Actions"}
                                    lastCellData={["reassign"]}
                                    handleActionClick = {this.handleActionClick}
                                    handleRowClick = {this.handleRowClick}
                                    hover={true}
                                /> 
                            }
                            <br />
                        </Grid>
                    </Grid>
                    : 
                    null
                }

                <br /> <HrStyled /> <br />    
                
                <BtnGroup 
                    btns={btns} 
                    _id={careGroup._id}
                    handleBtns={this.handleAction}
                />   

            </Card>  
        );
    }
}

const mapStateToProps = (state) => {
    //console.log("State : ", state);
    return {
        careGroup: state.careGroup.careGroup,
        loading: state.careGroup.loading,
        error: state.careGroup.error,
        user: state.user
    }
}

CareGroupDisplay = withRouter(CareGroupDisplay);
CareGroupDisplay = withStyles(styles)(CareGroupDisplay);
CareGroupDisplay = connect(mapStateToProps)(CareGroupDisplay);
export default CareGroupDisplay;