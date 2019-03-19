import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startCase } from 'lodash';
import moment from 'moment';
import { withStyles, Card, Grid, Typography } from '@material-ui/core';
import BtnHandleGroup from '../UI/Buttons/btnHandleGroup'
import HrStyled from '../UI/hrStyled'
import Callback from '../UI/callback'
import { providerAction } from '../../actions/index'
import providerAPI from "../../utils/provider.js";

const styles = theme => ({
    root: {
        padding: "20px 40px",
        marginBottom: "10px"
    },
    fwMedium: {
        fontWeight: 500
      },
})

class ProviderDetails extends Component {  
   
    componentDidMount() {
        providerAPI.findById(this.props.providerId)
            .then(res => {
                console.log("res.data: ", res.data);
                this.props.providerAction(res.data);
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
        })
    }

    // Event handlers
    handleAction = (btn) => {
        console.log("handleAction: ", btn)
        switch(btn) {
            case "close":
                this.props.handleClose()
                break;
            case "remove provider":
                this.props.history.push({
                    pathname: '/admin/provider/remove',
                    state: {providerId: this.props.provider._id}
                })
                break;
            case "edit details":
                this.props.history.push({
                    pathname: '/admin/provider/update',
                    state: {providerId: this.props.provider._id}
                })
                break;
            case "reassign care group":
                this.props.history.push({
                    pathname: '/admin/provider/updategroup',
                    state: {providerId: this.props.provider._id}
                })
                break;
            default: return null
        }
    }


    render () {
        
        const { classes, provider } = this.props
        const infoH = (provider) => [
            {caption: "Role", info: provider.role},
            {caption: "Care Group", info: startCase(provider.provider_group_name)},
            {caption: "Added", info: moment(provider.date_added).format("MMM Do YYYY")}
        ];
        const btns = [
           {btn: "remove provider", icon: "" },
           {btn: "reassign care group", icon: "" },
           {btn: "edit details", icon: "" },
       ]; 

        return (
            <Card className={classes.root}>

                {provider ?
                    <React.Fragment>
                        <Grid container spacing={24}>
                            <Grid item xs={6}>
                                <Typography variant="caption">Provider name</Typography>
                                <Typography variant="h6">Dr. {startCase(provider.firstname)} {startCase(provider.lastname)}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align="right" style={{marginTop: "16px"}}>
                                    <BtnHandleGroup 
                                        btns={[{btn: "close", icon: ""}]} 
                                        _id={""}
                                        handleActionBtns={this.handleAction}
                                    />
                                </Typography>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={24}>
                            {infoH(provider).map((info, idx) => {
                                return (
                                    <Grid item xs={4} key={idx}>
                                        <Typography variant="caption">{info.caption}</Typography>
                                        <Typography variant="subtitle1" className={classes.fwMedium}>{info.info}</Typography> 
                                    </Grid>
                                )
                            }) }
                        </Grid>
                           
                        <br />

                        <Grid container spacing={24}>
                            <Grid item xs={2}>
                                <Typography variant="subtitle1" gutterBottom>Email:</Typography>
                                <Typography variant="subtitle1">Phone:</Typography>
                                <Typography variant="subtitle1" style={{marginTop: "52px"}}>Office:</Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="subtitle1" className={classes.fwMedium} gutterBottom>{provider.email}</Typography>
                                <table>
                                    <tbody>
                                        {provider.phone.map((phone, index) => {
                                            return (
                                            <tr key={index} >
                                                <td style={{width: "200px"}}>
                                                    <Typography variant="subtitle1" className={classes.fwMedium} style={{lineHeight: "20px"}}>{phone.number}{phone.ext && <span> ext. {phone.ext}</span>}</Typography>
                                                </td>
                                                <td style={{width: "100px"}}>
                                                    {phone.number && <Typography variant="subtitle1" className={classes.fwMedium} style={{lineHeight: "20px"}}>({phone.phone})</Typography>}
                                                </td>
                                            </tr>
                                            )
                                        }) }
                                    </tbody>
                                </table>
                                <Typography variant="subtitle1" className={classes.fwMedium} style={{marginTop: "8px", lineHeight: "24px"}}>{startCase(provider.office.name)}</Typography>
                                <Typography variant="subtitle1" className={classes.fwMedium} style={{lineHeight: "24px"}}>{startCase(provider.office.street)}</Typography> 
                                <Typography variant="subtitle1" className={classes.fwMedium} style={{lineHeight: "24px"}}>{startCase(provider.office.city)}</Typography> 
                                <Typography variant="subtitle1" className={classes.fwMedium} style={{lineHeight: "24px"}}>{startCase(provider.office.state)}</Typography>
                                <Typography variant="subtitle1" className={classes.fwMedium} style={{lineHeight: "24px"}}>{startCase(provider.office.zip)}</Typography>
                            </Grid>
                        </Grid>

                        <br />

                        {/* <Grid container spacing={24}>
                            <Grid item xs={4}>
                                <Typography variant="subheading">
                                    <div>Primary provider to: </div>
                                    <div>N<sup>o</sup> diary cards created: </div>
                                    <div>N<sup>o</sup> diary cards reviewed: </div>
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="subheading">
                                    <div>{this.findNumPatients()}</div>
                                    <div>{this.findNumDiaryCreated()}</div>
                                    <div>{this.findNumDiaryReviewed()}</div> 
                                    <div></div>
                                </Typography>
                            </Grid>
                        </Grid> */}

                        <br />        
                        <HrStyled />
                        <br />

                        <BtnHandleGroup 
                            btns={btns} 
                            _id={provider._id}
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
    return bindActionCreators({ providerAction }, dispatch);
}

const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        provider: state.provider,
    }
};

ProviderDetails = withRouter(ProviderDetails)
ProviderDetails = connect(mapStateToProps, mapDispatchToProps)(ProviderDetails)
ProviderDetails = withStyles(styles)(ProviderDetails)
export default ProviderDetails;