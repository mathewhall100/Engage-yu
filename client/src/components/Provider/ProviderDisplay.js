import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { startCase } from 'lodash';
import moment from 'moment';
import { withStyles, Card, Grid, Typography } from '@material-ui/core';
import BtnGroup from '../UI/Buttons/btnGroup'
import BtnCloseIcon from '../UI/Buttons/btnCloseIcon';
import HrStyled from '../UI/hrStyled'
import CallBack from '../UI/callback'
import { loadProvider } from '../../actions/ProviderAction';


const styles = () => ({
    root: {
        padding: "20px 40px",
        marginBottom: "10px"
    },
    fwMedium: {
        fontWeight: 500
      },
})

class ProviderDisplay extends Component {  
   
    componentDidMount() {
         // Load selected provider and save to redux store
        this.props.dispatch(loadProvider(this.props.providerId));
    }

    // Event handlers
    handleAction = (btn) => {
        console.log("handleAction: ", btn)
        switch(btn) {
            case "remove provider":
                return this.props.history.push({
                    pathname: '/admin/provider/remove',
                })
            case "edit details":
                return this.props.history.push({
                    pathname: '/admin/provider/update',
                    state: {update: "provider details"}
                })
            case "reassign care group":
                return this.props.history.push({
                    pathname: '/admin/provider/update',
                    state: {update: "reassign caregroup"}
                })
            default: return null
        }
    }

    handleClose = () => [
        this.props.handleClose()
    ]


    render () {
        const { classes, error, loading, provider} = this.props;

        const infoH = (provider) => [
            {caption: "Role", info: provider.role},
            {caption: "Care Group", info: startCase(provider.provider_group_name)},
            {caption: "Added", info: moment(provider.date_added).format("MMM Do YYYY")}
        ];
        const btns = [
           {btn: "remove provider", type: "button", icon: "" },
           {btn: "reassign care group", type: "button", icon: "" },
           {btn: "edit details", type: "button", icon: "" },
        ]; 


        if (error) {
            return <div>Error! {error.message}</div>
        }

        if (loading || !provider._id ) {
            return <CallBack />
        }

        return (
            <Card className={classes.root}>

                <Typography variant="caption" inline>Provider name</Typography>  
                <BtnCloseIcon handleBtnClick={this.handleClose} />
                <Typography variant="h6">Dr. {startCase(provider.firstname)} {startCase(provider.lastname)}</Typography>
 
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

                <br />  <HrStyled />  <br />     
               
                <BtnGroup
                    btns={btns} 
                    _id={provider._id}
                    handleBtns={this.handleAction}
                />   

            </Card> 
        );
    }
}


const mapStateToProps = (state) => {
    console.log("State @ProviderDisplay: ", state);
    return {
        provider: state.provider.provider,
        loading: state.provider.loading,
        error: state.provider.error,
        user: state.user
    }
};

ProviderDisplay = withRouter(ProviderDisplay)
ProviderDisplay = connect(mapStateToProps)(ProviderDisplay)
ProviderDisplay = withStyles(styles)(ProviderDisplay)
export default ProviderDisplay;