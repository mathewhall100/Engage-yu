import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { startCase, upperFirst } from 'lodash';
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
            {caption: "Role", info: upperFirst(provider.provider_role.role)},
            {caption: "Care Group", info: startCase(provider.provider_group.name)},
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
                        <Typography variant="subtitle1">Office:</Typography>
                        <Typography variant="subtitle1">&nbsp;</Typography>
                        <Typography variant="subtitle1">&nbsp;</Typography>
                        <Typography variant="subtitle1" gutterBottom>&nbsp;</Typography>
                        <Typography variant="subtitle1" gutterBottom>Email:</Typography>
                        <Typography variant="subtitle1">Office Phone:</Typography>
                        {provider.phone_cell && <Typography variant="subtitle1">Cell</Typography>}
                        {provider.phone_pager && <Typography variant="subtitle1">Pager</Typography>}
                        
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="subtitle1" className={classes.fwMedium}>{startCase(provider.office.name)}</Typography>
                        <Typography variant="subtitle1" className={classes.fwMedium}>{startCase(provider.office.street)}</Typography> 
                        <Typography variant="subtitle1" className={classes.fwMedium}>{startCase(provider.office.city)}</Typography> 
                        <Typography variant="subtitle1" className={classes.fwMedium} gutterBottom>{startCase(provider.office.state)}, {startCase(provider.office.zip)}</Typography>
                        <Typography variant="subtitle1" className={classes.fwMedium} gutterBottom>{provider.email}</Typography>
                        <Typography variant="subtitle1" className={classes.fwMedium}>{provider.phone_office}</Typography>
                        {provider.phone_cell && <Typography variant="subtitle1" className={classes.fwMedium}>{provider.phone_cell}</Typography>}
                        {provider.phone_pager && <Typography variant="subtitle1" className={classes.fwMedium}>{provider.phone_pager}</Typography>}
                    </Grid>
                </Grid> 

                <br />

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